import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

// Backed by the server's "projects" module (completed-work portfolio),
// mapped here to the storefront's /works pages.
export const getWorksData = {
  // Paginated list of active projects, optionally filtered by industry slug.
  getWorkList: async <T = unknown>(
    params: Record<string, string> = {},
  ): Promise<ApiResult<T>> => {
    try {
      const query = new URLSearchParams(params).toString()
      const { data } = await apiClient<{ data: T }>(
        `/api/frontend/projects${query ? `?${query}` : ''}`,
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },

  // Active industries that have at least one active project — used to build
  // the filter list on the works listing page.
  getWorkFilters: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>(
        '/api/frontend/projects/filters',
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
