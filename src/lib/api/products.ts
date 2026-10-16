import { sendError, sendSuccess, type ApiResult } from './api'
import { fetchApi } from './server'

export const getProductsData = {
  // Resolved dynamic-detail fields for a product (or one of its variants).
  // Metadata for <head> is fetched separately via `getDetailMetaData` in `./metaApi`.
  getProductDetails: async <T = unknown>(
    productId: number | string,
    variantId?: number | string | null,
  ): Promise<ApiResult<T>> => {
    try {
      const params = new URLSearchParams({ product_id: String(productId) })
      if (variantId) params.append('variant_id', String(variantId))

      const data = await fetchApi<{ data: T }>(
        `/api/frontend/product-details?${params.toString()}`,
        {},
        false,
      )
      return sendSuccess(data?.data as T)
    } catch (error) {
      return sendError(error)
    }
  },

  // No backend endpoint yet for a paginated product listing / category filters
  // (CLAUDE.md: Industry → Category → Product catalog is still being built).
  // Wire this up to `/api/frontend/products/product-listing` once it exists.
  getProductList: async <T = unknown>(
    params: string,
  ): Promise<ApiResult<T>> => {
    try {
      const data = await fetchApi<{ data: T }>(
        `/api/frontend/products/product-listing?${params}`,
        {},
        false,
      )
      return sendSuccess(data?.data as T)
    } catch (error) {
      return sendError(error)
    }
  },
}
