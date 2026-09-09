import { LocaleType } from '@/i18n/types'
import { font } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'

export default function Home() {
  const t = useTranslations('HomePage')
  const locale = useLocale() as LocaleType

  return (
    <div>
      <h1 className={font(locale, { en: 'font-inter', ar: 'font-cairo' })}>
        {t('title')}
      </h1>
      <div className="w-1/3 h-20 bg-amber-400"></div>
      <h1 className={font(locale, { en: 'font-manrope', ar: 'font-cairo' })}>
        {t('title')}
      </h1>
    </div>
  )
}
