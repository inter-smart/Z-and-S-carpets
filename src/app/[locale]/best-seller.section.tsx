'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons'
import { FloorImg10, FloorImg8, FloorImg9 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import { font } from '@/lib/utils'
import { cn } from 'cn'
import { ListFilter } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

const cardsPerSlide = 3

const productsImgs = [FloorImg8, FloorImg9, FloorImg10]

export default function BestSellers() {
  const locale = useLocale() as LocaleType

  const t = useTranslations('bestseller')
  const [slide, setSlide] = useState(0)

  const products = t.raw('products') as {
    category: string
    title: string
    description: string
    image: string
  }[]

  const slides = Array.from(
    { length: Math.ceil(products.length / cardsPerSlide) },
    (_, index) =>
      products.slice(
        index * cardsPerSlide,
        index * cardsPerSlide + cardsPerSlide,
      ),
  )

  return (
    <section className="bg-[#023260] px-6 py-16 sm:px-10 lg:px-[5.4vw] lg:py-24 text-white">
      <div className="mx-auto">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2
            className={cn(
              'text-balance text-4xl font-medium tracking-tight md:text-5xl',
              font(locale as LocaleType, {
                en: 'font-nobile',
                ar: 'font-cairo',
              }),
            )}
          >
            {t('title')}
          </h2>
          <div className="flex items-center gap-3">
            <Button className="border-2! border-black bg-black text-white hover:bg-black/80 px-10 py-4.5 rounded-md">
              <ListFilter data-icon="inline-center" />
              {t('filterLabel')}
            </Button>
            <Button
              variant="outline"
              className="border-white/50 bg-transparent text-white hover:bg-white hover:text-[#073b68] px-10 py-4.5 rounded-md"
            >
              {t('viewAllLabel')}
            </Button>
          </div>
        </div>

        <div className="relative px-0 md:px-0 lg:px-0">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{
                transform:
                  locale === 'ar'
                    ? `translateX(${slide * 100}%)`
                    : `translateX(-${slide * 100}%)`,
              }}
            >
              {slides.map((slideItems, slideIndex) => (
                <div
                  key={slideIndex}
                  className="grid min-w-full grid-cols-1 gap-7 md:grid-cols-3"
                >
                  {slideItems.map((product, productIndex) => (
                    <article
                      key={product.title}
                      className="overflow-hidden rounded-md border border-white/30 bg-[#073b68]"
                    >
                      <div className="relative aspect-[1.5] overflow-hidden">
                        <Image
                          src={productsImgs[productIndex]}
                          alt={product.title}
                          className="size-full object-cover"
                        />
                        <span className="absolute right-3 top-3 rounded bg-background px-3 py-1 text-xs font-medium text-foreground">
                          BEST SELLER
                        </span>
                      </div>
                      <div className="flex min-h-60 flex-col p-4">
                        <p className="text-xs tracking-wider">
                          {product.category}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold">
                          {product.title}
                        </h3>
                        <p className="mt-3 text-sm leading-5">
                          {product.description}
                        </p>
                        <div className="mt-auto flex gap-3 pt-7">
                          <Button
                            variant="outline"
                            className="rounded-sm py-4.5 min-w-0 flex-1 border-white bg-transparent text-white hover:bg-white hover:text-[#073b68]"
                          >
                            Get a sample
                          </Button>
                          <Button className="rounded-sm py-4.5 min-w-0 flex-1 bg-[#812990] text-white hover:bg-[#812990]/85">
                            View More
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <Button
            aria-label="Previous products"
            variant="ghost"
            size="icon"
            disabled={
              locale === 'ar' ? slide === slides.length - 1 : slide === 0
            }
            onClick={() =>
              locale === 'ar'
                ? setSlide((current) =>
                    Math.min(slides.length - 1, current + 1),
                  )
                : setSlide((current) => Math.max(0, current - 1))
            }
            className="absolute -left-10 top-1/2 hidden text-xl hover:bg-transparent disabled:opacity-30 lg:inline-flex cursor-pointer"
          >
            <Image
              src={ArrowLeftIcon}
              alt="arrow-left"
              className="w-auto h-2.5"
            />
          </Button>
          <Button
            aria-label="Next products"
            variant="ghost"
            size="icon"
            disabled={
              locale === 'ar' ? slide === 0 : slide === slides.length - 1
            }
            onClick={() =>
              locale === 'ar'
                ? setSlide((current) => Math.max(0, current - 1))
                : setSlide((current) =>
                    Math.min(slides.length - 1, current + 1),
                  )
            }
            className="absolute -right-10 top-1/2 hidden text-xl hover:bg-transparent disabled:opacity-30 lg:inline-flex cursor-pointer"
          >
            <Image
              src={ArrowRightIcon}
              alt="arrow-right"
              className="w-auto h-2.5"
            />
          </Button>
        </div>

        <div className="mt-6 flex justify-center gap-2 lg:hidden">
          <Button
            aria-label="Previous products"
            variant="ghost"
            size="icon"
            disabled={slide === 0}
            onClick={() => setSlide((current) => Math.max(0, current - 1))}
            className="hover:bg-transparent cursor-pointer"
          >
            {locale === 'ar' ? (
              <Image
                src={ArrowRightIcon}
                alt="arrow-left"
                className="w-auto h-2.5"
              />
            ) : (
              <Image
                src={ArrowLeftIcon}
                alt="arrow-left"
                className="w-auto h-2.5"
              />
            )}
            {/* <ArrowLeft /> */}
          </Button>
          <Button
            aria-label="Next products"
            variant="ghost"
            size="icon"
            disabled={slide === slides.length - 1}
            onClick={() =>
              setSlide((current) => Math.min(slides.length - 1, current + 1))
            }
            className="hover:bg-transparent cursor-pointer"
          >
            {locale === 'ar' ? (
              <Image
                src={ArrowLeftIcon}
                alt="arrow-left"
                className="w-auto h-2.5"
              />
            ) : (
              <Image
                src={ArrowRightIcon}
                alt="arrow-left"
                className="w-auto h-2.5"
              />
            )}
          </Button>
        </div>
      </div>
    </section>
  )
}
