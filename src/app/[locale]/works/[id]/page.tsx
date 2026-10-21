import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import RelatedProjectsSection from '@/components/pages/work-details/related-projects.section'
import WorkDetailsSection from '@/components/pages/work-details/work-details.section'
import type { WorkItemType } from '@/types/work'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  title: `Work Details | Z&S Carpets`,
  description: 'A Z&S Carpets project.',
}

export default async function WorkDetailsPage({
  params,
}: PageProps<'/[locale]/works/[id]'>) {
  const { locale, id } = await params

  const [t, tw] = await Promise.all([
    getTranslations({ locale, namespace: 'WorksPage' }),
    getTranslations({ locale, namespace: 'Works' }),
  ])
  const workItems = tw.raw('Items') as WorkItemType[]
  const work = workItems.find((item) => item.id === id)

  return (
    <>
      <InnerBannerSection pageName="WorksPage" />
      <BreadcrumbBar
        values={[
          { name: t('BannerSection.title'), link: '/works' },
          {
            name: work?.title ?? t('Breadcrumb.details'),
            link: `/works/${id}`,
            currentPage: true,
          },
        ]}
      />
      <WorkDetailsSection id={id} />
      <RelatedProjectsSection />
    </>
  )
}
