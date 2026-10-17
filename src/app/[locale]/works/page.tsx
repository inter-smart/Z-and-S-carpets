import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import OurWorksSection from '@/components/pages/works/our-works.section'
import { getWorksData } from '@/lib/api/works'
import { WORKS_PAGE_LIMIT, sanitizeIndustry } from '@/lib/works'
import type { WorkFiltersData, WorkListData } from '@/types/work'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work | Z&S Carpets',
  description:
    'Discover our projects crafted with quality, innovation, and excellence.',
}

export default async function WorksPage({
  searchParams,
}: PageProps<'/[locale]/works'>) {
  const query = await searchParams

  // ?industry=<slug> (the old ?type=<slug> links keep working)
  const industry = sanitizeIndustry(
    (query.industry ?? query.type) as string | string[] | undefined,
  )

  // filters and the first page are independent, so fetch them in parallel (both cached)
  const [filters, list] = await Promise.all([
    getWorksData.getWorkFilters<WorkFiltersData>(),
    getWorksData.getWorkList<WorkListData>({
      page: '1',
      limit: String(WORKS_PAGE_LIMIT),
      ...(industry && { industry }),
    }),
  ])

  return (
    <>
      <InnerBannerSection pageName="WorksPage" />
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
