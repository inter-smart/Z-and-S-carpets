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
      <h2 id="projects-title" className="our-heading text-center">
        {t('title')}
      </h2>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        {workCategories.map((item, i) => (
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
              'hover:border-our-blue hover:text-our-blue our-btn font-semibold! uppercase transition-colors',
              category === item.id
                ? 'border-our-blue! text-our-blue!'
                : 'border-[#CDCDCD]!',
              !category && i === 0 && 'border-our-blue! text-our-blue!',
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
