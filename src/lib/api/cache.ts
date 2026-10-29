// Backend response caching is currently DISABLED (QA testing) so admin edits show up
// immediately. To re-enable, return `{ next: { revalidate: REVALIDATE_SECONDS, tags } }`
// below and restore the `next` option in `metaApi.ts`.
export const REVALIDATE_SECONDS = 60

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function apiCacheOptions(_tags: string[] = []) {
  return { cache: 'no-store' as const }
}
