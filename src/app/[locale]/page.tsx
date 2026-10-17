import ChooseUsSection from '@/components/pages/common/choose-us.section'
import FAQSection from '@/components/pages/common/faq.section'
import ProcessSections from '@/components/pages/common/process.section'
import BannerSection from '@/components/pages/home/banner.section'
import BestSellersSection from '@/components/pages/home/best-sellers.section'
import BuiltForSection from '@/components/pages/home/built-for.section'
import CollectionSection from '@/components/pages/home/collection.section'
import CustomerExpSection from '@/components/pages/home/customer-exp.section'
import ImgCompareSection from '@/components/pages/home/img-compare.section'
import PremiumSolutionsSection from '@/components/pages/home/premium-solutions.section'
import TrustedPartnerSection from '@/components/pages/home/trusted-partner.section'
import WorksSection from '@/components/pages/home/works.section'
import WorksSkeleton from '@/components/pages/home/works-skeleton'
import DynamicMeta from '@/components/common/dynamic-meta'
import { getHomeData } from '@/lib/api/home'
import { getMetaData } from '@/lib/api/metaApi'
import { parseMetaTags, sanitizeMetadata } from '@/lib/metaHelper'
import type { LocaleType } from '@/i18n/types'
import type { HomeData } from '@/types/home'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  return getMetaData('home', locale as LocaleType)
}

export default async function HomePage({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params
  const { data } = await getHomeData.getCmsData<HomeData>()

  // Both languages come back in one fetch (same convention as every other
  // section below) — pick the one for the current locale here.
  const otherMetaHtml =
    locale === 'ar'
      ? (data?.other_meta_ar ?? data?.other_meta)
      : data?.other_meta
  const { scripts: structuredData, inlineScripts: lineScripts } =
    sanitizeMetadata(parseMetaTags(otherMetaHtml))

  // Home CMS payload, destructured for upcoming section integration.
  // Each section carries `is_visible`; render a section only when it is true.
  const {
    banner_section,
    milestones_section,
    discover_section,
    industries_section,
    testimonials_section,
    brands_section,
    faqs_section,
    side_images_section,
    premium_section,
    works_section,
    features_section,
    side_section,
    how_it_works_section,
    residential_section,
    cta_section,
  } = data ?? ({} as Partial<HomeData>)

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      {banner_section?.is_visible && (
        <BannerSection
          banners={banner_section.list}
          milestones={milestones_section}
        />
      )}
      {discover_section?.is_visible && (
        <CollectionSection discover={discover_section} />
      )}
      {residential_section?.is_visible && (
        <BestSellersSection residential={residential_section} />
      )}
      {industries_section?.is_visible && (
        <BuiltForSection industries={industries_section} />
      )}
      <Suspense fallback={<WorksSkeleton />}>
        <WorksSection title={works_section} />
      </Suspense>
      {features_section?.is_visible && (
        <ChooseUsSection features={features_section} side={side_section} />
      )}
      {side_images_section?.is_visible && (
        <ImgCompareSection sideImages={side_images_section} />
      )}
      {how_it_works_section?.is_visible && (
        <ProcessSections data={how_it_works_section} />
      )}
      {testimonials_section?.is_visible && (
        <CustomerExpSection testimonials={testimonials_section} />
      )}
      {(brands_section?.is_visible || cta_section?.is_visible) && (
        <TrustedPartnerSection brands={brands_section} cta={cta_section} />
      )}
      {(faqs_section?.is_visible || premium_section?.is_visible) && (
        <section className="relative">
          {/* right-side background */}
          <div className="pointer-events-none absolute inset-y-0 hidden bg-[#EFF9FE] lg:block ltr:right-0 ltr:left-1/2 rtl:right-1/2 rtl:left-0" />
          {/* actual content */}
          <div className="lg:container-wrapper relative grid grid-cols-1 lg:grid-cols-2">
            {faqs_section?.is_visible && (
              <FAQSection
                data={faqs_section}
                container={false}
                className="container-wrapper lg:container-wrapper-none"
              />
            )}
            {premium_section?.is_visible && (
              <PremiumSolutionsSection premium={premium_section} />
            )}
          </div>
        </section>
      )}
    </>
  )
}
