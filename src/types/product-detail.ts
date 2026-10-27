import type { HomeData, HomeMedia } from '@/types/home'
import type { ProductListItem } from '@/types/product-list'

type Titled = { title: string; title_ar: string }

export type ProductLabel = Titled & { slug: string }

export type ProductDetailMedia = {
  kind: 'image' | 'video'
  url: string | null
  thumbnail_url: string | null
  mime_type: string | null
  alt_text: string | null
  alt_text_ar: string | null
  title: string | null
  title_ar: string | null
  description: string | null
  description_ar: string | null
}

export type ProductDetailItem = {
  id: number
  sort_order: number
  text_content: string | null
  text_content_ar: string | null
  media: ProductDetailMedia | null
}

// One tab of the page: a detail field resolved for the selected variant
export type ProductDetailField = {
  id: number
  slug: string
  name: string
  name_ar: string | null
  type: 'rich_text' | 'image' | 'video'
  allows_multiple: boolean
  source: string
  items: ProductDetailItem[]
}

export type ProductDetailAttribute = Titled & {
  slug: string
  type: string
  values: {
    slug: string
    value: string
    value_ar: string
    color_code: string
    media: HomeMedia
  }[]
}

export type ProductDetailVariant = {
  id: number
  sku: string
  label: string
  label_ar: string
  media: HomeMedia
  // attribute slug -> value slug
  values: Record<string, string>
}

// /api/frontend/products/:slug — both languages per field, the storefront picks one by locale
export type ProductDetailData = {
  product: Titled & {
    id: number
    slug: string
    short_description: string
    short_description_ar: string
    description: string
    description_ar: string
    media: HomeMedia
    badge: ProductLabel | null
    categories: ProductLabel[]
    features: ProductLabel[]
    tags: ProductLabel[]
    specifications: ProductLabel[]
  }
  attributes: ProductDetailAttribute[]
  variants: ProductDetailVariant[]
  selected_variant_id: number | null
  details: ProductDetailField[]
  // the product's own banner; null = the page keeps its static one
  banner_section:
    | (Titled & {
        is_visible: boolean
        sub_title: string
        sub_title_ar: string
        media: HomeMedia
      })
    | null
  faqs_section: HomeData['faqs_section']
}

// /api/frontend/products/:slug/related
export type ProductRelatedData = { products: ProductListItem[] }
