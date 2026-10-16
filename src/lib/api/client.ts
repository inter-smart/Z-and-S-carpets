export const API_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || ''

type ApiClientOptions = RequestInit & {
  next?: NextFetchRequestConfig
}

// Read-only CMS/listing/detail fetches (no cookie forwarding). Supports Next's
// fetch cache/`next.revalidate` options. For endpoints needing cookie-forwarded
// user context, use `fetchApi` from `./server` instead.
export async function apiClient<T = unknown>(
  endpoint: string,
  options: ApiClientOptions = {},
): Promise<T> {
  const url = `${API_URL}${endpoint}`

  const { next, cache, ...restOptions } = options
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...restOptions.headers,
    },
    ...restOptions,
    ...(next && { next }),
    ...(cache && { cache }),
  }

  const res = await fetch(url, config)

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || `HTTP ${res.status}`)
  }

  return res.json()
}
