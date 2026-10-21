import { sendError, sendSuccess, type ApiResult } from './api'
import { apiCacheOptions } from './cache'
import { apiClient } from './client'

const request = async <T>(endpoint: string): Promise<ApiResult<T>> => {
  try {
    const { data } = await apiClient<{ data: T }>(
      endpoint,
      apiCacheOptions(['downloads']),
    )
    return sendSuccess(data)
  } catch (error) {
    return sendError(error)
  }
}

export const getDownloadsData = {
  // Banner, page scripts and the flat list of active downloadable files. Both languages per field.
  getPageData: <T = unknown>() => request<T>('/api/frontend/downloads'),
}
