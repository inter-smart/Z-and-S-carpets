import { getWorksData } from '@/lib/api/works'
import { WORKS_PAGE_LIMIT, sanitizeIndustry } from '@/lib/works'
import type { WorkListData } from '@/types/work'
import { NextResponse, type NextRequest } from 'next/server'

// Thin proxy for the browser (filter clicks, "load more"): keeps the backend URL and CORS
// out of the browser. Not cached.
const clampInt = (value: string | null, fallback: number, max: number) => {
  const parsed = parseInt(value ?? '', 10)
  return Number.isInteger(parsed) && parsed > 0
    ? Math.min(parsed, max)
    : fallback
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const industry = sanitizeIndustry(searchParams.get('industry') ?? undefined)
  const page = clampInt(searchParams.get('page'), 1, 1000)
  const limit = clampInt(searchParams.get('limit'), WORKS_PAGE_LIMIT, 12)
  // only the home page asks for the projects flagged "show in home"
  const showInHome = searchParams.get('show_in_home') === '1'

  const result = await getWorksData.getWorkList<WorkListData>({
    page: String(page),
    limit: String(limit),
    ...(industry && { industry }),
    ...(showInHome && { show_in_home: '1' }),
  })

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 502 })
  }

  return NextResponse.json(result.data, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
