import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

export const getHomeData = {
  // Page-body CMS content (hero/sections, plus the page's `other_meta`/
  // `other_meta_ar` HTML for DynamicMeta). Like every other section here,
  // both languages come back in one fetch and the page picks by locale —
  // <head> metadata is a separate, intentional call via `getMetaData("home",
  // locale)` in `./metaApi`.
  getCmsData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>('/api/frontend/home')
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
