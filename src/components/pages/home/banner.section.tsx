'use client'

import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import type { HomeData } from '@/types/home'
import { cn } from 'cn'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Banner title/description arrive as sanitized inline HTML from the API
const stripTags = (html: string) => html.replace(/<[^>]*>/g, ' ').trim()

interface CategoryType {
  id: string
  label: string
  mediaType: string
  mediaPath: string
  mediaPoster?: string
  title: string
  description: string
}

interface CardType {
  itemValue: string
  itemText: string
  image: string | null
  alt: string
}

interface BannerSectionProps {
  banners: HomeData['banner_section']['list']
  milestones?: HomeData['milestones_section']
}

export default function BannerSection({
  banners,
  milestones,
}: BannerSectionProps) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('HomePage.BannerSection')
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  const category: CategoryType[] = banners.map((banner) => ({
    id: String(banner.id),
    label: pick(banner.industry.title, banner.industry.title_ar),
    mediaType: banner.media.type,
    mediaPath: banner.media.path ?? '',
    mediaPoster: banner.thumbnail.path ?? undefined,
    title: pick(banner.title, banner.title_ar),
    description: pick(banner.description, banner.description_ar),
  }))

  // Same milestone cards under every tab
  const cards: CardType[] = milestones?.is_visible
    ? milestones.list.map((item) => ({
        itemValue: pick(item.value, item.value_ar),
        itemText: pick(item.label, item.label_ar),
        image: item.media.path,
        alt: pick(item.media.alt, item.media.alt_ar),
      }))
    : []

  const [currentCategory, setCurrentCategory] = useState(category[0])

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
  }, [count])

  // Handle category change — the cards are shared by every tab, so only the
  // banner content swaps and the slider keeps its position and keeps running
  const handleCategoryChange = (item: CategoryType) => {
    setCurrentCategory(item)
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
      {currentCategory.mediaType === 'video' ? (
        <video
          key={currentCategory.id}
          className="h-166 w-full object-cover"
          playsInline
          autoPlay
          muted
          loop
          poster={currentCategory.mediaPoster}
        >
          <source src={currentCategory.mediaPath} type="video/mp4" />
        </video>
      ) : (
        <div className="relative h-166 w-full">
          <Image
            key={currentCategory.id}
            src={currentCategory.mediaPath}
            alt={stripTags(currentCategory.title)}
            fill
            priority
            className="object-cover"
          />
        </div>
      )}

      {/* top layer */}
      <div className="absolute top-0 flex h-166 w-full flex-col justify-end from-black/80 to-black/0 text-white ltr:bg-linear-to-r rtl:bg-linear-to-l">
        {/* category */}
        <div className="absolute h-full w-10 sm:w-20">
          {/* tabs stay centred on the hero's vertical middle and grow outwards (read bottom to top) */}
          <div className="absolute top-1/2 left-1/2 flex w-max -translate-x-1/2 -translate-y-1/2 flex-row items-center ltr:-rotate-90 rtl:rotate-90">
            {category.map((item, i) => (
              <div key={item.id} className="flex items-center">
                <p
                  className={cn(
                    'cursor-default text-lg whitespace-nowrap underline underline-offset-4',
                    currentCategory.id === item.id && 'text-our-blue',
                  )}
                  onClick={() => handleCategoryChange(item)}
                >
                  {item.label}
                </p>

                {i < category.length - 1 && (
                  <div className="mx-[1.6rem] h-4.5 w-[0.5px] bg-white/20" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* heading & slider */}
        <div className="container-wrapper">
          <div className="flex h-full w-full flex-col justify-end gap-6 ps-7.5 pb-23 sm:ps-5 sm:pe-5 sm:pb-28 md:flex-row md:justify-between">
            {/* heading */}
            <div className="flex w-full flex-col justify-end gap-1 md:w-1/2 md:gap-6 lg:w-3/5">
              {/* <h1 className="ltr:font-nobile rtl:font-cairo text-4xl leading-12 font-medium sm:text-[2.75rem] sm:leading-14"> */}
              <h1
                className="our-heading"
                dangerouslySetInnerHTML={{ __html: currentCategory.title }}
              />

              <h2
                className="text-2xl font-medium"
                dangerouslySetInnerHTML={{
                  __html: currentCategory.description,
                }}
              />

              <Button
                variant="outline"
                className="ltr:font-manrope rtl:font-cairo our-btn mt-6 w-fit px-5! hover:bg-white/10 hover:text-white"
              >
                {t('btnLabel')}
              </Button>
            </div>

            {/* slider */}
            {count > 0 && (
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
                      key={index}
                      className="flex w-full min-w-full shrink-0 items-end justify-start px-1 md:justify-end"
                    >
                      {/* WHOLE CARD */}
                      <div className="flex h-22 w-full flex-row justify-between gap-2 rounded-md bg-white p-2 text-black sm:h-24 sm:gap-4 sm:p-3 md:h-26 lg:h-28 lg:w-100 lg:gap-4 xl:h-32 xl:gap-8">
                        {/* image */}
                        <div className="relative hidden aspect-square h-full items-center justify-center overflow-hidden rounded-md min-[300px]:flex">
                          {card.image && (
                            <Image
                              src={card.image}
                              alt={
                                card.alt ||
                                `${currentCategory.label} ${card.itemText}`
                              }
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>

                        {/* content - arrows */}
                        <div className="relative flex flex-1 flex-col justify-center">
                          {/* content */}
                          <div className="flex w-full flex-col md:gap-2">
                            {/* <p className="text-xl font-bold sm:text-2xl md:text-4xl"> */}
                            <p className="text-6xl font-bold md:text-9xl">
                              {card.itemValue}
                            </p>
                            <p className="text-base font-medium sm:text-sm">
                              {card.itemText}
                            </p>
                          </div>
                          {/* arrows */}
                          <div className="absolute top-0 flex flex-row justify-end ltr:right-0 rtl:left-0">
                            {/* Previous */}
                            <button
                              type="button"
                              aria-label="Previous card"
                              onClick={() => setSlide((current) => current - 1)}
                              disabled={count <= 1}
                              className="cursor-pointer border border-gray-200 p-0.5 disabled:cursor-default sm:p-1 ltr:rounded-l-sm rtl:rounded-r-sm"
                            >
                              <ArrowLeftIcon className="hidden size-2.75 stroke-1 sm:size-3 ltr:block" />
                              <ArrowRightIcon className="hidden size-2.75 stroke-1 sm:size-3 rtl:block" />
                            </button>

                            {/* Next */}
                            <button
                              type="button"
                              aria-label="Next card"
                              onClick={() => setSlide((current) => current + 1)}
                              disabled={count <= 1}
                              className="cursor-pointer border-y border-gray-200 p-0.5 disabled:cursor-default sm:p-1 ltr:rounded-r-sm ltr:border-r rtl:rounded-l-sm rtl:border-l"
                            >
                              <ArrowLeftIcon className="hidden size-2.75 stroke-1 sm:size-3 rtl:block" />
                              <ArrowRightIcon className="hidden size-2.75 stroke-1 sm:size-3 ltr:block" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
