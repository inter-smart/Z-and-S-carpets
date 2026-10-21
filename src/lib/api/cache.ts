// Server-side API response caching is disabled: every request hits the
// backend directly (no-store), regardless of `tags`.
export function apiCacheOptions(_tags: string[] = []) {
  return { cache: 'no-store' as const }
}
