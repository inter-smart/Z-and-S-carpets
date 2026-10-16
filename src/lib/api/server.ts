import { cookies } from 'next/headers'

const API_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || ''

// Fetch wrapper that can forward the incoming request's cookies to the backend
// (needed for user-specific data, e.g. logged-in pricing). Use `apiClient` from
// `./client` for plain read-only CMS/listing/detail fetches instead.
export async function fetchApi<T = unknown>(
  endpoint: string,
  options: RequestInit = {},
  passCookie = false,
): Promise<T> {
  const url = `${API_URL}${endpoint}`

  let cookieHeader: string | null = null

  if (passCookie) {
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll()

    if (allCookies.length > 0) {
      cookieHeader = allCookies.map((c) => `${c.name}=${c.value}`).join('; ')
    }
  }

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(cookieHeader && { Cookie: cookieHeader }),
      ...options.headers,
    },
    ...options,
  }

  const res = await fetch(url, config)

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(error.message || `HTTP ${res.status}`)
  }

  return res.json()
}
