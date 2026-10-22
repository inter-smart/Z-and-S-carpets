import { sendError, sendSuccess } from '@/lib/api/api'
import { apiCacheOptions } from '@/lib/api/cache'
import { apiClient } from '@/lib/api/client'
import type { QuoteOptionsData } from '@/types/quote'
import { NextResponse } from 'next/server'

// Thin proxy for the browser: category / product picker shown on /quotes/form
// when the cart is empty (direct navigation, not from the quotes list).
export async function GET() {
  try {
    const { data } = await apiClient<{ data: QuoteOptionsData }>(
      '/api/frontend/quote-request/options',
      apiCacheOptions(['categories', 'products']),
    )
    return NextResponse.json(sendSuccess(data).data)
  } catch (error) {
    return NextResponse.json({ error: sendError(error).error }, { status: 502 })
  }
}
