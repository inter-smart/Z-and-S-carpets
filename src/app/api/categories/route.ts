import { getCategoriesData } from '@/lib/api/categories'
import { CATEGORIES_PAGE_LIMIT, sanitizeBadge } from '@/lib/categories'
import type { CategoryListData } from '@/types/category'
import { NextResponse, type NextRequest } from 'next/server'

// Thin proxy for the browser (badge filter, "load more"): keeps the backend URL and CORS
// out of the browser. Responses are cached like the other CMS reads (see lib/api/cache.ts).
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const page = Math.min(
    Math.max(parseInt(searchParams.get('page') ?? '', 10) || 1, 1),
    1000,
  )
  const badge = sanitizeBadge(searchParams.get('badge') ?? undefined)

  const result = await getCategoriesData.getList<CategoryListData>({
    page: String(page),
    limit: String(CATEGORIES_PAGE_LIMIT),
    ...(badge && { badge }),
  })

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 502 })
  }

  return NextResponse.json(result.data)
}
