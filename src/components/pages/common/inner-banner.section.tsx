import type { LocaleType } from '@/i18n/types'
import { useLocale, useTranslations } from 'next-intl'

interface InnerBannerSectionProps {
  pageName: string
  // When omitted (or empty) the translated banner for `pageName` is used
  data?: {
    title: string
    title_ar: string
    sub_title: string
    sub_title_ar: string
    media: { path: string | null }
  }
}

export default function InnerBannerSection({
  pageName,
  data,
}: InnerBannerSectionProps) {
  const locale = useLocale() as LocaleType
  const t = useTranslations(`${pageName}.BannerSection`)
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  return (
    <div
      className="relative h-54 w-full text-white lg:h-64 xl:h-74"
      style={{
        backgroundImage: `url(${data?.media.path ?? t('image')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute top-0 h-full w-full from-black/80 to-black/0 ltr:bg-linear-to-r rtl:bg-linear-to-l">
        <div className="container-wrapper flex h-full items-end justify-start pb-6 lg:pb-8 xl:pb-10">
          <div>
            <h1 className="our-heading">
              {data ? pick(data.title, data.title_ar) : t('title')}
            </h1>
            <h1 className="text-lg font-normal">
              {data
                ? pick(data.sub_title, data.sub_title_ar)
                : t('description')}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
