'use client'

import type { LocaleType } from '@/i18n/types'
import { ImgComparisonSlider } from '@img-comparison-slider/react'
import { cn } from 'cn'
import { ChevronsLeftRightIcon } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image, { type StaticImageData } from 'next/image'

export type CompareImage = {
  src: string | StaticImageData
  alt: string
}

// Both slot images get an opaque background so a transparent image (e.g. a logo) never shows the other image through it
// Remote (API) images have no intrinsic size at build time; this matches the 1.4 ratio of the photos
const REMOTE_IMAGE_SIZE = { width: 1400, height: 1000 }

export default function ImgCompareSlider({
  images,
  className,
}: {
  images: CompareImage[]
  className?: string
}) {
  const locale = useLocale() as LocaleType

  return (
    <ImgComparisonSlider
      className={cn(
        'block h-110 w-full overflow-hidden rounded-md outline-none',
        className,
      )}
      style={
        {
          '--divider-width': '2px',
          '--divider-color': '#fff',
        } as React.CSSProperties
      }
    >
      <Image
        slot={locale === 'ar' ? 'second' : 'first'}
        src={images[0].src}
        alt={images[0].alt}
        {...(typeof images[0].src === 'string' ? REMOTE_IMAGE_SIZE : {})}
        className="block w-full bg-white"
      />
      <Image
        slot={locale === 'ar' ? 'first' : 'second'}
        src={images[1].src}
        alt={images[1].alt}
        {...(typeof images[1].src === 'string' ? REMOTE_IMAGE_SIZE : {})}
        className="block w-full bg-white"
      />
      <div
        slot="handle"
        className="flex size-6 items-center justify-center rounded-full bg-[#812990] text-white sm:size-10"
      >
        <ChevronsLeftRightIcon className="size-4 stroke-1 sm:size-7" />
      </div>
    </ImgComparisonSlider>
  )
}
