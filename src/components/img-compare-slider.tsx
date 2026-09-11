'use client'

import type { LocaleType } from '@/i18n/types'
import { ImgComparisonSlider } from '@img-comparison-slider/react'
import { cn } from 'cn'
import { ChevronsLeftRightIcon } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image, { type StaticImageData } from 'next/image'

export default function ImgCompareSlider({
  images,
  height,
}: {
  images: StaticImageData[]
  height?: string
}) {
  const locale = useLocale() as LocaleType

  return (
    <ImgComparisonSlider
      className={cn(
        'block w-full overflow-hidden rounded-md outline-none',
        height ?? 'h-110',
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
        className="size-10 flex justify-center items-center rounded-full bg-[#812990] text-white"
      >
        <ChevronsLeftRightIcon />
      </div>
    </ImgComparisonSlider>
  )
}
