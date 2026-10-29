import { getProductsData } from '@/lib/api/products'
import {
  PRODUCTS_PAGE_LIMIT,
  buildFilterQuery,
  parseAttrs,
  parseCategories,
} from '@/lib/products'
import type { ProductListData } from '@/types/product-list'
import { NextResponse, type NextRequest } from 'next/server'

// Thin proxy for the browser ("load more"): keeps the backend URL and CORS out of the
// browser. Caching is currently disabled (see lib/api/cache.ts).
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const page = Math.min(
    Math.max(parseInt(searchParams.get('page') ?? '', 10) || 1, 1),
    1000,
  )
  const filters = buildFilterQuery(
    parseCategories(searchParams.get('category') ?? undefined),
    parseAttrs(searchParams.get('attrs') ?? undefined),
    parseCategories(searchParams.get('tag') ?? undefined),
  )

  const result = await getProductsData.getList<ProductListData>({
    page: String(page),
    limit: String(PRODUCTS_PAGE_LIMIT),
    ...Object.fromEntries(filters),
  })

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 502 })
  }

  return NextResponse.json(result.data)
}
