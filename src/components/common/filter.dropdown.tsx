'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { OurIcon } from '@/components/ui/icon'
import { cn } from 'cn'
import { useState } from 'react'

export default function FilterDropdown({
  filterLabel,
  filterValues,
  value,
  onValueChange,
}: {
  filterLabel: string
  filterValues: (string | null)[]
  value: null | string
  onValueChange: (value: null | string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex w-fit flex-row items-center justify-between space-x-10 rounded-sm border border-blue-500 bg-white px-4 py-2 text-sm font-medium focus:ring-0 focus:outline-none">
        <span className="first-letter:uppercase">
          {!value ? filterLabel : value}
        </span>
        <OurIcon
          name="chevron-down"
          className={cn('size-2.5', open && 'rotate-180')}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-20! rounded-sm! **:rounded-sm!">
        {filterValues.map((filter, i) => (
          <DropdownMenuItem
            key={i}
            onClick={() => onValueChange(!filter ? null : filter.toLowerCase())}
          >
            <span className="rtl:hidden">{filter ?? 'All'}</span>
            <span className="ltr:hidden">{filter ?? 'الأحدث'}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
