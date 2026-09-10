import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import { LocaleType } from '@/i18n/types'
import { font } from '@/lib/utils'
import { useLocale, useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('HomePage')
  const locale = useLocale() as LocaleType

  return (
    <>
      <div>
        <Navbar />
        <div className="flex flex-row space-x-2">
          <div className="w-5 h-5 bg-blue-400"></div>
          <div className="w-5 h-5 bg-blue-400 hidden sm:block"></div>
          <div className="w-5 h-5 bg-blue-400 hidden md:block"></div>
          <div className="w-5 h-5 bg-blue-400 hidden lg:block"></div>
          <div className="w-5 h-5 bg-blue-400 hidden xl:block"></div>
          <div className="w-5 h-5 bg-blue-400 hidden 2xl:block"></div>
        </div>
        <h1 className={font(locale, { en: 'font-inter', ar: 'font-cairo' })}>
          {t('title')}
        </h1>
        <div className="w-1/3 h-20 bg-amber-400"></div>
        <h1 className={font(locale, { en: 'font-manrope', ar: 'font-cairo' })}>
          {t('title')}
        </h1>
      </div>
      <Footer />
    </>
  )
}
