import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

// Search results change with every query, so they are never cached
export const getSearchData = {
  search: async <T = unknown>(
    params: Record<string, string>,
  ): Promise<ApiResult<T>> => {
    try {
      const query = new URLSearchParams(params).toString()
      const { data } = await apiClient<{ data: T }>(
        `/api/frontend/search?${query}`,
        { cache: 'no-store' },
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
