import { FloorImg1, VectorPart1 } from '@/assets/images'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function LookingForwardBanner() {
  const t = useTranslations('HomePage.LookingForwardCard')

  return (
    <article>
      <div className="text-primary-foreground relative mt-12 min-h-64 w-full overflow-hidden rounded-md lg:mt-20">
        <Image
          src={FloorImg1}
          alt="Elegant flooring interior"
          className="absolute inset-y-0 hidden h-full w-3/5 object-cover object-bottom opacity-45 sm:opacity-100 md:block ltr:right-0 rtl:left-0"
        />
        <div className="relative z-10 flex min-h-64 w-full flex-col justify-center gap-1 px-8 py-10 sm:px-10 md:w-5/7 lg:px-12">
          <div className="absolute inset-0 -z-10 w-full bg-[#812990] ltr:sm:right-24 rtl:sm:left-24">
            <div className="relative ms-auto hidden h-full w-40 md:block">
              <Image
                src={VectorPart1}
                alt="vector part"
                className="absolute top-0 h-full object-cover ltr:-right-1/2 rtl:-left-1/2 rtl:scale-x-[-1]"
              />
            </div>
          </div>
          <h3 className="text-3xl leading-tight font-medium text-balance md:text-4xl lg:text-5xl">
            {t('title.first')}&nbsp;
            <span className="font-thin">{t('title.second')}</span>
          </h3>
          <p className="text-sm lg:text-base">{t('description')}</p>
          <button
            type="button"
            className="pointer-events-auto mt-5 block w-fit rounded-sm bg-[#0066B3] px-8 py-2.5 text-sm text-white"
          >
            {t('btnLabel')}
          </button>
        </div>
      </div>
    </article>
  )
}
