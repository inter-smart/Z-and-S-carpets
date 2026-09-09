import { LocaleType } from '@/i18n/types'

export { cn } from 'cn'

export const font = <T extends Record<'en' | 'ar', string>>(
  locale: LocaleType,
  fonts: T,
) => fonts[locale]
