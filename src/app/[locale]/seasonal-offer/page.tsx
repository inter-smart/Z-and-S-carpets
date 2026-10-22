import SeasonalOfferPageDialog from '@/components/pages/common/seasonal-offer-page-dialog'
import type { LocaleType } from '@/i18n/types'
import { getSeasonalOfferData } from '@/lib/api/seasonal-offer'
import type { SeasonalOfferData } from '@/types/seasonal-offer'
import { getTranslations } from 'next-intl/server'

export default async function SeasonalOffer({
  params,
}: PageProps<'/[locale]/seasonal-offer'>) {
  const { locale } = await params
  const lang = locale as LocaleType
  const pick = (en?: string, ar?: string) =>
    lang === 'ar' ? ar || en || '' : en || ''

  const [result, t] = await Promise.all([
    getSeasonalOfferData.getCmsData<SeasonalOfferData>(),
    getTranslations({ locale, namespace: 'SeasonalOfferPage' }),
  ])
  const data = result.success ? result.data : undefined

  if (!data?.is_visible) {
    return (
      <div className="container-wrapper flex h-100 items-center justify-center">
        <p className="text-center text-base text-[#555]">{t('noOffer')}</p>
      </div>
    )
  }

  const buttonHref = data.button_link.startsWith('/')
    ? `/${lang}${data.button_link}`
    : data.button_link

  return (
    <div className="container-wrapper flex h-100 items-center justify-center">
      <SeasonalOfferPageDialog
        triggerLabel={t('showOfferLabel')}
        media={data.media}
        badge={data.badge}
        buttonText={pick(data.button_text, data.button_text_ar)}
        buttonHref={buttonHref}
      />
    </div>
  )
}
