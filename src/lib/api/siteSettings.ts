import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

// Global site settings (header/footer/social links/etc.), used across layouts
// rather than one specific page.
export const getSiteSettingsData = {
  getCmsData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>(
        '/api/frontend/site-settings',
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
