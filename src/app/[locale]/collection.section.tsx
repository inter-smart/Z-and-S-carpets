import {
  ArrowLeftIcon,
  ArrowLeftPurpleIcon,
  ArrowRightIcon,
  ArrowRightPurpleIcon,
} from '@/assets/icons'
import { FloorImg2, FloorImg5 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import { font } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

const collectionImgs = {
  'laminate-flooring': FloorImg5,
  'carpet-flooring': FloorImg2,
}

export default function CollectionSection() {
  const locale = useLocale() as LocaleType

  const t = useTranslations('collection')
  const collectionItems = t.raw('items') as {
    id: string
    title: string
  }[]
  // const collections = t.raw('pfs') as {
  //   title: string
  //   paragraphs: string[]
  //   buttonLabel: string
  // }

  return (
    <section
      className="bg-background px-6 py-16 sm:px-10 lg:px-[5.4vw] lg:py-24"
      aria-labelledby="collection-title"
    >
      <div className="flex items-center justify-between gap-6">
        <h2
          id="collection-title"
          className={cn(
            'text-4xl font-medium tracking-[-0.04em] sm:text-5xl',
            font(locale as LocaleType, {
              en: 'font-nobile',
              ar: 'font-cairo',
            }),
          )}
        >
          {t('title')}
        </h2>
        <Button
          variant="outline"
          className="hidden sm:inline-flex w-fit rounded-sm px-8 py-4.5 border-[#0066B3]"
        >
          {t('buttonLabel')}
        </Button>
      </div>
      <div className="relative mt-12 grid gap-4 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.35fr_1fr]">
        {/* <button
          type="button"
          aria-label="Previous collection"
          className="absolute -left-10 top-1/2 hidden -translate-y-1/2 text-xl text-primary lg:block"
        >
          <ArrowLeftIcon aria-hidden="true" />
        </button> */}
        <Button
          type="button"
          aria-label="Previous collection"
          className="absolute -left-10 top-1/2 hidden text-xl text-primary lg:block hover:bg-transparent"
          variant="ghost"
        >
          <Image
            src={ArrowLeftPurpleIcon}
            alt="arrow-left"
            className="w-auto h-2.5"
          />
        </Button>
        {collectionItems.map((item) => (
          <article
            key={item.title}
            className="group relative min-h-80 overflow-hidden rounded-lg bg-muted sm:min-h-108"
          >
            <Image
              src={collectionImgs[item.id as keyof typeof collectionImgs]}
              alt={`${item.title} interior`}
              priority
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-x-8 bottom-7 flex items-center justify-between gap-4 rounded-sm bg-foreground/65 px-6 py-5 text-background backdrop-blur-sm">
              <h3 className="text-xl font-medium">{item.title}</h3>
              <span className="text-sm font-medium flex justify-between items-center">
                <span className="hidden sm:block">{t('itemButtonLabel')}</span>
                {locale === 'ar' ? (
                  <Image
                    src={ArrowLeftIcon}
                    alt="arrow-left"
                    className="w-auto h-2.5 sm:ms-3"
                  />
                ) : (
                  <Image
                    src={ArrowRightIcon}
                    alt="arrow-left"
                    className="w-auto h-2.5 sm:ms-3"
                  />
                )}
              </span>
            </div>
          </article>
        ))}
        {/* <button
          type="button"
          aria-label="Next collection"
          className="absolute -right-10 top-1/2 hidden -translate-y-1/2 text-xl text-primary lg:block"
        >
          <ArrowRight aria-hidden="true" />
        </button> */}
        <Button
          type="button"
          aria-label="Next collection"
          className="absolute -right-10 top-1/2 hidden text-xl text-primary lg:block hover:bg-transparent"
          variant="ghost"
        >
          <Image
            src={ArrowRightPurpleIcon}
            alt="arrow-right"
            className="w-auto h-2.5"
          />
        </Button>
      </div>
    </section>
  )
}
