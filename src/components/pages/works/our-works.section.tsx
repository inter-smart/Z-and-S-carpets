'use client'

import WorkItemCard from '@/components/common/work-item.card'
import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import type { WorkCategoryType, WorkItemType } from '@/types/work'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export default function OurWorksSection() {
  const locale = useLocale() as LocaleType

  const searchParams = useSearchParams()
  const category = searchParams.get('type')

  const t = useTranslations('WorksPage.OurWorks')
  const t2 = useTranslations('Works')

  const workCategories = t2.raw('Categories') as WorkCategoryType[]
  const workItems = t2.raw('Items') as WorkItemType[]

  // #Filter by category
  const filteredWorkItems = useMemo(
    () =>
      workItems.filter(
        (item) => category === null || item.category === category,
      ),
    [workItems, category],
  )

  return (
    <section className="container-wrapper pt-8 pb-12 lg:pt-12 lg:pb-18">
      <h2 id="projects-title" className="section-title text-center">
        {t('title')}
      </h2>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        {workCategories.map((item) => (
          <Button
            key={item.id}
            type="button"
            variant="outline"
            onClick={() => {
              if (item.id === 'all')
                window.history.pushState({}, '', `/${locale}/works`)
              else
                window.history.pushState(
                  {},
                  '',
                  `/${locale}/works?type=${item.id}`,
                )
            }}
            className={cn(
              'rounded-md border px-9 py-4.5 text-xs font-semibold transition-colors hover:border-[#0066B3] hover:text-[#0066B3]',
              category === item.id
                ? 'border-[#0066B3]! text-[#0066B3]!'
                : 'border-[#CDCDCD]!',
            )}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {/* WorkItemCards */}
      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {filteredWorkItems.map((item, index) => (
          <div key={index} className="h-60 md:h-70">
            <WorkItemCard project={item} hasViewProductsBtn />
          </div>
        ))}
      </div>

      <div className="mt-12 flex w-full justify-center">
        <Button variant="outline" className="our-btn border-our-blue">
          {t('loadMoreBtnLable')}
        </Button>
      </div>
    </section>
  )
}
