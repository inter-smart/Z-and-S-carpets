// Global switch for server-side API response caching (Next fetch cache).
//   API_CACHE=off            -> every request hits the API (no-store), handy for testing
//   API_CACHE=on (default)   -> responses are cached and revalidated every API_CACHE_SECONDS (default 60)
// Only use it for public, non-user-specific CMS reads (no cookie forwarding).
export const API_CACHE_ENABLED = process.env.API_CACHE !== 'off'
export const API_CACHE_SECONDS = Number(process.env.API_CACHE_SECONDS) || 60

export function apiCacheOptions(tags: string[] = []) {
  return API_CACHE_ENABLED
    ? { next: { revalidate: API_CACHE_SECONDS, tags } }
    : { cache: 'no-store' as const }
}
