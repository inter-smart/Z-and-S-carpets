'use client'

import { Fragment } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BreadcrumbBar({
  values,
  className,
}: {
  values: { name: string; link: string; currentPage?: boolean }[]
  className?: string
}) {
  const t = useTranslations('Common')
  const pathname = usePathname()

  const pathnameSplits = pathname.split('/')
  const currentUrlEndPoint = '/' + pathnameSplits[pathnameSplits.length - 1]

  return (
    <div className={cn(className)}>
      <div className="container-wrapper flex min-h-12 items-center">
        <Breadcrumb>
          <BreadcrumbList className="gap-1 text-lg! sm:gap-3">
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />} className="text-black">
                {t('breadcrumbHome')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {values.map((value) => (
              <Fragment key={value.link}>
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
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}
