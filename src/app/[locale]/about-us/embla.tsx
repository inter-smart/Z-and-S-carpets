'use client'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
      }),
    ],
  )

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
    <div className="container-wrapper">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          <div className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="flex h-64 items-center justify-center bg-red-200">
              Slide 1
            </div>
          </div>

          <div className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="flex h-64 items-center justify-center bg-blue-200">
              Slide 2
            </div>
          </div>

          <div className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="flex h-64 items-center justify-center bg-green-200">
              Slide 3
            </div>
          </div>
          <div className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="flex h-64 items-center justify-center bg-red-200">
              Slide 1
            </div>
          </div>

          <div className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="flex h-64 items-center justify-center bg-blue-200">
              Slide 2
            </div>
          </div>

          <div className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="flex h-64 items-center justify-center bg-green-200">
              Slide 3
            </div>
          </div>
        </div>
      </div>
      {/* btns */}
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canPrev}
          className="rounded-md border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={scrollNext}
          disabled={!canNext}
          className="rounded-md border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
