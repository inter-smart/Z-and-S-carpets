'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import type { HomeData } from '@/types/home'
import { cn } from 'cn'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

// The prev/next buttons only show when there are more items than this
const BUTTONS_MIN_ITEMS = 2

interface CollectionSectionProps {
  discover: HomeData['discover_section']
}

export default function CollectionSection({
  discover,
}: CollectionSectionProps) {
  const locale = useLocale() as LocaleType

  const t = useTranslations('HomePage.CollectionSection')
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  // the arrows only make sense with more than 2 items (two cards fit on screen at once)
  const showButtons = (discover?.list.length ?? 0) > BUTTONS_MIN_ITEMS

  const collectionItems = discover?.list.map((item) => ({
    id: item.id,
    title: pick(item.title, item.title_ar),
    image: item.media.path,
    alt: pick(item.media.alt, item.media.alt_ar),
    link: item.link,
  }))

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      direction: locale === 'ar' ? 'rtl' : 'ltr',
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  )

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
        <h2 id="collection-title" className="our-heading">
          {pick(discover.title, discover.title_ar)}
        </h2>
        <Button
          variant="outline"
          className="border-our-blue our-btn inline-flex w-fit px-4!"
          nativeButton={false}
          render={<Link href={`/${locale}/products`} />}
        >
          {t('buttonLabel')}
        </Button>
      </div>

      <div className="relative mt-12">
        <div className="overflow-hidden rounded-md" ref={emblaRef}>
          <div className="-ms-3 flex">
            {collectionItems.map((item, i) => (
              <div
                key={item.id}
                className={cn(
                  'min-w-0 shrink-0 grow-0 basis-full ps-3',
                  i % 2 === 0 ? 'lg:basis-[60%]' : 'lg:basis-[40%]',
                )}
              >
                <article className="group bg-muted relative flex min-h-80 min-w-0 shrink-0 grow-0 items-center justify-center overflow-hidden rounded-md ps-3 sm:min-h-108">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.alt || `${item.title} interior`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority={i < 2}
                      className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="text-background absolute inset-x-8 bottom-7 flex items-center justify-between gap-4 rounded-sm border border-white/30 bg-[#1F1A1A]/30 px-6 py-6 backdrop-blur-sm lg:max-xl:flex-col lg:max-xl:items-start lg:max-xl:gap-0">
                    <h3 className="ltr:font-nobile rtl:font-cairo sm:text:xl text-2xl font-medium">
                      {item.title}
                    </h3>
                    <Button
                      variant={'ghost'}
                      className={
                        'flex items-center justify-between gap-2 p-0 text-base! font-medium hover:bg-transparent hover:text-white'
                      }
                      nativeButton={false}
                      render={<Link href={`/${locale}/${item.link}`} />}
                    >
                      <span className="hidden sm:block">
                        {t('itemButtonLabel')}
                      </span>
                      {/* LTR */}
                      <OurIcon
                        name="arrow-right"
                        className="hidden ltr:block"
                      />
                      {/* RTL */}
                      <OurIcon name="arrow-left" className="hidden rtl:block" />
                    </Button>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {showButtons && (
          <>
            {/*Button Desktop Previous */}
            <div className="absolute top-1/2 -left-10 hidden -translate-y-1/2 lg:block rtl:-right-10 rtl:left-auto">
              <Button
                type="button"
                variant="ghost"
                aria-label="Previous collection"
                onClick={scrollPrev}
                disabled={!canPrev}
                className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
              >
                {/* LTR */}
                <OurIcon name="arrow-left" className="ltr:block rtl:hidden" />
                {/* RTL */}
                <OurIcon name="arrow-right" className="ltr:hidden rtl:block" />
              </Button>
            </div>

            {/* Button Desktop Next */}
            <div className="absolute top-1/2 -right-10 hidden -translate-y-1/2 lg:block rtl:right-auto rtl:-left-10">
              <Button
                type="button"
                variant="ghost"
                aria-label="Next collection"
                onClick={scrollNext}
                disabled={!canNext}
                className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
              >
                {/* LTR */}
                <OurIcon name="arrow-right" className="ltr:block rtl:hidden" />
                {/* RTL */}
                <OurIcon name="arrow-left" className="ltr:hidden rtl:block" />
              </Button>
            </div>
          </>
        )}
      </div>

      {showButtons && (
        <div className="mt-2 flex justify-center gap-2 lg:hidden">
          {/* Button Mobile Previous */}
          <Button
            aria-label="Previous products"
            variant="ghost"
            size="icon"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
          >
            {/* LTR */}
            <OurIcon name="arrow-left" className="hidden ltr:block" />
            {/* RTL */}
            <OurIcon name="arrow-right" className="hidden rtl:block" />
          </Button>
          {/* Button Mobile Next */}
          <Button
            aria-label="Next products"
            variant="ghost"
            size="icon"
            onClick={scrollNext}
            disabled={!canNext}
            className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
          >
            {/* LTR */}
            <OurIcon name="arrow-right" className="hidden ltr:block" />
            {/* RTL */}
            <OurIcon name="arrow-left" className="hidden rtl:block" />
          </Button>
        </div>
      )}
    </section>
  )
}
