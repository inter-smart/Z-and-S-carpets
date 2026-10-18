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
      apiCacheOptions(['products']),
    )
    return sendSuccess(data)
  } catch (error) {
    return sendError(error)
  }
}

// message of the API's 404 for an unknown / inactive product
export const PRODUCT_NOT_FOUND = 'Product not found'

export const getProductsData = {
  // Banner, page scripts and FAQs. Both languages in one response.
  getPageData: <T = unknown>() => request<T>('/api/frontend/products/page'),

  // Filter options: top-level categories plus the sub-categories of the open ones (`category` =
  // the selected slugs), and the attribute values of the current result set (`category` and
  // `attrs`, the same filters as the list).
  getFilters: <T = unknown>(params: Record<string, string> = {}) =>
    request<T>('/api/frontend/products/filters', params),

  // Paginated product list, filtered by `category` (comma separated slugs: the products of
  // exactly those categories) and `attrs` (`color:oak,size:2m`).
  getList: <T = unknown>(params: Record<string, string> = {}) =>
    request<T>('/api/frontend/products', params),

  // One product: info, attributes, variants, the selected variant's tab content and FAQs.
  // `attrs` (`size:small,color:oak`) picks the variant.
  getDetail: <T = unknown>(slug: string, attrs = '') =>
    request<T>(
      `/api/frontend/products/${encodeURIComponent(slug)}`,
      attrs ? { attrs } : {},
    ),

  getRelated: <T = unknown>(slug: string, limit = 8) =>
    request<T>(`/api/frontend/products/${encodeURIComponent(slug)}/related`, {
      limit: String(limit),
    }),
}
