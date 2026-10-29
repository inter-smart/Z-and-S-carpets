import { sendError, sendSuccess } from '@/lib/api/api'
import { apiCacheOptions } from '@/lib/api/cache'
import { apiClient } from '@/lib/api/client'
import type { SampleOptionsData } from '@/types/sample-request'
import { NextResponse } from 'next/server'

// Thin proxy for the browser: category / product dropdowns of the "Get a sample" form.
// Caching is currently disabled (see lib/api/cache.ts).
export async function GET() {
  try {
    const { data } = await apiClient<{ data: SampleOptionsData }>(
      '/api/frontend/sample-request/options',
      apiCacheOptions(['categories', 'products']),
    )
    return NextResponse.json(sendSuccess(data).data)
  } catch (error) {
    return NextResponse.json({ error: sendError(error).error }, { status: 502 })
  }
}
