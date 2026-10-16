import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

export const getHomeData = {
  // Page-body CMS content (hero/sections), separate from <head> metadata
  // which comes from `getMetaData("home", locale)` in `./metaApi`.
  getCmsData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>('/api/frontend/home')
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
