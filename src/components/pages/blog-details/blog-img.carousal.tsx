'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import { pickLocalized } from '@/lib/blogs'
import type { HomeMedia } from '@/types/home'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useLocale } from 'next-intl'
import SafeImage from '@/components/common/safe-image'
import { useCallback, useEffect, useState } from 'react'

export default function BlogImgCarousal({
  images,
  title,
}: {
  images: HomeMedia[]
  title: string
}) {
  const locale = useLocale() as LocaleType

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

  // #Prev/Next
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
    <div>
      {/* header */}
      <div className="relative mt-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="-ms-4 flex">
            {images.map((image, index) => (
              <div
                key={index}
                className="min-w-0 shrink-0 grow-0 basis-full ps-4 md:basis-1/2"
              >
                <div className="relative h-70 overflow-hidden rounded-sm md:h-50 lg:h-70 xl:h-80 2xl:h-90">
                  <SafeImage
                    src={image.path}
                    alt={
                      pickLocalized(locale, image.alt, image.alt_ar) ||
                      `${title} ${index + 1}`
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* btns */}
        {/* Desktop Previous */}
        <div className="absolute top-1/2 -left-8 hidden -translate-y-1/2 lg:block rtl:-right-8 rtl:left-auto">
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

        {/* Desktop Next */}
        <div className="absolute top-1/2 -right-8 hidden -translate-y-1/2 lg:block rtl:right-auto rtl:-left-8">
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
      </div>

      {/* btn mobile */}
      <div className="mt-2 flex justify-center gap-2 lg:hidden">
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
    </div>
  )
}
