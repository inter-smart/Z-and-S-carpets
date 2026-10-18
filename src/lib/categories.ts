// Number of categories the page shows / loads per page
export const CATEGORIES_PAGE_LIMIT = 2

// Badge (label) slug from a query value; rejects anything that isn't a plain slug
export function sanitizeBadge(value: string | undefined) {
  return value && /^[a-z0-9-]+$/i.test(value) ? value : ''
}
