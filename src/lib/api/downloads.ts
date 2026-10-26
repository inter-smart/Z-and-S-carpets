import { sendError, sendSuccess, type ApiResult } from './api'
import { apiCacheOptions } from './cache'
import { apiClient } from './client'

export const DOWNLOADS_PAGE_LIMIT = 12
export const DOWNLOADS_MAX_URL_PAGE = 10

// Page count from a query value: an integer between 1 and DOWNLOADS_MAX_URL_PAGE
export function sanitizeDownloadsPage(value: string | string[] | undefined) {
  const parsed = parseInt((Array.isArray(value) ? value[0] : value) ?? '', 10)
  return Number.isInteger(parsed) && parsed > 0
    ? Math.min(parsed, DOWNLOADS_MAX_URL_PAGE)
    : 1
}

const request = async <T>(
  endpoint: string,
  params: Record<string, string> = {},
): Promise<ApiResult<T>> => {
  try {
    const query = new URLSearchParams(params).toString()
    const { data } = await apiClient<{ data: T }>(
      `${endpoint}${query ? `?${query}` : ''}`,
      apiCacheOptions(['downloads']),
    )
    return sendSuccess(data)
  } catch (error) {
    return sendError(error)
  }
}

export const getDownloadsData = {
  // Banner, page scripts and a paginated list of active downloadable files (`page`, `limit`).
  // Both languages per field.
  getPageData: <T = unknown>(params: Record<string, string> = {}) =>
    request<T>('/api/frontend/downloads', params),
}
