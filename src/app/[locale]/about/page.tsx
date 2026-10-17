import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import DynamicMeta from '@/components/common/dynamic-meta'
import HistorySection from '@/components/pages/about/history.section'
import IndustriesSection from '@/components/pages/about/industries.section'
import IntroSection from '@/components/pages/about/intro.section'
import ManagementSection from '@/components/pages/about/management.section'
import ValuesSection from '@/components/pages/about/values.section'
import ChooseUsSection from '@/components/pages/common/choose-us.section'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import ProcessSections from '@/components/pages/common/process.section'
import type { LocaleType } from '@/i18n/types'
import { getAboutData } from '@/lib/api/about'
import { getMetaData } from '@/lib/api/metaApi'
import { parseMetaTags, sanitizeMetadata } from '@/lib/metaHelper'
import type { AboutData } from '@/types/about'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const { locale } = await params
  return getMetaData('about', locale as LocaleType)
}

export default async function AboutUsPage({
  params,
}: PageProps<'/[locale]/about'>) {
  const { locale } = await params
  const { data } = await getAboutData.getCmsData<AboutData>()

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
    history_section,
    messages_section,
    core_value_section,
    industry_section,
    how_it_works_section,
    features_section,
    side_section,
  } = data ?? ({} as Partial<AboutData>)

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      {/* the banner falls back to its translated content when the API has none */}
      <InnerBannerSection
        pageName="AboutPage"
        data={banner_section?.is_visible ? banner_section : undefined}
      />
      <BreadcrumbBar values={[{ name: 'About Us', link: '/about' }]} />
      {introduction_section?.is_visible && (
        <IntroSection data={introduction_section} />
      )}
      {history_section?.is_visible && <HistorySection data={history_section} />}
      {messages_section?.is_visible && (
        <ManagementSection data={messages_section} />
      )}
      {how_it_works_section?.is_visible && (
        <ProcessSections data={how_it_works_section} />
      )}
      {core_value_section?.is_visible && (
        <ValuesSection data={core_value_section} />
      )}
      {features_section?.is_visible && (
        <ChooseUsSection features={features_section} side={side_section} />
      )}
      {industry_section?.is_visible && (
        <IndustriesSection data={industry_section} />
      )}
    </>
  )
}
