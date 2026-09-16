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
          <div className="flex cursor-pointer flex-row items-baseline justify-start space-x-1.5">
            <p className="font-medium first-letter:uppercase">{locale}</p>
            <Image
              src={ArrowIcon}
              alt="arrow-down-icon"
              className={cn('h-1.5 w-auto', open ? 'rotate-180' : '')}
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
