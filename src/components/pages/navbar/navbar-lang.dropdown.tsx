'use client'

import type { LocaleType } from '@/i18n/types'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { createPortal } from 'react-dom'

export default function NavbarLangDropdown() {
  const locale = useLocale() as LocaleType

  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const exactPathname =
    pathname.indexOf('/', 1) > -1
      ? pathname.slice(pathname.indexOf('/', 1))
      : ''

  // Keep the current page visible while the new language renders; a global loader shows meanwhile
  const switchLocale = (target: LocaleType) => {
    if (isPending || target === locale) return
    const search = typeof window !== 'undefined' ? window.location.search : ''
    startTransition(() => {
      router.push(`/${target}${exactPathname}${search}`)
    })
  }

  return (
    <>
      {/* global, centered loader while the new language renders (portal avoids navbar stacking/transform issues) */}
      {isPending &&
        createPortal(
          <div
            role="status"
            aria-label="Switching language"
            className="fixed inset-0 z-1000 flex items-center justify-center bg-white/60 backdrop-blur-[1px]"
          >
            <Image
              src="/site-logo-email.png"
              alt="Z&S Carpets"
              width={214}
              height={90}
              priority
              className="h-auto w-36 animate-pulse"
            />
          </div>,
          document.body,
        )}
      <button
        type="button"
        disabled={isPending}
        onClick={() => switchLocale(locale === 'en' ? 'ar' : 'en')}
        aria-label={locale === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
        className="cursor-pointer py-2.25 text-base first-letter:uppercase focus:ring-0 focus:outline-none"
      >
        {locale}
      </button>
    </>
  )
}
