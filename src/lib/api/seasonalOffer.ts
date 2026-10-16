import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

// No backend endpoint yet for seasonal offers. Wire this up to
// `/api/frontend/seasonal-offer` once it exists.
export const getSeasonalOfferData = {
  getCmsData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>(
        '/api/frontend/seasonal-offer',
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
