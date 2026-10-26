import type { HomeData } from './home'
import type { HomeMedia } from './home'

type Titled = { title: string; title_ar: string }

// /api/frontend/products/page — banner, page scripts and the general FAQs
// (same conventions as the about API: both languages per field, `is_visible` per section).
export type ProductsPageData = {
  other_meta: string | null
  other_meta_ar: string | null
  banner_section: Titled & {
    is_visible: boolean
    sub_title: string
    sub_title_ar: string
    media: HomeMedia
  }
  faqs_section: HomeData['faqs_section']
}

export type ProductListItem = Titled & {
  id: number
  slug: string
  description: string
  description_ar: string
  media: HomeMedia
  badge: (Titled & { slug: string }) | null
  category: Titled & { slug: string }
}

// /api/frontend/products?page=&limit=&category=
export type ProductListData = {
  products: ProductListItem[]
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
    hasMore: boolean
  }
}

// /api/frontend/products/filters — only what the filter panel renders
export type ProductFiltersData = {
  // flat list; the tree is built from `parent_slug` (null for top level). Sub-categories are only
  // included under categories that are open (selected, or holding a selected sub-category).
  categories: (Titled & { slug: string; parent_slug: string | null })[]
  // attributes (Size, Color...) with the values of the current result set
  attributes: (Titled & {
    slug: string
    values: { slug: string; value: string; value_ar: string }[]
  })[]
  // tag labels flagged "show in filter"
  tags: (Titled & { slug: string })[]
}
