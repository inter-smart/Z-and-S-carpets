import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import DynamicMeta from '@/components/common/dynamic-meta'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import IntroSection from '@/components/pages/services/intro.section'
import ProcessSection from '@/components/pages/services/process.section'
import ServicesGridSection from '@/components/pages/services/services-grid.section'
import type { LocaleType } from '@/i18n/types'
import { getMetaData } from '@/lib/api/metaApi'
import { getServicesData } from '@/lib/api/services'
import { parseMetaTags, sanitizeMetadata } from '@/lib/metaHelper'
import type { ServicesData } from '@/types/services'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/services'>): Promise<Metadata> {
  const { locale } = await params
  return getMetaData('services', locale as LocaleType)
}

export default async function ServicesPage({
  params,
}: PageProps<'/[locale]/services'>) {
  const { locale } = await params
  const [{ data }, t] = await Promise.all([
    getServicesData.getCmsData<ServicesData>(),
    getTranslations({ locale, namespace: 'ServicesPage' }),
  ])

  // Both languages come back in one fetch — pick the JSON-LD / extra scripts for this locale
  const otherMetaHtml =
    locale === 'ar'
      ? (data?.other_meta_ar ?? data?.other_meta)
      : data?.other_meta
  const { scripts: structuredData, inlineScripts: lineScripts } =
    sanitizeMetadata(parseMetaTags(otherMetaHtml))

  // Each section carries `is_visible`; render a section only when it is true.
  const {
    banner_section,
    introduction_section,
    service_section,
    process_steps_section,
  } = data ?? ({} as Partial<ServicesData>)

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      {/* the banner falls back to its translated content when the API has none */}
      <InnerBannerSection
        pageName="ServicesPage"
        data={banner_section?.is_visible ? banner_section : undefined}
      />
      <BreadcrumbBar
        values={[{ name: t('BannerSection.title'), link: '/services' }]}
        className="bg-[#EFF9FE]"
      />
      {introduction_section?.is_visible && (
        <IntroSection data={introduction_section} />
      )}
      {service_section?.is_visible && (
        <ServicesGridSection data={service_section} />
      )}
      {process_steps_section?.is_visible && (
        <ProcessSection data={process_steps_section} />
      )}
    </>
  )
}
