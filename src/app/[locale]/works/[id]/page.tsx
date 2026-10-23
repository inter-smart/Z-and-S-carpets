import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import DynamicMeta from '@/components/common/dynamic-meta'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import RelatedProjectsSection from '@/components/pages/work-details/related-projects.section'
import WorkDetailsSection from '@/components/pages/work-details/work-details.section'
import type { LocaleType } from '@/i18n/types'
import { getDetailMetaData } from '@/lib/api/metaApi'
import { PROJECT_NOT_FOUND, getWorksData } from '@/lib/api/works'
import { pickLocalized } from '@/lib/works'
import type { WorkDetailData } from '@/types/work'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || ''

async function loadProject(slug: string) {
  const result = await getWorksData.getDetail<WorkDetailData>(slug)
  if (result.success) return result.data
  // an unknown / inactive project is a 404; other failures (API down) surface as an error
  if (result.error === PROJECT_NOT_FOUND) return null
  throw new Error(result.error)
}

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/works/[id]'>): Promise<Metadata> {
  // the folder keeps its old `[id]` name; the value is the project's slug
  const { locale, id: slug } = await params
  const lang = locale as LocaleType
  const project = await loadProject(slug)
  if (!project) return {}

  // the project's own SEO row wins when the admin wrote one, else its own title / description
  return getDetailMetaData(
    { projectId: project.id },
    lang,
    `${SITE_URL}/${locale}/works/${slug}`,
    project.media.path,
    {
      title: pickLocalized(lang, project.title, project.title_ar),
      description: pickLocalized(
        lang,
        project.description,
        project.description_ar,
      ),
    },
  )
}

export default async function WorkDetailsPage({
  params,
}: PageProps<'/[locale]/works/[id]'>) {
  // the folder keeps its old `[id]` name; the value is the project's slug
  const { locale, id: slug } = await params
  const lang = locale as LocaleType

  const [project, t] = await Promise.all([
    loadProject(slug),
    getTranslations({ locale, namespace: 'WorksPage' }),
  ])
  if (!project) notFound()

  const title = pickLocalized(lang, project.title, project.title_ar)

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description: pickLocalized(
      lang,
      project.description,
      project.description_ar,
    ),
    image: project.media.path ? [project.media.path] : undefined,
    url: `${SITE_URL}/${lang}/works/${slug}`,
  }

  return (
    <>
      <DynamicMeta structuredData={[projectSchema]} />
      <InnerBannerSection pageName="WorksPage" />
      <BreadcrumbBar
        values={[
          { name: t('BannerSection.title'), link: '/works' },
          { name: title, link: `/works/${slug}`, currentPage: true },
        ]}
      />
      <WorkDetailsSection project={project} />
      {project.related_projects.length > 0 && (
        <RelatedProjectsSection projects={project.related_projects} />
      )}
    </>
  )
}
