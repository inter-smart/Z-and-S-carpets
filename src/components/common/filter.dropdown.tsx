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
  options,
  allLabel,
  value,
  onValueChange,
}: {
  filterLabel: string
  filterValues?: (string | null)[]
  // Alternative to `filterValues`: items with their own value (e.g. a slug) and display label.
  // The selected value is passed through as is.
  options?: { value: string; label: string }[]
  // Label of the "no filter" item when `options` is used
  allLabel?: string
  value: null | string
  onValueChange: (value: null | string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex w-fit flex-row items-center justify-between space-x-10 rounded-sm border border-blue-500 bg-white px-4 py-2 text-sm font-medium focus:ring-0 focus:outline-none">
        <span className="whitespace-nowrap uppercase">
          {!value
            ? filterLabel
            : (options?.find((option) => option.value === value)?.label ??
              value)}
        </span>
        <OurIcon
          name="chevron-down"
          className={cn('size-2.5', open && 'rotate-180')}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-20! rounded-sm! **:rounded-sm! **:text-sm!">
        {options ? (
          <>
            <DropdownMenuItem onClick={() => onValueChange(null)}>
              {allLabel ?? 'All'}
            </DropdownMenuItem>
            {options.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => onValueChange(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </>
        ) : (
          (filterValues ?? []).map((filter, i) => (
            <DropdownMenuItem
              key={i}
              onClick={() =>
                onValueChange(!filter ? null : filter.toLowerCase())
              }
            >
              <span className="rtl:hidden">{filter ?? 'All'}</span>
              <span className="ltr:hidden">{filter ?? 'الأحدث'}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
