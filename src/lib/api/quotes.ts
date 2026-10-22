import type {
  QuoteRequestSubmitPayload,
  QuoteRequestSubmitResult,
} from '@/types/quote'
import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

// No backend endpoint yet for quotes CMS content. Wire this up to
// `/api/frontend/quotes` once it exists.
export const getQuotesData = {
  getCmsData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>('/api/frontend/quotes')
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}

// Submits the quote request form via the `/api/quote-request` Next.js proxy
// (mirrors `modules/frontend/routes/quoteRequest.js` on the server).
export async function submitQuoteRequest(
  payload: QuoteRequestSubmitPayload,
  lang: string,
): Promise<
  | {
      ok: true
      result: QuoteRequestSubmitResult
    }
  | {
      ok: false
      errors: { field: string; message: string }[]
      message?: string
    }
> {
  const res = await fetch(`/api/quote-request?lang=${lang}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const result = await res.json().catch(() => ({}))

  if (!res.ok) {
    return {
      ok: false,
      errors: Array.isArray(result?.errors) ? result.errors : [],
      message: result?.message,
    }
  }

  return { ok: true, result: result as QuoteRequestSubmitResult }
}
