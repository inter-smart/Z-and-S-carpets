import type { LocaleType } from '@/i18n/types'
import type { WorkCardItem, WorkProject } from '@/types/work'

// Number of projects the home page shows / the works page loads per page
export const HOME_WORKS_LIMIT = 12
export const WORKS_PAGE_LIMIT = 12

const pick = (locale: LocaleType, en?: string, ar?: string) =>
  locale === 'ar' ? ar || en || '' : en || ''

export const pickLocalized = pick

// API project -> what WorkItemCard renders
export function toWorkCard(
  project: WorkProject,
  locale: LocaleType,
  btnLabel: string,
): WorkCardItem {
  return {
    id: project.slug,
    title: pick(locale, project.title, project.title_ar),
    location: pick(locale, project.location, project.location_ar),
    btnLabel,
    image: project.thumbnail_url,
  }
}

// Industry slug from a query value (rejects anything that isn't a plain slug)
export function sanitizeIndustry(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value
  return raw && /^[a-z0-9-]+$/i.test(raw) ? raw : ''
}
