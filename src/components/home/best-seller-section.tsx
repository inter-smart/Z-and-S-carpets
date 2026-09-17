'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons'
import { FloorImg10, FloorImg8, FloorImg9 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { ListFilter } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const productsImgs = [FloorImg8, FloorImg9, FloorImg10]

type Direction = 'next' | 'previous'

export default function BestSellers() {
  // const locale = useLocale() as LocaleType
  const t = useTranslations('bestseller')

  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(1)
  const [direction, setDirection] = useState<Direction>('next')
  const [isAnimating, setIsAnimating] = useState(false)

  const products = t.raw('products') as {
    category: string
    title: string
    description: string
    tagLabel: string
  }[]

  /*
   * 1 card  -> mobile
   * 2 cards -> sm + md
   * 3 cards -> lg+
   */
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        setVisibleCards(3)
      } else if (window.matchMedia('(min-width: 640px)').matches) {
        setVisibleCards(2)
      } else {
        setVisibleCards(1)
      }
    }

    updateVisibleCards()

    window.addEventListener('resize', updateVisibleCards)

    return () => {
      window.removeEventListener('resize', updateVisibleCards)
    }
  }, [])

  /*
   * Create pages based on the number of cards visible.
   *
   * Example with 7 products:
   *
   * Mobile:
   * [1] [2] [3] [4] [5] [6] [7]
   *
   * sm/md:
   * [1 2] [3 4] [5 6] [7]
   *
   * lg:
   * [1 2 3] [4 5 6] [7]
   */
  const slides = Array.from(
    { length: Math.ceil(products.length / visibleCards) },
    (_, index) =>
      products.slice(index * visibleCards, index * visibleCards + visibleCards),
  )

  const maxIndex = Math.max(slides.length - 1, 0)

  const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1

  const handleNext = () => {
    if (isAnimating || currentIndex >= maxIndex) return

    setDirection('next')
    setIsAnimating(true)
  }

  const handlePrevious = () => {
    if (isAnimating || currentIndex <= 0) return

    setDirection('previous')
    setIsAnimating(true)
  }

  const handleAnimationEnd = () => {
    setCurrentIndex((current) =>
      direction === 'next' ? current + 1 : current - 1,
    )

    setIsAnimating(false)
  }

  /*
   * When the breakpoint changes, the number of cards per slide changes.
   * Reset to the first slide so we don't end up with an invalid index.
   */
  // useEffect(() => {
  //   setCurrentIndex(0)
  //   setIsAnimating(false)
  // }, [visibleCards])

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

        <div className="relative">
          <div className="overflow-hidden">
            <div className="relative">
              {/* Current slide */}
              <div
                className={
                  isAnimating
                    ? direction === 'next'
                      ? 'animate-slide-out-left'
                      : 'animate-slide-out-right'
                    : ''
                }
                onAnimationEnd={handleAnimationEnd}
              >
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {slides[currentIndex]?.map((product, index) => {
                    const productIndex = currentIndex * visibleCards + index

                    return (
                      <article
                        key={product.title}
                        className="overflow-hidden rounded-md border border-white/30 bg-[#073b68]"
                      >
                        <div className="relative aspect-[1.5] overflow-hidden">
                          <Image
                            src={
                              productsImgs[productIndex % productsImgs.length]
                            }
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
                    )
                  })}
                </div>
              </div>

              {/* Incoming slide */}
              {isAnimating && slides[nextIndex] && (
                <div
                  className={`absolute inset-0 ${
                    direction === 'next'
                      ? 'animate-slide-in-right'
                      : 'animate-slide-in-left'
                  }`}
                >
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {slides[nextIndex].map((product, index) => {
                      const productIndex = nextIndex * visibleCards + index

                      return (
                        <article
                          key={product.title}
                          className="overflow-hidden rounded-md border border-white/30 bg-[#073b68]"
                        >
                          <div className="relative aspect-[1.5] overflow-hidden">
                            <Image
                              src={
                                productsImgs[productIndex % productsImgs.length]
                              }
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
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Desktop arrows */}
          <Button
            aria-label="Previous products"
            variant="ghost"
            size="icon"
            disabled={currentIndex === 0 || isAnimating}
            onClick={handlePrevious}
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
            disabled={currentIndex === maxIndex || isAnimating}
            onClick={handleNext}
            className="absolute top-1/2 -right-10 hidden cursor-pointer text-xl hover:bg-transparent disabled:opacity-30 lg:inline-flex"
          >
            <Image
              src={ArrowRightIcon}
              alt="arrow-right"
              className="h-2.5 w-auto"
            />
          </Button>
        </div>

        {/* Mobile / tablet arrows */}
        <div className="mt-6 flex justify-center gap-2 lg:hidden">
          <Button
            aria-label="Previous products"
            variant="ghost"
            size="icon"
            disabled={currentIndex === 0 || isAnimating}
            onClick={handlePrevious}
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
            disabled={currentIndex === maxIndex || isAnimating}
            onClick={handleNext}
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
