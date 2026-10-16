import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

// No backend endpoint yet for quotes CMS content. Wire this up to
// `/api/frontend/quotes` once it exists. The quote form submission itself
// (a client-side POST, mirroring `modules/frontend/routes/contactEnquiry.js`
// on the server) belongs in its own client component, not here.
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
