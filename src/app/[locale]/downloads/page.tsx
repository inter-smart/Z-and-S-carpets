import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import DynamicMeta from '@/components/common/dynamic-meta'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import DownloadsCardSection from '@/components/pages/downloads/downloads-card.section'
import type { LocaleType } from '@/i18n/types'
import {
  DOWNLOADS_PAGE_LIMIT,
  getDownloadsData,
  sanitizeDownloadsPage,
} from '@/lib/api/downloads'
import { getMetaData } from '@/lib/api/metaApi'
import { parseMetaTags, sanitizeMetadata } from '@/lib/metaHelper'
import type { DownloadsPageData } from '@/types/download'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/downloads'>): Promise<Metadata> {
  const { locale } = await params
  return getMetaData('downloads', locale as LocaleType)
}

export default async function DownloadsPage({
  params,
  searchParams,
}: PageProps<'/[locale]/downloads'>) {
  const { locale } = await params
  // ?page=<n>: how many pages are shown (Load More), loaded together on the server
  const pages = sanitizeDownloadsPage((await searchParams).page)
  const lang = locale as LocaleType

  const [page, t] = await Promise.all([
    getDownloadsData.getPageData<DownloadsPageData>({
      page: '1',
      limit: String(DOWNLOADS_PAGE_LIMIT * pages),
    }),
    getTranslations({ locale, namespace: 'DownloadsPage' }),
  ])

  const pageData = page.success ? page.data : undefined
  const otherMetaHtml =
    lang === 'ar'
      ? (pageData?.other_meta_ar ?? pageData?.other_meta)
      : pageData?.other_meta
  const { scripts: structuredData, inlineScripts: lineScripts } =
    sanitizeMetadata(parseMetaTags(otherMetaHtml))
  const banner = pageData?.banner_section

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      {/* the banner falls back to its translated content when the API has none */}
      <InnerBannerSection
        pageName="DownloadsPage"
        data={banner?.is_visible ? banner : undefined}
      />
      <BreadcrumbBar
        values={[{ name: t('BannerSection.title'), link: '/downloads' }]}
      />
      <DownloadsCardSection
        initialDownloads={pageData?.downloads ?? []}
        initialPage={pages}
        initialHasMore={pageData?.pagination?.hasMore ?? false}
      />
    </>
  )
}
