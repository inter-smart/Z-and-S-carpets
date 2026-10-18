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
      apiCacheOptions(['blogs']),
    )
    return sendSuccess(data)
  } catch (error) {
    return sendError(error)
  }
}

// message of the API's 404 for an unknown / unpublished post
export const BLOG_NOT_FOUND = 'Blog not found'

export const getBlogsData = {
  // Banner, page scripts, headings, filter options and ad banners. Both languages in one response.
  getPageData: <T = unknown>() => request<T>('/api/frontend/blogs/page'),

  // Paginated posts: `category` and `tag` (comma separated slugs), `sort` (latest | oldest).
  getList: <T = unknown>(params: Record<string, string> = {}) =>
    request<T>('/api/frontend/blogs', params),

  getDetail: <T = unknown>(slug: string) =>
    request<T>(`/api/frontend/blogs/${encodeURIComponent(slug)}`),

  getRelated: <T = unknown>(slug: string, limit = 6) =>
    request<T>(`/api/frontend/blogs/${encodeURIComponent(slug)}/related`, {
      limit: String(limit),
    }),
}
