import { VectorPart1 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function LookingForwardCard() {
  const locale = useLocale() as LocaleType

  const t = useTranslations('HomePage.LookingForwardCard')

  return (
    <article className="bg-our-purple mt-12 grid grid-cols-1 overflow-hidden rounded text-white sm:grid-cols-[1.5fr_0.5fr] lg:mt-20 lg:grid-cols-[1.55fr_0.45fr]">
      <div className="relative flex flex-col justify-center gap-1 px-8 py-12 sm:px-10 lg:px-12">
        <h3 className="text-9xl font-medium text-balance">
          {t('title.first')}&nbsp;
          <span className="font-extralight">{t('title.second')}</span>
        </h3>
        <p className="text-lg">{t('description')}</p>
        <Button
          type="button"
          className="bg-our-blue our-btn pointer-events-auto mt-5 w-fit"
          nativeButton={false}
          render={<Link href={`/${locale}/contact`} />}
        >
          {t('btnLabel')}
        </Button>
        <Image
          src={VectorPart1}
          alt="vector part"
          className="absolute top-0 z-10 hidden h-full object-contain sm:block ltr:-right-20 rtl:-left-20 rtl:scale-x-[-1]"
        />
      </div>
      <div className="relative hidden sm:block">
        <Image
          src={t('image')}
          fill
          alt="Elegant flooring interior"
          className="h-full w-full object-cover"
        />
      </div>
    </article>
  )
}
