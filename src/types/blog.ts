import type { HomeMedia } from './home'

type Titled = { title: string; title_ar: string }

// One post as the cards show it (/api/frontend/blogs)
export type BlogCard = Titled & {
  slug: string
  excerpt: string
  excerpt_ar: string
  author: string
  author_ar: string
  // ISO date
  published_at: string
  media: HomeMedia
}

export type BlogOption = Titled & { slug: string }

export type BlogAd = {
  id: number
  media: HomeMedia
  link: string
  new_tab: boolean
  button_text: string
  button_text_ar: string
}

// /api/frontend/blogs/page — same conventions as the about API (both languages per field,
// `is_visible` on the banner)
export type BlogsPageData = {
  other_meta: string | null
  other_meta_ar: string | null
  banner_section: Titled & {
    is_visible: boolean
    sub_title: string
    sub_title_ar: string
    media: HomeMedia
  }
  list_section: Titled & { related_title: string; related_title_ar: string }
  // options for the filters: only categories / tags that published posts use
  filters: { categories: BlogOption[]; tags: BlogOption[] }
  ads: BlogAd[]
}

// /api/frontend/blogs?page=&limit=&category=&tag=&sort=
export type BlogListData = {
  blogs: BlogCard[]
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
    hasMore: boolean
  }
}

// /api/frontend/blogs/:slug
export type BlogDetailData = BlogCard & {
  // sanitized HTML; `[gallery]` on its own line marks where the swiper goes
  content: string
  content_ar: string
  updated_at: string
  images: HomeMedia[]
  tags: BlogOption[]
  categories: BlogOption[]
}

// /api/frontend/blogs/:slug/related
export type BlogRelatedData = { blogs: BlogCard[] }
