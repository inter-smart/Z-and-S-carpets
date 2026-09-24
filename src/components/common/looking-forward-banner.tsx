import { VectorPart1 } from '@/assets/images'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function LookingForwardBanner() {
  const t = useTranslations('HomePage.LookingForwardCard')

  return (
    <article className="bg-our-purple mt-12 grid min-h-64 grid-cols-1 overflow-hidden rounded-md text-white sm:grid-cols-[1.5fr_0.5fr] lg:mt-20 lg:grid-cols-[1.55fr_0.45fr]">
      <div className="relative flex flex-col justify-center gap-1 px-8 py-10 sm:px-10 lg:px-12">
        <h3 className="text-3xl leading-tight font-medium text-balance md:text-4xl lg:text-5xl">
          {t('title.first')}&nbsp;
          <span className="font-thin">{t('title.second')}</span>
        </h3>
        <p className="text-sm lg:text-base">{t('description')}</p>
        <button
          type="button"
          className="bg-our-blue pointer-events-auto mt-5 block w-fit rounded-sm px-8 py-2.5 text-sm"
        >
          {t('btnLabel')}
        </button>
        <Image
          src={VectorPart1}
          alt="vector part"
          className="absolute top-0 z-10 h-full object-cover ltr:-right-20 rtl:-left-20 rtl:scale-x-[-1]"
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
