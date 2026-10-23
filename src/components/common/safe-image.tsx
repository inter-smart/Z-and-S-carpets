'use client'

import { PLACEHOLDER_IMAGE, resolveImageSrc } from '@/lib/utils'
import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

type SafeImageProps = Omit<ImageProps, 'src' | 'alt'> & {
  src?: string | null
  alt?: string
}

export default function SafeImage({ src, alt = '', ...props }: SafeImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const resolved = resolveImageSrc(src)
  const finalSrc = failedSrc === resolved ? PLACEHOLDER_IMAGE : resolved

  return (
    <Image
      {...props}
      src={finalSrc}
      alt={alt}
      onError={(e) => {
        if (finalSrc !== PLACEHOLDER_IMAGE) setFailedSrc(resolved)
        props.onError?.(e)
      }}
    />
  )
}
