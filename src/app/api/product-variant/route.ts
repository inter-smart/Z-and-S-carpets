import { getDetailMetaStrings } from '@/lib/api/metaApi'
import { PRODUCT_NOT_FOUND, getProductsData } from '@/lib/api/products'
import { pickLocalized } from '@/lib/product-detail'
import type { LocaleType } from '@/i18n/types'
import type { ProductDetailData } from '@/types/product-detail'
import { NextResponse, type NextRequest } from 'next/server'

// Thin proxy for the browser: once a full attribute combination is picked, the page asks this
// (instead of navigating) for just that variant's tab content and title/description — the swatch
// highlighting, hero image and availability all come from the product/variant list the page
// already has in memory and don't need a round trip. Keeps the backend URL and CORS out of the
// browser, same as the other proxies (`/api/products`, `/api/blogs`, ...).
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const slug = searchParams.get('slug') ?? ''
  const attrs = searchParams.get('attrs') ?? ''
  const locale = (searchParams.get('locale') === 'ar' ? 'ar' : 'en') as LocaleType

  if (!slug) {
    return NextResponse.json({ error: 'slug is required' }, { status: 400 })
  }

  const result = await getProductsData.getDetail<ProductDetailData>(slug, attrs)
  if (!result.success) {
    const status = result.error === PRODUCT_NOT_FOUND ? 404 : 502
    return NextResponse.json({ error: result.error }, { status })
  }

  const { product } = result.data
  const selectedId = result.data.selected_variant_id

  // the selected variant's own SEO row wins when the admin wrote one, else the product's
  const meta = await getDetailMetaStrings(
    selectedId ? [{ variantId: selectedId }, { productId: product.id }] : { productId: product.id },
    locale,
    {
      title: pickLocalized(locale, product.title, product.title_ar),
      description: pickLocalized(locale, product.short_description, product.short_description_ar),
    },
  )

  return NextResponse.json({
    selected_variant_id: selectedId,
    details: result.data.details,
    meta,
  })
}
