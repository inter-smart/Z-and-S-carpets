import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

// No backend endpoint yet for category listing (CLAUDE.md: Industry → Category
// → Product catalog is still being built). Wire this up to
// `/api/frontend/category` once it exists.
export const getCategoryData = {
  getCmsData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>('/api/frontend/category')
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
