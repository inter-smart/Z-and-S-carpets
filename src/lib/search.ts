import type { LocaleType } from '@/i18n/types'

export const SEARCH_MIN_CHARS = 2
export const SEARCH_MAX_CHARS = 80

export const cleanQuery = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : (value ?? ''))
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, SEARCH_MAX_CHARS)

export const pick = (locale: LocaleType, en?: string, ar?: string) =>
  locale === 'ar' ? ar || en || '' : en || ar || ''
