'use client'

import SafeImage from '@/components/common/safe-image'
import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import { pickLocalized } from '@/lib/product-detail'
import type { HomeMedia } from '@/types/home'
import { cn } from 'cn'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeftIcon, ChevronRightIcon, ExpandIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import ImageZoomDialog from './image-zoom.dialog'

const HOVER_SCALE = 2.5

const controlClass =
  'absolute size-9 rounded-full bg-black/25 text-white backdrop-blur-sm hover:bg-black/50 hover:text-white'

// Product image slider. On mouse devices hovering a slide magnifies it in place (the point under
// the cursor stays put); clicking a slide or the expand icon opens the viewer dialog on that
// image, which is also the only zoom on touch devices. The arrows and dots only exist when there
// is more than one image.
export default function ImageZoom({
  images,
  fallbackAlt,
  children,
}: {
  images: HomeMedia[]
  fallbackAlt: string
  // overlays such as the badge
  children?: ReactNode
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('ProductDetailsPage.Details')
  const [emblaRef, emblaApi] = useEmblaCarousel({
    direction: locale === 'ar' ? 'rtl' : 'ltr',
  })
  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState(false)

  const multiple = images.length > 1

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
      emblaApi.off('reInit', onSelect)
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const canHover = () =>
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const altFor = (image: HomeMedia, index: number) =>
    pickLocalized(locale, image.alt, image.alt_ar) ||
    (multiple ? `${fallbackAlt} ${index + 1}` : fallbackAlt)

  return (
    <>
      <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {images.map((image, index) => (
            <button
              key={`${image.path}-${index}`}
              type="button"
              aria-label={t('zoomImage')}
              className="relative h-full min-w-0 shrink-0 grow-0 basis-full cursor-zoom-in overflow-hidden"
              onClick={() => setOpen(true)}
              onPointerMove={(e) => {
                if (e.pointerType !== 'mouse' || !canHover()) return
                const el = e.currentTarget
                  .firstElementChild as HTMLElement | null
                if (!el) return
                const rect = e.currentTarget.getBoundingClientRect()
                const x = ((e.clientX - rect.left) / rect.width) * 100
                const y = ((e.clientY - rect.top) / rect.height) * 100
                el.style.transformOrigin = `${x}% ${y}%`
                el.style.transform = `scale(${HOVER_SCALE})`
              }}
              onPointerLeave={(e) => {
                const el = e.currentTarget
                  .firstElementChild as HTMLElement | null
                if (el) el.style.transform = 'scale(1)'
              }}
            >
              <div className="absolute inset-0 transition-transform duration-150 ease-out">
                <SafeImage
                  src={image.path}
                  alt={altFor(image, index)}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1280px) 100vw, 50vw"
                  className="w-full object-cover"
                  draggable={false}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {children}

      {multiple && (
        <>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t('previousImage')}
            className={cn(controlClass, 'start-3 top-1/2 -translate-y-1/2')}
            onClick={scrollPrev}
          >
            <ChevronLeftIcon
              className="size-5 rtl:rotate-180"
              strokeWidth={1.5}
            />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={t('nextImage')}
            className={cn(controlClass, 'end-3 top-1/2 -translate-y-1/2')}
            onClick={scrollNext}
          >
            <ChevronRightIcon
              className="size-5 rtl:rotate-180"
              strokeWidth={1.5}
            />
          </Button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((image, index) => (
              <button
                key={`${image.path}-${index}`}
                type="button"
                aria-label={t('goToImage', { number: index + 1 })}
                aria-current={index === selected}
                onClick={() => emblaApi?.scrollTo(index)}
                className={cn(
                  'size-2.5 rounded-full ring-1 ring-black/30 transition-colors',
                  index === selected ? 'bg-white' : 'bg-white/50',
                )}
              />
            ))}
          </div>
        </>
      )}

      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={t('zoomImage')}
        className={cn(controlClass, 'inset-e-3 bottom-3')}
        onClick={() => setOpen(true)}
      >
        <ExpandIcon className="stroke-1" size={18} />
      </Button>

      <ImageZoomDialog
        images={images}
        index={selected}
        fallbackAlt={fallbackAlt}
        open={open}
        onOpenChange={setOpen}
        onIndexChange={(index) => emblaApi?.scrollTo(index, true)}
      />
    </>
  )
}
