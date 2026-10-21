'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { LocaleType } from '@/i18n/types'
import { cn } from 'cn'
import { ChevronDownIcon } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { createPortal } from 'react-dom'

export default function NavbarLangDropdown() {
  const locale = useLocale() as LocaleType

  const [open, setOpen] = useState(false)

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
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger className="py-2.25 focus:ring-0 focus:outline-none">
          <p className="flex cursor-pointer flex-row items-center space-x-0.5 text-base sm:space-x-1.5">
            <span className="first-letter:uppercase">{locale}</span>
            <ChevronDownIcon
              size={12}
              className={cn(
                'transition-transform duration-300',
                open ? 'rotate-180' : 'rotate-0',
              )}
            />
          </p>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={6}
          className="min-w-20! rounded-md! text-2xl **:rounded-sm! **:text-sm"
        >
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => switchLocale('en')}
          >
            English
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => switchLocale('ar')}
          >
            العربية
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
