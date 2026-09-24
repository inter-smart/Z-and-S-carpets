'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { OurIcon } from '@/components/ui/icon'
import { useState } from 'react'

export default function RelatedProjectsFilterDropdown({
  filterValues,
}: {
  filterValues: string[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className="flex w-30 flex-row items-center justify-between rounded-sm border border-t-0 border-blue-500 bg-white px-4 py-2 text-sm font-medium focus:ring-0 focus:outline-none">
        <span className="first-letter:uppercase">Filter</span>
        <OurIcon name="chevron-down" className="size-2.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-20! rounded-sm! **:rounded-sm!">
        {filterValues.map((value, i) => (
          <DropdownMenuItem key={i}>{value}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
