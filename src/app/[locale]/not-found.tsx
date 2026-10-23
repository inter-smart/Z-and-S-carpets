import type { LocaleType } from '@/i18n/types'
import { getSiteSettingsData } from '@/lib/api/siteSettings'
import type { SiteSettingsData } from '@/types/site-settings'
import type { Metadata } from 'next'
import { getLocale } from 'next-intl/server'
import NotFoundPage from './not-found-page'

export const metadata: Metadata = {
  title: 'Page not Found | Z&S Carpets',
  description:
    "Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.",
  // a 404 has nothing worth indexing, but still let crawlers follow its links
  robots: { index: false, follow: true },
}

export default async function NotFound() {
  // not-found.tsx doesn't receive `params` the way a normal page does, even
  // under a dynamic segment — this is next-intl's own mechanism (backed by
  // next/root-params, see src/i18n/request.ts) for resolving the locale
  // outside the normal params prop.
  const locale = (await getLocale()) as LocaleType
  // the same cached call the layout makes for the real footer; the translated
  // content is the fallback when it is missing
  const siteSettings =
    await getSiteSettingsData.getCmsData<SiteSettingsData>(locale)
  const footer = siteSettings.success ? siteSettings.data.footer : undefined

  return <NotFoundPage footer={footer} />
}
