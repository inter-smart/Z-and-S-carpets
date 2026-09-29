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
      <DropdownMenuTrigger className="py-2.25 focus:ring-0 focus:outline-none">
        <p className="flex cursor-pointer flex-row items-center space-x-0.5 sm:space-x-1.5">
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
        sideOffset={7.5}
        className="min-w-20! rounded-md! **:rounded-md!"
      >
        <Link
          href={`/en${exactPathname}`}
          className="focus:ring-0 focus:outline-none"
        >
          <DropdownMenuItem>English</DropdownMenuItem>
        </Link>
        <Link
          href={`/ar${exactPathname}`}
          className="focus:ring-0 focus:outline-none"
        >
          <DropdownMenuItem>العربية</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
