import { sendError, sendSuccess, type ApiResult } from './api'
import { apiCacheOptions } from './cache'
import { apiClient } from './client'

const request = async <T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<ApiResult<T>> => {
  try {
    const query = new URLSearchParams(params).toString()
    const { data } = await apiClient<{ data: T }>(
      `${endpoint}${query ? `?${query}` : ''}`,
      apiCacheOptions(['categories']),
    )
    return sendSuccess(data)
  } catch (error) {
    return sendError(error)
  }
}

export const getCategoriesData = {
  // Banner, page scripts and badge filters. Both languages in one response.
  getPageData: <T = unknown>() => request<T>('/api/frontend/categories/page'),

  // Paginated category list, optionally limited to one badge (label slug).
  getList: <T = unknown>(params: Record<string, string> = {}) =>
    request<T>('/api/frontend/categories', params),
}
