'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import { cn } from 'cn'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function FooterCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const manualPauseRef = useRef(false)
  const hasMultiple = images.length > 1

  useEffect(() => {
    // Nothing to rotate with a single image.
    if (!hasMultiple) return
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
  }, [current, images.length, hasMultiple])

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
    <div className="relative h-36 w-full overflow-hidden rounded-md md:h-54">
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`Elegant Flooring ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={cn(
            'object-cover object-bottom transition-opacity duration-1500',
            index === current ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}

      {hasMultiple && (
        <>
          {/* Previous */}
          <div className="absolute top-1/2 left-1 z-10 -translate-y-1/2">
            <Button
              type="button"
              onClick={handlePrevious}
              aria-label="Previous button"
              className="cursor-pointer rounded-none bg-black/40 px-2 py-3.5 text-white"
            >
              <OurIcon name="arrow-left" className="size-3.5" />
            </Button>
          </div>

          {/* Next */}
          <div className="absolute top-1/2 right-1 z-10 -translate-y-1/2">
            <Button
              type="button"
              onClick={handleNext}
              aria-label="Next button"
              className="cursor-pointer rounded-none bg-black/40 px-2 py-3.5 text-white"
            >
              <OurIcon name="arrow-right" className="size-3.5" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
