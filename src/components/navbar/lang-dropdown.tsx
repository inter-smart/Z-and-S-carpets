'use client'

import { ArrowIcon } from '@/assets/icons'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { LocaleType } from '@/i18n/types'
import { cn } from 'cn'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function LangDropdown() {
  const locale = useLocale() as LocaleType

  const [open, setOpen] = useState(false)

  const pathname = usePathname()

  const exactPathname =
    pathname.indexOf('/', 1) > -1
      ? pathname.slice(pathname.indexOf('/', 1))
      : ''

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        nativeButton={false}
        render={
          <div className="flex cursor-pointer flex-row items-baseline justify-start space-x-0.5 sm:space-x-1.5">
            <p className="first-letter:uppercase">{locale}</p>
            <Image
              src={ArrowIcon}
              alt="arrow-down-icon"
              className={cn('h-1.5 w-auto', open ? 'rotate-180' : '')}
            />
          </div>
        }
      ></DropdownMenuTrigger>
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
