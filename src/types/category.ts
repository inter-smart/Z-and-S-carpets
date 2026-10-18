import type { HomeMedia } from './home'

type Titled = { title: string; title_ar: string }

export type CategoryBadge = Titled & { slug: string }

// /api/frontend/categories/page — banner, page scripts and the badge filters
// (same conventions as the about API: both languages per field, `is_visible` on the banner).
export type CategoriesPageData = {
  other_meta: string | null
  other_meta_ar: string | null
  banner_section: Titled & {
    is_visible: boolean
    sub_title: string
    sub_title_ar: string
    media: HomeMedia
  }
  // heading above the list (empty when not set: the translation is the fallback)
  list_section: Titled
  filters: CategoryBadge[]
}

export type CategoryItem = Titled & {
  id: number
  slug: string
  description: string
  description_ar: string
  media: HomeMedia
  badge: CategoryBadge | null
  highlights: (Titled & { id: number })[]
}

// /api/frontend/categories?page=&limit=&badge=
export type CategoryListData = {
  categories: CategoryItem[]
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
    hasMore: boolean
  }
}
