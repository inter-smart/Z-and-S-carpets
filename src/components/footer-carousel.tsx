'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons'
import { cn } from 'cn'
import Image, { StaticImageData } from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'

type FooterCarouselProps = {
  images: StaticImageData[]
}

export default function FooterCarousel({ images }: FooterCarouselProps) {
  const [current, setCurrent] = useState(0)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const manualPauseRef = useRef(false)

  useEffect(() => {
    // Don't start the normal 1.5-second timer
    // while we're in the 3-second manual pause.
    if (manualPauseRef.current) return
    timerRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 1500)
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [current, images.length])

  const handleNext = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    const nextIndex = (current + 1) % images.length
    setCurrent(nextIndex)
    // Pause on the newly selected image for 5 seconds
    manualPauseRef.current = true
    timerRef.current = setTimeout(() => {
      manualPauseRef.current = false
      // After 3 seconds, move to the next image
      setCurrent((nextIndex + 1) % images.length)
    }, 3000)
  }

  const handlePrevious = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    const previousIndex = (current - 1 + images.length) % images.length
    setCurrent(previousIndex)
    // Pause on the newly selected image for 5 seconds
    manualPauseRef.current = true
    timerRef.current = setTimeout(() => {
      manualPauseRef.current = false
      // After 3 seconds, continue forward
      setCurrent((previousIndex + 1) % images.length)
    }, 3000)
  }

  return (
    <div className="relative h-36 sm:h-64 w-full overflow-hidden rounded-md">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`floor-img-${index + 1}`}
          fill
          // priority={index === 0}
          className={cn(
            'object-cover object-bottom transition-opacity duration-1500',
            index === current ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}

      {/* Previous */}
      <div className="absolute left-1 top-1/2 -translate-y-1/2 z-10">
        <Button
          type="button"
          onClick={handlePrevious}
          aria-label="Previous button"
          className="bg-black/40 px-2 py-3.5 text-white rounded-none"
        >
          <Image
            src={ArrowLeftIcon}
            alt="arrow-left"
            className="w-auto h-2.5"
          />
        </Button>
      </div>

      {/* Next */}
      <div className="absolute right-1 top-1/2 -translate-y-1/2 z-10">
        <Button
          type="button"
          onClick={handleNext}
          aria-label="Next button"
          className="bg-black/40 px-2 py-3.5 text-white rounded-none"
        >
          <Image
            src={ArrowRightIcon}
            alt="arrow-left"
            className="w-auto h-2.5"
          />
        </Button>
      </div>
    </div>
  )
}
