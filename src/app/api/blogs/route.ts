import { getBlogsData } from '@/lib/api/blogs'
import {
  BLOGS_PAGE_LIMIT,
  buildBlogQuery,
  parseSlugs,
  parseSort,
} from '@/lib/blogs'
import type { BlogListData } from '@/types/blog'
import { NextResponse, type NextRequest } from 'next/server'

// Thin proxy for the browser ("load more"): keeps the backend URL and CORS out of the browser.
// Caching is currently disabled (see lib/api/cache.ts).
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const page = Math.min(
    Math.max(parseInt(searchParams.get('page') ?? '', 10) || 1, 1),
    1000,
  )
  const filters = buildBlogQuery(
    parseSlugs(searchParams.get('category') ?? undefined),
    parseSlugs(searchParams.get('tag') ?? undefined),
    parseSort(searchParams.get('sort') ?? undefined),
  )

  const result = await getBlogsData.getList<BlogListData>({
    page: String(page),
    limit: String(BLOGS_PAGE_LIMIT),
    ...Object.fromEntries(filters),
  })

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 502 })
  }

  return NextResponse.json(result.data)
}
