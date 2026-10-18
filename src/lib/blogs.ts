import type { LocaleType } from '@/i18n/types'

// Number of posts the list shows / loads per page
export const BLOGS_PAGE_LIMIT = 6

// `?page=N` in the URL means "show the first N pages" (the Load More state); capped so the
// first request stays within the API's limit (120 items)
export const BLOGS_MAX_URL_PAGE = 20

export type BlogSort = 'latest' | 'oldest'

const SLUG = /^[a-z0-9-]+$/i
const MAX_FILTER_VALUES = 40

const firstValue = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

// `?category=a,b` -> ['a', 'b'] (plain slugs only, no duplicates)
export function parseSlugs(value: string | string[] | undefined) {
  const slugs = (firstValue(value) ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter((item) => SLUG.test(item))
  return [...new Set(slugs)].slice(0, MAX_FILTER_VALUES)
}

export function parseSort(value: string | string[] | undefined): BlogSort {
  return firstValue(value) === 'oldest' ? 'oldest' : 'latest'
}

// Page count from a query value: an integer between 1 and BLOGS_MAX_URL_PAGE
export function sanitizePage(value: string | string[] | undefined) {
  const parsed = parseInt(firstValue(value) ?? '', 10)
  return Number.isInteger(parsed) && parsed > 0
    ? Math.min(parsed, BLOGS_MAX_URL_PAGE)
    : 1
}

// Query string for the blogs page / API from the selected filters (defaults are left out)
export function buildBlogQuery(
  categories: string[],
  tags: string[],
  sort: BlogSort,
) {
  const query = new URLSearchParams()
  if (categories.length) query.set('category', categories.join(','))
  if (tags.length) query.set('tag', tags.join(','))
  if (sort !== 'latest') query.set('sort', sort)
  return query
}

// Date as the cards show it ("November 10, 2025" / "10 نوفمبر 2025"), in UTC so the server and
// the browser render the same day
export function formatBlogDate(iso: string, locale: LocaleType) {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-u-nu-latn' : 'en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date)
}

export const pickLocalized = (
  locale: LocaleType,
  en?: string | null,
  ar?: string | null,
) => (locale === 'ar' ? ar || en || '' : en || '')

const GALLERY_MARKER = /<p>\s*\[gallery\]\s*<\/p>/i

// The article body split at the first `[gallery]` marker: [before, after, hasMarker]. Any later
// marker is dropped. Without a marker the whole body is "before" (the swiper then goes after it).
export function splitAtGallery(html: string): [string, string, boolean] {
  const match = GALLERY_MARKER.exec(html)
  if (!match) return [html, '', false]
  const before = html.slice(0, match.index)
  const after = html
    .slice(match.index + match[0].length)
    .replace(new RegExp(GALLERY_MARKER.source, 'gi'), '')
  return [before, after, true]
}

// Links written as site paths in the editor (`/products?...`) get the visitor's language
export function localizeInternalLinks(html: string, locale: LocaleType) {
  return html.replace(/href="\/(?!en\/|ar\/|en"|ar"|\/)/g, `href="/${locale}/`)
}
