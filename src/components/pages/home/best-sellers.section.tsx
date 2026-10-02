'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { ListFilterIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

export default function BestSellersSection() {
  const locale = useLocale() as LocaleType

  const t = useTranslations('HomePage.BestSellerSection')

  const products = t.raw('products') as {
    category: string
    title: string
    description: string
    tagLabel: string
    image: string
  }[]

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
    <section className="bg-[#023260] py-16 text-white lg:py-24">
      <div className="container-wrapper">
        {/* header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between xl:items-center">
          <h2 className="our-heading">{t('title')}</h2>

          <div className="flex flex-col items-start gap-3 min-[350px]:flex-row">
            <Button className="our-btn bg-black px-3! text-lg! font-semibold tracking-widest text-white uppercase">
              <ListFilterIcon
                data-icon="inline-center"
                className="me-1 h-5! w-5!"
              />
              {t('filterLabel')}
            </Button>

            <Button
              variant="outline"
              className="our-btn border-white/60 px-4! hover:bg-white/10 hover:text-white"
              nativeButton={false}
              render={<Link href={`/${locale}/products`} />}
            >
              {t('viewAllLabel')}
            </Button>
          </div>
        </div>
        <div className="relative mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ms-7 flex">
              {products.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="min-w-0 shrink-0 grow-0 basis-full ps-7 sm:basis-1/2 lg:basis-1/3"
                  >
                    <article className="group h-full overflow-hidden rounded-md border border-white/25 bg-[#073b68] text-white hover:border-white">
                      <div className="relative aspect-[1.8] overflow-hidden">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        <span className="bg-background text-foreground absolute top-3 right-3 rounded-xs px-1.5 py-0.5 text-xs tracking-wide uppercase">
                          {product.tagLabel}
                        </span>
                      </div>

                      <div className="flex min-h-50 flex-col p-4">
                        <p className="text-sm tracking-wider">
                          {product.category}
                        </p>

                        <h3 className="mt-2 text-2xl font-semibold">
                          {product.title}
                        </h3>

                        <p className="mt-3 line-clamp-3 text-base leading-5 font-light">
                          {product.description}
                        </p>

                        <div className="mt-auto flex gap-3 pt-7">
                          <Button
                            variant="outline"
                            className="our-btn min-w-0 flex-1 cursor-pointer font-semibold hover:bg-white/10 hover:text-white"
                          >
                            {t('getSampleBtnLabel')}
                          </Button>

                          <Button className="bg-our-purple our-btn min-w-0 flex-1 cursor-pointer py-4.5 font-semibold text-white">
                            {t('viewMoreBtnLabel')}
                          </Button>
                        </div>
                      </div>
                    </article>
                  </div>
                )
              })}
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
              className="cursor-pointer text-white hover:bg-transparent hover:text-white focus-visible:border-transparent! focus-visible:ring-0!"
            >
              {/* LTR */}
              <OurIcon name="arrow-left" className="ltr:block rtl:hidden" />
              {/* RTL */}
              <OurIcon name="arrow-right" className="ltr:hidden rtl:block" />
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
              className="cursor-pointer text-white hover:bg-transparent hover:text-white focus-visible:border-transparent! focus-visible:ring-0!"
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
            className="cursor-pointer text-white hover:bg-transparent hover:text-white focus-visible:border-transparent! focus-visible:ring-0!"
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
            className="cursor-pointer text-white hover:bg-transparent hover:text-white focus-visible:border-transparent! focus-visible:ring-0!"
          >
            {/* LTR */}
            <OurIcon name="arrow-right" className="hidden ltr:block" />
            {/* RTL */}
            <OurIcon name="arrow-left" className="hidden rtl:block" />
          </Button>
        </div>
      </div>
    </section>
  )
}
