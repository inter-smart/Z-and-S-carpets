'use client'

import { useLocale } from 'next-intl'
import { Toaster as Sonner } from 'sonner'

export function Toaster() {
  const locale = useLocale()

  return (
    <Sonner
      position="top-center"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      closeButton
    />
  )
}
