'use client'

import { MoveLeftIcon, MoveRightIcon } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface CategoryType {
  id: string
  label: string
  video: string
  cards: {
    itemValue: string
    itemText: string
    image: string
  }[]
}

export default function BannerSection() {
  const locale = useLocale() as LocaleType
  const t = useTranslations('BannerSection')
  const category = t.raw('category') as CategoryType[]

  const [currentCategory, setCurrentCategory] = useState(category[1])

  const cards = currentCategory.cards
  const count = cards.length

  // Create clones before and after the real cards
  const loopedCards = count > 1 ? [...cards, ...cards, ...cards] : cards

  // Start from the first card of the middle copy
  const [slide, setSlide] = useState(count)

  // Used to disable animation while silently repositioning
  const [transitionEnabled, setTransitionEnabled] = useState(true)

  // Auto slide
  useEffect(() => {
    if (count <= 1) return

    const interval = setInterval(() => {
      setSlide((current) => current + 1)
    }, 5000)

    return () => clearInterval(interval)
  }, [currentCategory.id, count])

  // Handle category change
  const handleCategoryChange = (item: CategoryType) => {
    setTransitionEnabled(false)
    setCurrentCategory(item)
    setSlide(item.cards.length)

    // Enable transition again after the position has been updated
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true)
      })
    })
  }

  // Handle infinite-loop repositioning
  const handleTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (event.propertyName !== 'transform' || count <= 1) return

    // Moved into the third copy
    if (slide >= count * 2) {
      setTransitionEnabled(false)
      setSlide(count)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true)
        })
      })
    }

    // Moved into the first copy
    if (slide < count) {
      setTransitionEnabled(false)
      setSlide(count * 2 - 1)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true)
        })
      })
    }
  }

  return (
    <section className="relative">
      {/* video */}
      <video
        key={currentCategory.id}
        className="h-200 w-full object-cover"
        playsInline
        autoPlay
        muted
        loop
      >
        <source src={currentCategory.video} type="video/mp4" />
      </video>

      {/* top layer */}
      <div className="absolute top-0 flex h-200 w-full flex-col justify-end bg-linear-to-r from-black/80 to-black/0 text-white">
        {/* category */}
        <div className="absolute -ms-5 flex h-full w-20 flex-col justify-end pb-30 sm:-ms-1 sm:pb-35">
          <div className="flex flex-row items-center ltr:-rotate-90 rtl:rotate-90">
            {category.map((item, i) => (
              <div key={item.id} className="flex items-center">
                <p
                  className={cn(
                    'cursor-default text-[1rem] font-light whitespace-nowrap underline decoration-0 underline-offset-4',
                    currentCategory.id === item.id && 'text-[#037EDA]',
                  )}
                  onClick={() => handleCategoryChange(item)}
                >
                  {item.label}
                </p>

                {i < category.length - 1 && (
                  <div className="mx-[1.6rem] h-4.5 w-[0.1px] bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* heading & slider */}
        <div className="container-wrapper">
          <div className="flex h-full w-full flex-col justify-end gap-6 ps-8 pb-23 sm:ps-10 sm:pe-5 sm:pb-28 md:flex-row md:justify-between">
            {/* heading */}
            <div className="flex w-full flex-col justify-end gap-1 md:w-1/2 md:gap-6 lg:w-3/5">
              <h1 className="ltr:font-nobile rtl:font-cairo text-4xl leading-12 font-medium sm:text-[2.75rem] sm:leading-14">
                {t('mainTag')}
              </h1>

              <h2 className="text-xl">{t('description')}</h2>

              <Button
                variant="outline"
                className="ltr:font-manrope rtl:font-cairo mt-6 w-fit rounded-sm px-8 py-4.5 hover:bg-white/10 hover:text-white"
              >
                {t('btnLabel')}
              </Button>
            </div>

            {/* slider */}
            <div className="flex w-full flex-col justify-end overflow-hidden min-[400px]:w-2/3 md:w-1/2 lg:w-2/5 xl:w-100">
              <div
                onTransitionEnd={handleTransitionEnd}
                className={cn(
                  'flex',
                  transitionEnabled &&
                    'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  'motion-reduce:transition-none',
                )}
                style={{
                  transform:
                    count <= 1
                      ? 'translateX(0)'
                      : locale === 'ar'
                        ? `translateX(${slide * 100}%)`
                        : `translateX(-${slide * 100}%)`,
                }}
              >
                {loopedCards.map((card, index) => (
                  <div
                    key={`${currentCategory.id}-${index}`}
                    className="flex w-full min-w-full shrink-0 items-end justify-start px-1 md:justify-end"
                  >
                    {/* WHOLE CARD */}
                    <div className="flex h-22 w-full flex-row justify-between gap-2 rounded-md bg-white p-2 text-black sm:h-24 sm:gap-4 sm:p-3 md:h-28 lg:h-32 lg:w-100 lg:gap-4 xl:h-36 xl:gap-8">
                      {/* image */}
                      <div className="relative hidden aspect-square h-full items-center justify-center overflow-hidden rounded-md min-[300px]:flex">
                        <Image
                          src={card.image}
                          alt="floor-image"
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* content - arrows */}
                      <div className="relative flex flex-1 flex-col justify-center">
                        {/* content */}
                        <div className="flex w-full flex-col md:gap-2">
                          <p className="text-xl font-bold sm:text-2xl md:text-4xl">
                            {card.itemValue}
                          </p>
                          <p className="text-xs font-medium sm:text-sm">
                            {card.itemText}
                          </p>
                        </div>
                        {/* arrows */}
                        <div className="absolute top-0 right-0 flex flex-row justify-end">
                          {/* Previous */}
                          <button
                            type="button"
                            aria-label="Previous card"
                            onClick={() => setSlide((current) => current - 1)}
                            disabled={count <= 1}
                            className="cursor-pointer border border-gray-200 p-1.5 disabled:cursor-default ltr:rounded-l-sm rtl:rounded-r-sm"
                          >
                            <Image
                              src={MoveRightIcon}
                              alt=""
                              className="hidden h-1 w-auto sm:h-1.75 rtl:block"
                            />

                            <Image
                              src={MoveLeftIcon}
                              alt=""
                              className="hidden h-1 w-auto sm:h-1.75 ltr:block"
                            />
                          </button>

                          {/* Next */}
                          <button
                            type="button"
                            aria-label="Next card"
                            onClick={() => setSlide((current) => current + 1)}
                            disabled={count <= 1}
                            className="cursor-pointer border-y border-gray-200 p-1.5 disabled:cursor-default ltr:rounded-r-sm ltr:border-r rtl:rounded-l-sm rtl:border-l"
                          >
                            <Image
                              src={MoveLeftIcon}
                              alt=""
                              className="hidden h-1 w-auto sm:h-1.75 rtl:block"
                            />

                            <Image
                              src={MoveRightIcon}
                              alt=""
                              className="hidden h-1 w-auto sm:h-1.75 ltr:block"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
