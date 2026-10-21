import type { LocaleType } from '@/i18n/types'
import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

export const getPrivacyPolicyData = {
  // the server resolves the right language itself, so the title/content here are plain strings
  getCmsData: async <T = unknown>(locale: LocaleType): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>(
        `/api/frontend/privacy-policy?lang=${locale}`,
      )
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
