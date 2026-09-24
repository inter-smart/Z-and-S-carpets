'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function NavbarLangDropdown() {
  const locale = useLocale() as LocaleType

  const [open, setOpen] = useState(false)

  const pathname = usePathname()

  const exactPathname =
    pathname.indexOf('/', 1) > -1
      ? pathname.slice(pathname.indexOf('/', 1))
      : ''

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <p className="flex cursor-pointer flex-row items-center space-x-0.5 sm:space-x-1.5">
          <span className="first-letter:uppercase">{locale}</span>
          <OurIcon name="chevron-down" className="size-2.5" />
        </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-20! rounded-sm! **:rounded-sm!">
        <Link href={`/en${exactPathname}`}>
          <DropdownMenuItem>English</DropdownMenuItem>
        </Link>
        <Link href={`/ar${exactPathname}`}>
          <DropdownMenuItem>العربية</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
