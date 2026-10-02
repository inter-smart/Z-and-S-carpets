'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from 'cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BreadcrumbBar({
  values,
  className,
}: {
  values: { name: string; link: string; currentPage?: boolean }[]
  className?: string
}) {
  const pathname = usePathname()

  const pathnameSplits = pathname.split('/')
  const currentUrlEndPoint = '/' + pathnameSplits[pathnameSplits.length - 1]

  return (
    <div
      className={cn('container-wrapper flex min-h-12 items-center', className)}
    >
      <Breadcrumb>
        <BreadcrumbList className="gap-1 text-lg! sm:gap-3">
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />} className="text-black">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {values.map((value) => (
            <div key={value.link} className="flex gap-1 sm:gap-3">
              <BreadcrumbSeparator className="text-black">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={<Link href={value.link} />}
                  className={cn(
                    currentUrlEndPoint === value.link || value.currentPage
                      ? 'text-[#812990] hover:text-[#812990]'
                      : 'text-black',
                  )}
                >
                  {value.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
