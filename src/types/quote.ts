type Titled = { title: string; title_ar: string }

// One line in the quote cart - a snapshot of a product (and, if chosen, a
// variant) with enough data to render in the cart without refetching.
export type QuoteCartItem = {
  lineId: string
  productId: number
  productSlug: string
  productTitle: string
  productTitleAr: string
  variantId: number | null
  variantLabel: string | null
  variantLabelAr: string | null
  variantSku: string | null
  media: string | null
  quantity: number
}

// Body sent to POST /api/quote-request
export type QuoteRequestSubmitPayload = {
  name: string
  email: string
  phone: string
  company_name?: string
  message?: string
  recaptcha_token: string
  items: {
    product_id: number | null
    product_title: string
    product_title_ar?: string | null
    variant_id?: number | null
    variant_label?: string | null
    variant_label_ar?: string | null
    variant_sku?: string | null
    media_path?: string | null
    quantity: number
  }[]
}

export type QuoteRequestSubmitResult = {
  success: true
  referenceCode: string | null
}

// /api/frontend/quote-request/options - the category/product dropdowns on /quotes/form
export type QuoteOptionsData = {
  categories: (Titled & { id: number; slug: string })[]
  products: (Titled & {
    id: number
    slug: string
    price: number | null
    media: string | null
    category_slug: string
  })[]
}
