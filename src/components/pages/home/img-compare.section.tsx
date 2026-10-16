'use client'

import ImgCompareSlider, {
  type CompareImage,
} from '@/components/common/img-compare.slider'
import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import type { HomeData } from '@/types/home'
import { useLocale } from 'next-intl'
import { useState } from 'react'

interface ImgCompareSectionProps {
  sideImages: HomeData['side_images_section']
}

export default function ImgCompareSection({
  sideImages,
}: ImgCompareSectionProps) {
  const locale = useLocale() as LocaleType
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  // each group is [after, before] (the slider's first / second image)
  const imgGroups: CompareImage[][] = sideImages.list.flatMap((item) =>
    item.after.path && item.before.path
      ? [
          [
            {
              src: item.after.path,
              alt: pick(item.after.alt, item.after.alt_ar) || 'Floor after',
            },
            {
              src: item.before.path,
              alt: pick(item.before.alt, item.before.alt_ar) || 'Floor before',
            },
          ],
        ]
      : [],
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'next' | 'previous'>('next')
  const [isAnimating, setIsAnimating] = useState(false)

  const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1

  const handleNext = () => {
    if (isAnimating || currentIndex >= imgGroups.length - 1) return

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

  // nothing usable from the API (e.g. images missing)
  if (imgGroups.length === 0) return null

  // the prev/next arrows only make sense with more than one pair
  const hasMultipleGroups = imgGroups.length > 1

  return (
    <div className="container-wrapper relative mb-16 lg:mb-24">
      <div className="relative">
        {/* Slider */}
        <div className="overflow-hidden rounded-md">
          <div className="relative">
            {/* Current image stack */}
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
              <ImgCompareSlider
                images={imgGroups[currentIndex]}
                className="h-40 sm:h-80 xl:h-120"
              />
            </div>

            {/* Incoming image stack */}
            {isAnimating && (
              <div
                className={`absolute inset-0 ${
                  direction === 'next'
                    ? 'animate-slide-in-right'
                    : 'animate-slide-in-left'
                }`}
              >
                <ImgCompareSlider
                  images={imgGroups[nextIndex]}
                  className="h-40 sm:h-80 xl:h-120"
                />
              </div>
            )}
          </div>
        </div>

        {hasMultipleGroups && (
          <>
            {/* Previous */}
            <div className="absolute top-1/2 -left-8 hidden -translate-y-1/2 sm:block md:-left-10">
              <Button
                type="button"
                aria-label="Previous collection"
                onClick={handlePrevious}
                disabled={currentIndex === 0 || isAnimating}
                className="text-our-purple hover:text-our-purple cursor-pointer text-xl hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0! disabled:opacity-30"
                variant="ghost"
              >
                <OurIcon name="arrow-left" />
              </Button>
            </div>
            {/* Next */}
            <div className="absolute top-1/2 -right-8 hidden -translate-y-1/2 sm:block md:-right-10">
              <Button
                type="button"
                aria-label="Next collection"
                onClick={handleNext}
                disabled={currentIndex === imgGroups.length - 1 || isAnimating}
                className="text-our-purple hover:text-our-purple cursor-pointer text-xl hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0! disabled:opacity-30"
                variant="ghost"
              >
                <OurIcon name="arrow-right" />
              </Button>
            </div>
          </>
        )}
      </div>

      {hasMultipleGroups && (
        <div className="mt-2 flex justify-center gap-2 sm:hidden">
          <Button
            aria-label="Previous products"
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            disabled={currentIndex === 0 || isAnimating}
            className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
          >
            <OurIcon name="arrow-right" className="hidden rtl:block" />
            <OurIcon name="arrow-left" className="hidden ltr:block" />
          </Button>
          <Button
            aria-label="Next products"
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={currentIndex === imgGroups.length - 1 || isAnimating}
            className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
          >
            <OurIcon name="arrow-left" className="hidden rtl:block" />
            <OurIcon name="arrow-right" className="hidden ltr:block" />
          </Button>
        </div>
      )}
    </div>
  )
}
