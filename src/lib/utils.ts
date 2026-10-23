import { LocaleType } from '@/i18n/types'

export { cn } from 'cn'

export const PLACEHOLDER_IMAGE = '/images/placeholder.svg'

export const resolveImageSrc = (src?: string | null) =>
  src && src.trim() ? src : PLACEHOLDER_IMAGE

export const font = <T extends Record<'en' | 'ar', string>>(
  locale: LocaleType,
  fonts: T,
) => fonts[locale]
