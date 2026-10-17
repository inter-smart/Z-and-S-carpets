import type { LocaleType } from '@/i18n/types'
import type { SiteSettingsPage } from '@/types/site-settings'

export type NavLink = { text: string; link: string }

// API page links are relative ("/about", "/" for home); external links are kept as they are
export function localizedHref(locale: LocaleType, link: string) {
  if (/^https?:\/\//i.test(link)) return link
  return link === '/' || link === '' ? `/${locale}` : `/${locale}${link}`
}

export const toNavLinks = (pages: SiteSettingsPage[]): NavLink[] =>
  pages.map((page) => ({ text: page.title, link: page.link }))

// Floating-button links are typed in by the admin: "tel:+971…", "https://wa.me/…" or a bare email.
// Returns a usable href plus the button colour for that kind of link.
export function toContactLink(locale: LocaleType, link: string) {
  const value = link.trim()

  if (/^(https?:|mailto:|tel:|sms:)/i.test(value)) {
    const lower = value.toLowerCase()
    return {
      href: value,
      external: lower.startsWith('http'),
      color: lower.startsWith('mailto:')
        ? 'bg-[#812990]'
        : lower.startsWith('tel:')
          ? 'bg-[#0066B3]'
          : lower.includes('wa.me') || lower.includes('whatsapp')
            ? 'bg-[#72BF44]'
            : 'bg-our-blue',
    }
  }
  if (value.includes('@') && !value.includes('/'))
    return { href: `mailto:${value}`, external: false, color: 'bg-[#812990]' }
  if (/^\+?[\d\s()-]{6,}$/.test(value))
    return {
      href: `tel:${value.replaceAll(' ', '')}`,
      external: false,
      color: 'bg-[#0066B3]',
    }
  if (value.startsWith('/'))
    return {
      href: localizedHref(locale, value),
      external: false,
      color: 'bg-our-blue',
    }
  return { href: `https://${value}`, external: true, color: 'bg-our-blue' }
}
