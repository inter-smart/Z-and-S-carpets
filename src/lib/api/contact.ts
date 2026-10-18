import { sendError, sendSuccess, type ApiResult } from './api'
import { apiCacheOptions } from './cache'
import { apiClient } from './client'

export const getContactData = {
  // Both languages come back in one response, so /en and /ar share one cached copy.
  getCmsData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>(
        '/api/frontend/contact',
        apiCacheOptions(['contact']),
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
