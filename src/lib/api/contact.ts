import { sendError, sendSuccess, type ApiResult } from './api'
import { apiClient } from './client'

export const getContactData = {
  // Hero/contact-info CMS content. The contact form submission itself is a
  // client-side POST and lives in its own client component, not here.
  getCmsData: async <T = unknown>(): Promise<ApiResult<T>> => {
    try {
      const { data } = await apiClient<{ data: T }>('/api/frontend/contact')
      return sendSuccess(data)
    } catch (error) {
      return sendError(error)
    }
  },
}
