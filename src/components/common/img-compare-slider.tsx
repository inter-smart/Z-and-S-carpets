'use client'

import type { LocaleType } from '@/i18n/types'
import { ImgComparisonSlider } from '@img-comparison-slider/react'
import { cn } from 'cn'
import { ChevronsLeftRightIcon } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image, { type StaticImageData } from 'next/image'

export default function ImgCompareSlider({
  images,
  className,
}: {
  images: StaticImageData[]
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
        src={images[0]}
        alt="compare-after-image"
        className="block w-full"
      />
      <Image
        slot={locale === 'ar' ? 'first' : 'second'}
        src={images[1]}
        alt="compare-before-image"
        className="block w-full"
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
