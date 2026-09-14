import { FloorImg1 } from '@/assets/images'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function LookingForwardBanner() {
  const t = useTranslations('LookingForwardMsg')

  return (
    <article>
      <div className="relative w-full mt-16 min-h-72 overflow-hidden rounded-md text-primary-foreground">
        <Image
          src={FloorImg1}
          alt="Elegant flooring interior"
          className="hidden md:block absolute inset-y-0 ltr:right-0 rtl:left-0 h-full w-3/5 object-cover object-bottom opacity-45 sm:opacity-100"
        />
        <div className="relative z-10 flex min-h-72 w-full md:w-4/5 flex-col justify-center gap-3 px-8 py-10 sm:px-10 lg:px-12">
          <div className="w-full absolute inset-0 -z-10  bg-[#812990] ltr:sm:right-24 rtl:sm:left-24 ltr:md:rounded-r-full rtl:md:rounded-l-full" />
          <h3 className="text-balance text-3xl font-medium leading-tight sm:text-4xl">
            {t('title.first')}&nbsp;
            <span className="font-thin">{t('title.second')}</span>
          </h3>
          <p className="text-sm leading-6 text-primary-foreground/85 sm:text-base">
            {t('description')}
          </p>
          <button
            type="button"
            className="w-fit mt-5 block rounded-sm bg-[#0066B3] px-8 py-2.5 text-sm text-white"
          >
            {t('btnLabel')}
          </button>
        </div>
      </div>
    </article>
  )
}
