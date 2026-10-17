import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import DynamicMeta from '@/components/common/dynamic-meta'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import OurWorksSection from '@/components/pages/works/our-works.section'
import type { LocaleType } from '@/i18n/types'
import { getMetaData } from '@/lib/api/metaApi'
import { getWorksData } from '@/lib/api/works'
import { parseMetaTags, sanitizeMetadata } from '@/lib/metaHelper'
import { WORKS_PAGE_LIMIT, sanitizeIndustry } from '@/lib/works'
import type { WorkFiltersData, WorkListData, WorksPageData } from '@/types/work'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/works'>): Promise<Metadata> {
  const { locale } = await params
  // the meta row is saved under `our-work`; the canonical URL is /works
  return getMetaData('our-work', locale as LocaleType, 'works')
}

export default async function WorksPage({
  params,
  searchParams,
}: PageProps<'/[locale]/works'>) {
  const { locale } = await params
  const query = await searchParams

  // ?industry=<slug> (the old ?type=<slug> links keep working)
  const industry = sanitizeIndustry(
    (query.industry ?? query.type) as string | string[] | undefined,
  )

  // filters and the first page are independent, so fetch them in parallel (both cached)
  const [page, filters, list] = await Promise.all([
    getWorksData.getPageData<WorksPageData>(),
    getWorksData.getWorkFilters<WorkFiltersData>(),
    getWorksData.getWorkList<WorkListData>({
      page: '1',
      limit: String(WORKS_PAGE_LIMIT),
      ...(industry && { industry }),
    }),
  ])

  // Both languages come back in one fetch — pick the JSON-LD / extra scripts for this locale
  const pageData = page.success ? page.data : undefined
  const otherMetaHtml =
    locale === 'ar'
      ? (pageData?.other_meta_ar ?? pageData?.other_meta)
      : pageData?.other_meta
  const { scripts: structuredData, inlineScripts: lineScripts } =
    sanitizeMetadata(parseMetaTags(otherMetaHtml))
  const banner = pageData?.banner_section

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      {/* the banner falls back to its translated content when the API has none */}
      <InnerBannerSection
        pageName="WorksPage"
        data={banner?.is_visible ? banner : undefined}
      />
      <BreadcrumbBar values={[{ name: 'Our Work', link: '/works' }]} />
      {/* keyed by industry so the loaded pages reset when the filter changes */}
      <OurWorksSection
        key={industry || 'all'}
        industries={filters.success ? filters.data.industries : []}
        activeIndustry={industry}
        initialProjects={list.success ? list.data.projects : []}
        initialHasMore={list.success ? list.data.pagination.hasMore : false}
      />
    </>
  )
}
