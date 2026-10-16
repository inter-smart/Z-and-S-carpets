import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

// No backend endpoint yet for blogs (not present under zandscarpets_server's
// modules/frontend). Wire these up to their matching `/api/frontend/...`
// routes once the backend exposes them.
export const getBlogsData = {
  getCmsData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>('/api/frontend/blogs')
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },

  getBlogList: async <T = unknown>(
    page = 1,
    limit = 6,
  ): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>(
        `/api/frontend/blogs/blog-list?page=${page}&limit=${limit}`,
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },

  getBlogDetailsData: async <T = unknown>(
    slug: string,
  ): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>(
        `/api/frontend/blog-details?slug=${slug}`,
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
