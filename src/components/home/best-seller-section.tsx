'use client'

import type { LocaleType } from '@/i18n/types'

import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons'
import { FloorImg10, FloorImg8, FloorImg9 } from '@/assets/images'
import { Button } from '@/components/ui/button'
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
    tagLabel: string
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
    <section className="bg-[#023260] py-16 text-white lg:py-24">
      <div className="container-wrapper">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between xl:items-center">
          <h2 className="section-title">{t('title')}</h2>
          <div className="flex flex-col items-start gap-3 sm:flex-row">
            <Button className="rounded-sm border-2! border-black bg-black px-5 py-4.5 text-[0.95rem] font-semibold tracking-widest text-white uppercase hover:bg-black/80">
              <ListFilter
                data-icon="inline-center"
                className="me-1 h-5! w-5!"
              />
              {t('filterLabel')}
            </Button>
            <Button
              variant="outline"
              className="rounded-sm border-white/50 bg-transparent px-5 py-4.5 text-white hover:bg-white hover:text-[#073b68]"
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
                        <span className="bg-background text-foreground absolute top-3 right-3 rounded px-3 py-1 text-xs tracking-wide uppercase">
                          {product.tagLabel}
                        </span>
                      </div>
                      <div className="flex min-h-60 flex-col p-4">
                        <p className="text-xs tracking-wider">
                          {product.category}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold">
                          {product.title}
                        </h3>
                        <p className="mt-3 line-clamp-3 text-sm leading-5 font-light">
                          {product.description}
                        </p>
                        <div className="mt-auto flex gap-3 pt-7">
                          <Button
                            variant="outline"
                            className="min-w-0 flex-1 rounded-sm border-white bg-transparent py-4.5 text-white hover:bg-white hover:text-[#073b68]"
                          >
                            {t('getSampleBtnLabel')}
                          </Button>
                          <Button className="min-w-0 flex-1 rounded-sm bg-[#812990] py-4.5 font-medium text-white hover:bg-[#812990]/85">
                            {t('viewMoreBtnLabel')}
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
            className="absolute top-1/2 -left-10 hidden cursor-pointer text-xl hover:bg-transparent disabled:opacity-30 lg:inline-flex"
          >
            <Image
              src={ArrowLeftIcon}
              alt="arrow-left"
              className="h-2.5 w-auto"
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
            className="absolute top-1/2 -right-10 hidden cursor-pointer text-xl hover:bg-transparent disabled:opacity-30 lg:inline-flex"
          >
            <Image
              src={ArrowRightIcon}
              alt="arrow-right"
              className="h-2.5 w-auto"
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
            className="cursor-pointer hover:bg-transparent"
          >
            <Image
              src={ArrowRightIcon}
              alt="arrow-right"
              className="hidden h-2.5 w-auto rtl:block"
            />
            <Image
              src={ArrowLeftIcon}
              alt="arrow-left"
              className="hidden h-2.5 w-auto ltr:block"
            />
          </Button>
          <Button
            aria-label="Next products"
            variant="ghost"
            size="icon"
            disabled={slide === slides.length - 1}
            onClick={() =>
              setSlide((current) => Math.min(slides.length - 1, current + 1))
            }
            className="cursor-pointer hover:bg-transparent"
          >
            <Image
              src={ArrowLeftIcon}
              alt="arrow-left"
              className="hidden h-2.5 w-auto rtl:block"
            />
            <Image
              src={ArrowRightIcon}
              alt="arrow-right"
              className="hidden h-2.5 w-auto ltr:block"
            />
          </Button>
        </div>
      </div>
    </section>
  )
}
