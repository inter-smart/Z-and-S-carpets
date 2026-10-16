import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

// No backend endpoint yet for downloads (brochures/catalogs). Wire this up to
// `/api/frontend/downloads` once it exists.
export const getDownloadsData = {
  getCmsData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>('/api/frontend/downloads')
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
