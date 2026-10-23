import { sendError, sendSuccess, type ApiResult } from './api'
import { apiCacheOptions } from './cache'
import { apiClient } from './client'

// message of the API's 404 for an unknown / inactive project
export const PROJECT_NOT_FOUND = 'Project not found'

// Backed by the server's "projects" module (completed-work portfolio),
// mapped here to the storefront's /works pages.
export const getWorksData = {
  // One active project: info, gallery, industry/category. Both languages in one response.
  getDetail: async <T = unknown>(slug: string): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>(
        `/api/frontend/projects/${encodeURIComponent(slug)}`,
        { cache: 'no-store' },
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },

  // Related projects for the "related projects" carousel. Both languages in one response.
  getRelated: async <T = unknown>(
    slug: string,
    limit = 6,
  ): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>(
        `/api/frontend/projects/${encodeURIComponent(slug)}/related?limit=${limit}`,
        { cache: 'no-store' },
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },

  // Page-level content (banner + page scripts), both languages in one response.
  // Cached like the other CMS pages; the project list below is not.
  getPageData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>(
        '/api/frontend/projects/page',
        apiCacheOptions(['works-page']),
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },

  // Paginated list of active projects, optionally filtered by industry slug.
  // Both languages come back in one response. Not cached: every call goes to the API.
  getWorkList: async <T = unknown>(
    params: Record<string, string> = {},
  ): Promise<ApiResult<T>> => {
    try {
      const query = new URLSearchParams(params).toString()
      const { data } = await apiClient<{ data: T }>(
        `/api/frontend/projects${query ? `?${query}` : ''}`,
        { cache: 'no-store' },
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },

  // Active industries that have at least one active project — used to build
  // the filter list on the works listing page.
  getWorkFilters: async <T = unknown>(
    params: Record<string, string> = {},
  ): Promise<ApiResult<T>> => {
    try {
      const query = new URLSearchParams(params).toString()
      const { data } = await apiClient<{ data: T }>(
        `/api/frontend/projects/filters${query ? `?${query}` : ''}`,
        { cache: 'no-store' },
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
