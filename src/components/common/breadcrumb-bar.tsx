'use client'

import { cn } from 'cn'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb'

export default function BreadcrumbBar({
  values,
}: {
  values: { name: string; link: string }[]
}) {
  const pathname = usePathname()

  const pathnameSplits = pathname.split('/')
  const currentUrlEndPoint = pathnameSplits[pathnameSplits.length - 1]

  return (
    <div className="container-wrapper flex h-12 items-center">
      <Breadcrumb>
        <BreadcrumbList className="our-text! gap-3">
          <BreadcrumbItem>
            <BreadcrumbLink render={<Link href="/" />} className="text-black">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          {values.map((value) => (
            <div key={value.link} className="flex gap-3">
              <BreadcrumbSeparator className="text-black">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  render={<Link href={`/${value.link}`} />}
                  className={cn(
                    currentUrlEndPoint === value.link
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
