export interface WorkItemType {
  id: string
  title: string
  category: string
  location: string
  btnLabel: string
  image: string
  details: {
    metadata: { label: string; value: string }[]
    heroImage: string
    paragraphs: string[]
    gallery: string[]
  }
}

export interface WorkCategoryType {
  id: string
  label: string
}

// What WorkItemCard renders (static items satisfy this too)
export interface WorkCardItem {
  id: string
  title: string
  location: string
  btnLabel: string
  image: string | null
}

// --- /api/frontend/projects ---
export interface WorkProject {
  slug: string
  title: string
  title_ar: string
  location: string
  location_ar: string
  thumbnail_url: string | null
  industry: { slug: string; title: string; title_ar: string }
  category: { slug: string; title: string; title_ar: string } | null
}

export interface WorkFilterIndustry {
  slug: string
  title: string
  title_ar: string
}

export interface WorkFiltersData {
  industries: WorkFilterIndustry[]
}

export interface WorkPagination {
  page: number
  limit: number
  totalCount: number
  totalPages: number
  hasMore: boolean
}

export interface WorkListData {
  projects: WorkProject[]
  pagination: WorkPagination
}

// /api/frontend/projects/page — banner and page scripts (same conventions as the about API)
export type WorksPageData = {
  other_meta: string | null
  other_meta_ar: string | null
  works_section: { title: string; title_ar: string }
  banner_section: {
    is_visible: boolean
    title: string
    title_ar: string
    sub_title: string
    sub_title_ar: string
    media: { path: string | null; alt: string; alt_ar: string }
  }
}
