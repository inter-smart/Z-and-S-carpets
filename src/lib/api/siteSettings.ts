import { sendError, sendSuccess, type ApiResult } from './api'
import { apiCacheOptions } from './cache'
import { apiClient } from './client'

// Global site settings (nav, footer, floating buttons), used by the root layout rather than
// one specific page. The layout runs on every request, so this call must stay cached
// (see ./cache) or the API would sit in every page's critical path.
export const getSiteSettingsData = {
  getCmsData: async <T = unknown>(lang: string): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>(
        `/api/frontend/site-settings?lang=${lang === 'ar' ? 'ar' : 'en'}`,
        apiCacheOptions(['site-settings']),
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
