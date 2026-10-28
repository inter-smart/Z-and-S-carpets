'use client'

import SafeImage from '@/components/common/safe-image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import type { LocaleType } from '@/i18n/types'
import { pickLocalized } from '@/lib/product-detail'
import type { HomeMedia } from '@/types/home'
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useRef, useState } from 'react'

const ZOOM_SCALE = 2.5

// Image viewer in a bounded dialog, opened on `index` of `images` (previous / next appear when there
// is more than one). Mouse: hovering magnifies in place. Touch: tap toggles the zoom and dragging
// pans while zoomed.
export default function ImageZoomDialog({
  images,
  index,
  fallbackAlt,
  open,
  onOpenChange,
  onIndexChange,
}: {
  images: HomeMedia[]
  index: number
  fallbackAlt: string
  open: boolean
  onOpenChange: (open: boolean) => void
  onIndexChange: (index: number) => void
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('ProductDetailsPage.Details')
  const image = images[index] ?? images[0]
  const alt =
    (image && pickLocalized(locale, image.alt, image.alt_ar)) || fallbackAlt
  const multiple = images.length > 1
  const imageRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ moved: boolean } | null>(null)
  const [touchZoomed, setTouchZoomed] = useState(false)

  const zoomAt = (clientX: number, clientY: number, container: HTMLElement) => {
    const el = imageRef.current
    if (!el) return
    const rect = container.getBoundingClientRect()
    const x = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    )
    const y = Math.min(
      100,
      Math.max(0, ((clientY - rect.top) / rect.height) * 100),
    )
    el.style.transformOrigin = `${x}% ${y}%`
    el.style.transform = `scale(${ZOOM_SCALE})`
  }

  const reset = () => {
    const el = imageRef.current
    if (el) el.style.transform = 'scale(1)'
    setTouchZoomed(false)
  }

  // wraps around, and starts the next image un-zoomed
  const go = (step: number) => {
    reset()
    onIndexChange((index + step + images.length) % images.length)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset()
        onOpenChange(next)
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100vw-1.5rem)] max-w-3xl gap-0 overflow-hidden p-0 sm:max-w-3xl lg:max-w-4xl"
      >
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogClose
          render={
            <Button
              variant="secondary"
              size="icon"
              aria-label={t('closeZoom')}
              className="absolute inset-e-2 top-2 z-10 rounded-full bg-white shadow sm:inset-e-3 sm:top-3"
            />
          }
        >
          <XIcon className="size-5" />
        </DialogClose>

        {multiple && (
          <>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label={t('previousImage')}
              className="absolute start-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow sm:start-3"
              onClick={() => go(-1)}
            >
              <ChevronLeftIcon className="size-5 rtl:rotate-180" />
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="icon"
              aria-label={t('nextImage')}
              className="absolute end-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white shadow sm:end-3"
              onClick={() => go(1)}
            >
              <ChevronRightIcon className="size-5 rtl:rotate-180" />
            </Button>
          </>
        )}

        <div
          className="relative h-[min(75dvh,32rem)] w-full touch-none overflow-hidden bg-[#F4F4F4] sm:h-[min(80dvh,40rem)] lg:h-[min(80dvh,46rem)]"
          style={{ cursor: touchZoomed ? 'zoom-out' : 'zoom-in' }}
          onPointerDown={(e) => {
            if (e.pointerType === 'mouse') return
            dragRef.current = { moved: false }
          }}
          onPointerMove={(e) => {
            if (e.pointerType === 'mouse') {
              zoomAt(e.clientX, e.clientY, e.currentTarget)
              return
            }
            // a finger pans only while it is down on a zoomed image
            if (!touchZoomed || !dragRef.current) return
            dragRef.current.moved = true
            zoomAt(e.clientX, e.clientY, e.currentTarget)
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === 'mouse') reset()
          }}
          onPointerUp={(e) => {
            if (e.pointerType === 'mouse') return
            const moved = dragRef.current?.moved
            dragRef.current = null
            if (moved) return
            if (touchZoomed) return reset()
            zoomAt(e.clientX, e.clientY, e.currentTarget)
            setTouchZoomed(true)
          }}
        >
          <div
            ref={imageRef}
            className="absolute inset-0 transition-transform duration-150 ease-out"
          >
            <SafeImage
              src={image?.path}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              quality={90}
              draggable={false}
              className="object-contain select-none"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
