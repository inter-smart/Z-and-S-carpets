import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

export const getServicesData = {
  getCmsData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>('/api/frontend/services')
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
