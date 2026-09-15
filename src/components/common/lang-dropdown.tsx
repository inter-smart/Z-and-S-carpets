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
import { useState } from 'react'

export default function LangDropdown() {
  const locale = useLocale() as LocaleType

  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        nativeButton={false}
        render={
          <div className="flex flex-row justify-start items-baseline space-x-1.5 cursor-pointer">
            <p className="first-letter:uppercase font-medium">{locale}</p>
            <Image
              src={ArrowIcon}
              alt="arrow-down-icon"
              className={cn('w-auto h-1.5', open ? 'rotate-180' : '')}
            />
          </div>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-20! rounded-sm! **:rounded-sm!">
        <Link href="/en">
          <DropdownMenuItem>English</DropdownMenuItem>
        </Link>
        <Link href="/ar">
          <DropdownMenuItem>العربية</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
