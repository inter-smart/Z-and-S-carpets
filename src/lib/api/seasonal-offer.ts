import { sendError, sendSuccess, type ApiResult } from './api'
import { apiCacheOptions } from './cache'
import { apiClient } from './client'

export const getSeasonalOfferData = {
  getCmsData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>(
        '/api/frontend/seasonal-offer',
        apiCacheOptions(['seasonal-offer']),
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
