import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import DynamicMeta from '@/components/common/dynamic-meta'
import BannerHiddenSpacer from '@/components/pages/common/banner-hidden-spacer'
import InnerBannerSection from '@/components/pages/common/inner-banner.section'
import ContactDetailsSection from '@/components/pages/contact/contact-details.section'
import GetInTouchSection from '@/components/pages/contact/get-in-touch.section'
import type { LocaleType } from '@/i18n/types'
import { getContactData } from '@/lib/api/contact'
import { getMetaData } from '@/lib/api/metaApi'
import { parseMetaTags, sanitizeMetadata } from '@/lib/metaHelper'
import type { ContactData } from '@/types/contact'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

// shown until the admin saves a map in the Contact CMS
const FALLBACK_MAP_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.3980334382486!2d55.46436157550704!3d25.156034577737497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f63c067f2c0d1%3A0x6dd8d7a70ad59b3f!2sZia%20And%20Sagor%20Carpets%20Trading%20LLC!5e0!3m2!1sen!2sin!4v1789990487877!5m2!1sen!2sin'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/contact'>): Promise<Metadata> {
  const { locale } = await params
  return getMetaData('contact', locale as LocaleType)
}

export default async function ContactUsPage({
  params,
}: PageProps<'/[locale]/contact'>) {
  const { locale } = await params
  const [{ data }, t] = await Promise.all([
    getContactData.getCmsData<ContactData>(),
    getTranslations({ locale, namespace: 'ContactPage' }),
  ])

  // Both languages come back in one fetch — pick the JSON-LD / extra scripts for this locale
  const otherMetaHtml =
    locale === 'ar'
      ? (data?.other_meta_ar ?? data?.other_meta)
      : data?.other_meta
  const { scripts: structuredData, inlineScripts: lineScripts } =
    sanitizeMetadata(parseMetaTags(otherMetaHtml))

  // Each section carries `is_visible`; the translated content is the fallback.
  const {
    banner_section,
    contact_detail_section,
    social_section,
    form_section,
    map_section,
  } = data ?? ({} as Partial<ContactData>)

  // Sections an admin switched off are not rendered at all
  const isOff = (section?: { is_enabled?: boolean }) =>
    section?.is_enabled === false
  const showDetails = !isOff(contact_detail_section)
  const showSocial = !isOff(social_section)
  const showForm = !isOff(form_section)
  const showLeftColumn = showDetails || showSocial

  return (
    <>
      <DynamicMeta structuredData={structuredData} lineScripts={lineScripts} />
      {!isOff(banner_section) ? (
        <InnerBannerSection
          pageName="ContactPage"
          data={banner_section?.is_visible ? banner_section : undefined}
        />
      ) : (
        <BannerHiddenSpacer />
      )}
      <BreadcrumbBar
        values={[{ name: t('BannerSection.title'), link: '/contact' }]}
      />

      {(showLeftColumn || showForm) && (
        <div
          className={`container-wrapper grid pt-5 pb-10 lg:pt-12 lg:pb-20 ${
            showLeftColumn && showForm
              ? 'lg:grid-cols-[1fr_0.95fr] lg:gap-12 xl:gap-24'
              : ''
          }`}
        >
          {showLeftColumn && (
            <ContactDetailsSection
              details={
                contact_detail_section?.is_visible
                  ? contact_detail_section
                  : undefined
              }
              social={social_section?.is_visible ? social_section : undefined}
              showDetails={showDetails}
              showSocial={showSocial}
            />
          )}
          {showForm && (
            <GetInTouchSection
              title={form_section?.is_visible ? form_section : undefined}
            />
          )}
        </div>
      )}

      {/* map section */}
      {!isOff(map_section) && (
        <div className="h-80 w-full overflow-hidden sm:h-100">
          <iframe
            src={map_section?.is_visible ? map_section.url : FALLBACK_MAP_URL}
            title="Z&S Carpets location"
            className="h-full w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      )}
    </>
  )
}
