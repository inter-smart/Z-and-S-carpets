import { getSearchData } from '@/lib/api/search'
import { SEARCH_MIN_CHARS, cleanQuery } from '@/lib/search'
import type { SearchData } from '@/types/search'
import { NextResponse, type NextRequest } from 'next/server'

// Thin proxy for the navbar search overlay: keeps the backend URL and CORS out of the browser
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const q = cleanQuery(searchParams.get('q') ?? undefined)

  if (q.length < SEARCH_MIN_CHARS) {
    return NextResponse.json({ error: 'Query too short' }, { status: 400 })
  }

  const result = await getSearchData.search<SearchData>({
    q,
    type: 'all',
    limit: '5',
  })

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 502 })
  }

  return NextResponse.json(result.data)
}
