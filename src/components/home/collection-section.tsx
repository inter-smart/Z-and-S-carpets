'use client'

import {
  ArrowLeftIcon,
  ArrowLeftPurpleIcon,
  ArrowRightIcon,
  ArrowRightPurpleIcon,
} from '@/assets/icons'
import type { LocaleType } from '@/i18n/types'
import { cn } from 'cn'
import useEmblaCarousel from 'embla-carousel-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '../ui/button'

export default function CollectionSection() {
  const locale = useLocale() as LocaleType

  const t = useTranslations('collection')
  const collectionItems = t.raw('items') as {
    title: string
    image: string
  }[]

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    direction: locale === 'ar' ? 'rtl' : 'ltr',
  })

  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const updateButtons = () => {
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }

    updateButtons()

    emblaApi.on('select', updateButtons)
    emblaApi.on('reInit', updateButtons)

    return () => {
      emblaApi.off('select', updateButtons)
      emblaApi.off('reInit', updateButtons)
    }
  }, [emblaApi])

  return (
    <section
      className="container-wrapper py-16 lg:py-24"
      aria-labelledby="collection-title"
    >
      {/* header */}
      <div className="sm:items-centers flex flex-col justify-between gap-3 sm:flex-row sm:gap-6">
        <h2 id="collection-title" className="section-title">
          {t('title')}
        </h2>
        <Button
          variant="outline"
          className="inline-flex w-fit rounded-sm border-[#0066B3] px-5 py-4.5 text-xs font-semibold"
        >
          {t('buttonLabel')}
        </Button>
      </div>

      <div className="relative mt-12">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ms-3 flex">
            {collectionItems.map((item, i) => (
              <div
                key={i}
                className={cn(
                  'min-w-0 shrink-0 grow-0 basis-full ps-3',
                  i % 2 === 0 ? 'lg:basis-[60%]' : 'lg:basis-[40%]',
                )}
              >
                <article className="group bg-muted relative flex min-h-80 min-w-0 shrink-0 grow-0 items-center justify-center overflow-hidden rounded-lg ps-3 sm:min-h-108">
                  <Image
                    src={item.image}
                    alt={`${item.title} interior`}
                    priority
                    fill
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="text-background absolute inset-x-8 bottom-7 flex items-center justify-between gap-4 rounded-sm bg-[#1F1A1A]/30 px-6 py-6 backdrop-blur-sm lg:max-xl:flex-col lg:max-xl:items-start lg:max-xl:gap-0">
                    <h3 className="ltr:font-nobile rtl:font-cairo sm:text:xl text-lg font-medium">
                      {item.title}
                    </h3>
                    <span className="flex items-center justify-between text-sm font-medium">
                      <span className="hidden sm:block">
                        {t('itemButtonLabel')}
                      </span>
                      <Image
                        src={ArrowLeftIcon}
                        alt="arrow-left"
                        className="hidden h-2.5 w-auto sm:ms-3 rtl:block"
                      />
                      <Image
                        src={ArrowRightIcon}
                        alt="arrow-right"
                        className="hidden h-2.5 w-auto sm:ms-3 ltr:block"
                      />
                    </span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* btns */}
        {/* Desktop Previous */}
        <div className="absolute top-1/2 -left-10 hidden -translate-y-1/2 lg:block rtl:-right-10 rtl:left-auto">
          <Button
            type="button"
            variant="ghost"
            aria-label="Previous collection"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="text-primary cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
          >
            {/* LTR */}
            <Image
              src={ArrowLeftPurpleIcon}
              alt=""
              className="h-2.5 w-auto ltr:block rtl:hidden"
            />

            {/* RTL */}
            <Image
              src={ArrowRightPurpleIcon}
              alt=""
              className="hidden h-2.5 w-auto rtl:block"
            />
          </Button>
        </div>

        {/* Desktop Next */}
        <div className="absolute top-1/2 -right-10 hidden -translate-y-1/2 lg:block rtl:right-auto rtl:-left-10">
          <Button
            type="button"
            variant="ghost"
            aria-label="Next collection"
            onClick={scrollNext}
            disabled={!canNext}
            className="text-primary cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
          >
            {/* LTR */}
            <Image
              src={ArrowRightPurpleIcon}
              alt=""
              className="h-2.5 w-auto ltr:block rtl:hidden"
            />
            {/* RTL */}
            <Image
              src={ArrowLeftPurpleIcon}
              alt=""
              className="hidden h-2.5 w-auto rtl:block"
            />
          </Button>
        </div>
      </div>

      {/* btn mobile */}
      <div className="mt-2 flex justify-center gap-2 lg:hidden">
        <Button
          aria-label="Previous products"
          variant="ghost"
          size="icon"
          onClick={scrollPrev}
          disabled={!canPrev}
          className="cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
        >
          <Image
            src={ArrowRightPurpleIcon}
            alt="arrow-right"
            className="hidden h-2.5 w-auto rtl:block"
          />
          <Image
            src={ArrowLeftPurpleIcon}
            alt="arrow-left"
            className="hidden h-2.5 w-auto ltr:block"
          />
        </Button>
        <Button
          aria-label="Next products"
          variant="ghost"
          size="icon"
          onClick={scrollNext}
          disabled={!canNext}
          className="cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
        >
          <Image
            src={ArrowLeftPurpleIcon}
            alt="arrow-left"
            className="hidden h-2.5 w-auto rtl:block"
          />
          <Image
            src={ArrowRightPurpleIcon}
            alt="arrow-right"
            className="hidden h-2.5 w-auto ltr:block"
          />
        </Button>
      </div>
    </section>
  )
}
