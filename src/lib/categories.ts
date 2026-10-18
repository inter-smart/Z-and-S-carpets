// Number of categories the page shows / loads per page
export const CATEGORIES_PAGE_LIMIT = 6

// `?page=N` in the URL means "show the first N pages" (the Load More state); capped so the
// first request stays within the API's limit (120 items)
export const CATEGORIES_MAX_URL_PAGE = 20

// Badge (label) slug from a query value; rejects anything that isn't a plain slug
export function sanitizeBadge(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value
  return raw && /^[a-z0-9-]+$/i.test(raw) ? raw : ''
}

// Page count from a query value: an integer between 1 and CATEGORIES_MAX_URL_PAGE
export function sanitizePage(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value
  const parsed = parseInt(raw ?? '', 10)
  return Number.isInteger(parsed) && parsed > 0
    ? Math.min(parsed, CATEGORIES_MAX_URL_PAGE)
    : 1
}
