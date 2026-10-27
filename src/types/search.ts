// Slim shapes of `GET /api/frontend/search` (both languages come back, the UI picks one)
export interface SearchProduct {
  slug: string
  title: string
  title_ar: string
  thumb: string | null
  category_title: string
  category_title_ar: string
  // only with `view=full`
  description?: string
  description_ar?: string
}

export interface SearchCategory {
  slug: string
  title: string
  title_ar: string
}

export interface SearchBlog {
  slug: string
  title: string
  title_ar: string
  thumb: string | null
  // only with `view=full`
  excerpt?: string
  excerpt_ar?: string
  published_at?: string
}

export interface SearchGroup<T> {
  items: T[]
  totalCount: number
}

// a group is only present when it was asked for (`type=all` returns all three)
export interface SearchData {
  products?: SearchGroup<SearchProduct>
  categories?: SearchGroup<SearchCategory>
  blogs?: SearchGroup<SearchBlog>
}
