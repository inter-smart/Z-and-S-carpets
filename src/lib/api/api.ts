export type ApiResult<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: string }

export const sendSuccess = <T>(data: T): ApiResult<T> => ({
  success: true,
  data,
  error: null,
})

export const sendError = (error: unknown): ApiResult<never> => ({
  success: false,
  data: null,
  error: error instanceof Error ? error.message : String(error),
})
