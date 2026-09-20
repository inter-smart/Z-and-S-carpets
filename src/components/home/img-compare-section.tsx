'use client'

// import { ArrowLeftPurpleIcon, ArrowRightPurpleIcon } from '@/assets/icons'
import { FloorCImg1_1, FloorCImg1_2 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { type StaticImageData } from 'next/image'
import { useState } from 'react'
import ImgCompareSlider from '../common/img-compare-slider'
import { OurIcon } from '../ui/icon'

export default function ImgCompareSection() {
  const imgGroups = [
    [FloorCImg1_2, FloorCImg1_1],
    [FloorCImg1_1, FloorCImg1_2],
  ] as StaticImageData[][]

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

  return (
    <div className="container-wrapper relative mb-16 lg:mb-24">
      <div className="relative">
        {/* Slider */}
        <div className="overflow-hidden">
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

        {/* Previous */}
        <Button
          type="button"
          aria-label="Previous collection"
          onClick={handlePrevious}
          disabled={currentIndex === 0 || isAnimating}
          className="text-our-purple hover:text-our-purple absolute top-1/2 -left-8 hidden cursor-pointer text-xl hover:bg-transparent disabled:opacity-30 sm:block md:-left-10"
          variant="ghost"
        >
          <OurIcon name="arrow-left" />
        </Button>
        {/* Next */}
        <Button
          type="button"
          aria-label="Next collection"
          onClick={handleNext}
          disabled={currentIndex === imgGroups.length - 1 || isAnimating}
          className="text-our-purple hover:text-our-purple absolute top-1/2 -right-8 hidden cursor-pointer text-xl hover:bg-transparent disabled:opacity-30 sm:block md:-right-10"
          variant="ghost"
        >
          <OurIcon name="arrow-right" />
        </Button>
      </div>

      <div className="mt-2 flex justify-center gap-2 sm:hidden">
        <Button
          aria-label="Previous products"
          variant="ghost"
          size="icon"
          onClick={handlePrevious}
          disabled={currentIndex === 0 || isAnimating}
          className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent"
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
          className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent"
        >
          <OurIcon name="arrow-left" className="hidden rtl:block" />
          <OurIcon name="arrow-right" className="hidden ltr:block" />
        </Button>
      </div>
    </div>
  )
}
