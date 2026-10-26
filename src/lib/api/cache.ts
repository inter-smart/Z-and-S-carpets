// Backend responses are cached by Next's data cache and refreshed in the
// background after `REVALIDATE_SECONDS`, so a render doesn't wait on the API
// every time. Admin edits show up within that window; `tags` allow targeted
// `revalidateTag()` later.
export const REVALIDATE_SECONDS = 60

export function apiCacheOptions(tags: string[] = []) {
  return { next: { revalidate: REVALIDATE_SECONDS, tags } }
}
