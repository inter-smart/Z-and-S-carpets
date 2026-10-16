import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

export const getAboutData = {
  getCmsData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>('/api/frontend/about')
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
