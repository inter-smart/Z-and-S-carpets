import { DOWNLOADS_PAGE_LIMIT, getDownloadsData } from '@/lib/api/downloads'
import type { DownloadsPageData } from '@/types/download'
import { NextResponse, type NextRequest } from 'next/server'

// Thin proxy for the browser ("load more"): keeps the backend URL and CORS out of the browser.
const clampInt = (value: string | null, fallback: number, max: number) => {
  const parsed = parseInt(value ?? '', 10)
  return Number.isInteger(parsed) && parsed > 0
    ? Math.min(parsed, max)
    : fallback
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const page = clampInt(searchParams.get('page'), 1, 1000)
  const limit = clampInt(searchParams.get('limit'), DOWNLOADS_PAGE_LIMIT, 120)

  const result = await getDownloadsData.getPageData<DownloadsPageData>({
    page: String(page),
    limit: String(limit),
  })

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 502 })
  }

  return NextResponse.json(result.data)
}
