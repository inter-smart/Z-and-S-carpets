import { getWorksData } from '@/lib/api/works'
import { HOME_WORKS_LIMIT } from '@/lib/works'
import type { HomeData } from '@/types/home'
import type { WorkFiltersData, WorkListData } from '@/types/work'
import WorksHomeClient from './works-home.client'

// Server component: the filters and the first list ("All") are fetched in parallel (not cached),
// so the cards are already in the HTML. Filter clicks are handled by the client part.
export default async function WorksSection({
  title,
}: {
  // heading from the home CMS (works_section); the translated title is the fallback
  title?: HomeData['works_section']
}) {
  const [filters, list] = await Promise.all([
    getWorksData.getWorkFilters<WorkFiltersData>({ show_in_home: '1' }),
    getWorksData.getWorkList<WorkListData>({
      page: '1',
      limit: String(HOME_WORKS_LIMIT),
      show_in_home: '1',
    }),
  ])

  // API down: render no section at all. An empty list still renders (with a "no projects" message).
  if (!list.success) return null

  return (
    <WorksHomeClient
      industries={filters.success ? filters.data.industries : []}
      initialProjects={list.data.projects}
      limit={HOME_WORKS_LIMIT}
      title={title}
    />
  )
}
