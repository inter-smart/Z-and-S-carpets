import type { LocaleType } from '@/i18n/types'
import type { ProductItemType } from '@/types/product'
import type { ProductListItem } from '@/types/product-list'

// Number of products the page shows / loads per page
export const PRODUCTS_PAGE_LIMIT = 6

// `?page=N` in the URL means "show the first N pages" (the Load More state); capped so the
// first request stays within the API's limit (120 items)
export const PRODUCTS_MAX_URL_PAGE = 20

const SLUG = /^[a-z0-9-]+$/i
const MAX_FILTER_VALUES = 40

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

// `?category=a,b` -> ['a', 'b'] (plain slugs only, no duplicates)
export function parseCategories(value: string | string[] | undefined) {
  const slugs = (firstValue(value) ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter((item) => SLUG.test(item))
  return [...new Set(slugs)].slice(0, MAX_FILTER_VALUES)
}

// `?attrs=color:oak,color:grey,size:2m` -> { color: ['oak', 'grey'], size: ['2m'] }
export function parseAttrs(value: string | string[] | undefined) {
  const attrs: Record<string, string[]> = {}
  for (const pair of (firstValue(value) ?? '')
    .split(',')
    .slice(0, MAX_FILTER_VALUES)) {
    const [attribute, valueSlug, ...rest] = pair.trim().split(':')
    if (
      rest.length ||
      !SLUG.test(attribute ?? '') ||
      !SLUG.test(valueSlug ?? '')
    )
      continue
    attrs[attribute] = [...new Set([...(attrs[attribute] ?? []), valueSlug])]
  }
  return attrs
}

export function serializeAttrs(attrs: Record<string, string[]>) {
  return Object.entries(attrs)
    .flatMap(([attribute, values]) =>
      values.map((value) => `${attribute}:${value}`),
    )
    .join(',')
}

// Query string for the products page / API from the selected filters (empty ones are left out)
export function buildFilterQuery(
  categories: string[],
  attrs: Record<string, string[]>,
) {
  const query = new URLSearchParams()
  if (categories.length) query.set('category', categories.join(','))
  const serialized = serializeAttrs(attrs)
  if (serialized) query.set('attrs', serialized)
  return query
}

// Page count from a query value: an integer between 1 and PRODUCTS_MAX_URL_PAGE
export function sanitizePage(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value
  const parsed = parseInt(raw ?? '', 10)
  return Number.isInteger(parsed) && parsed > 0
    ? Math.min(parsed, PRODUCTS_MAX_URL_PAGE)
    : 1
}

const pick = (locale: LocaleType, en?: string, ar?: string) =>
  locale === 'ar' ? ar || en || '' : en || ''

// API product -> what ProductItemCard renders
export function toProductCard(
  item: ProductListItem,
  locale: LocaleType,
): ProductItemType {
  const name = pick(locale, item.title, item.title_ar)

  return {
    slug: item.slug,
    id: item.id,
    name,
    description: pick(locale, item.description, item.description_ar),
    image: item.media.path ?? '',
    imageAlt: pick(locale, item.media.alt, item.media.alt_ar) || name,
    badge: item.badge
      ? pick(locale, item.badge.title, item.badge.title_ar)
      : undefined,
    category: pick(locale, item.category.title, item.category.title_ar),
    material: '',
    color: '',
    usage: '',
    tags: [],
  }
}
