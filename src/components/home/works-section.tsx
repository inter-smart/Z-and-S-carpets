'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import type { WorkCategoryType, WorkItemType } from '@/types/work'
import { cn } from 'cn'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import WorkItemCard from '../common/work-item-card'

export default function WorksSection() {
  const locale = useLocale() as LocaleType

  const t = useTranslations('HomePage.WorksSection')
  const t2 = useTranslations('Works')

  const workCategories = t2.raw('Categories') as WorkCategoryType[]
  const workItems = t2.raw('Items') as WorkItemType[]

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      direction: locale === 'ar' ? 'rtl' : 'ltr',
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  )

  // #Filter by category
  const [category, setCategory] = useState(workCategories[0].id)

  const filteredWorkItems = useMemo(
    () =>
      workItems.filter(
        (item) =>
          category === workCategories[0].id || item.category === category,
      ),
    [workCategories, workItems, category],
  )

  const columns = useMemo(() => {
    const result: {
      type: 'full' | 'stacked'
      items: WorkItemType[]
    }[] = []

    for (let i = 0; i < filteredWorkItems.length; i += 3) {
      result.push({
        type: 'full',
        items: [filteredWorkItems[i]],
      })

      if (filteredWorkItems[i + 1]) {
        result.push({
          type: 'stacked',
          items: filteredWorkItems.slice(i + 1, i + 3),
        })
      }
    }

    return result
  }, [filteredWorkItems])

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.reInit()
    emblaApi.scrollTo(0, true)
  }, [category, emblaApi])

  // #Prev/Next
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const updateButtons = () => {
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }

    updateButtons()

    emblaApi.on('select', updateButtons)
    emblaApi.on('reInit', updateButtons)

    return () => {
      emblaApi.off('select', updateButtons)
      emblaApi.off('reInit', updateButtons)
    }
  }, [emblaApi])

  return (
    <section
      className="bg-[#EFF9FE] pt-16 pb-12 lg:pt-24 lg:pb-18"
      aria-labelledby="projects-title"
    >
      <div className="container-wrapper">
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
                setCategory(item.id)
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
        <div className="relative mt-10">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ms-4 flex">
              {columns.map((column, columnIndex) => (
                <div
                  key={columnIndex}
                  className="min-h-100 min-w-0 shrink-0 grow-0 basis-full ps-4 lg:min-h-120 lg:basis-1/2 xl:min-h-140 2xl:min-h-160"
                >
                  {column.type === 'full' ? (
                    <WorkItemCard project={column.items[0]} />
                  ) : (
                    <div className="grid h-full grid-rows-2 gap-5">
                      {column.items.map((item, itemIndex) => (
                        <WorkItemCard key={itemIndex} project={item} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop navigation */}
          {/* Desktop Previous */}
          <div className="absolute top-1/2 -left-8 hidden -translate-y-1/2 sm:block md:-left-10 rtl:-right-8 rtl:left-auto rtl:md:-right-10">
            <Button
              type="button"
              variant="ghost"
              aria-label="Previous collection"
              onClick={scrollPrev}
              disabled={!canPrev}
              className="text-our-purple hover:text-our-purple pointer-events-auto cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
            >
              {/* LTR */}
              <OurIcon name="arrow-left" className="ltr:block rtl:hidden" />
              {/* RTL */}
              <OurIcon name="arrow-right" className="ltr:hidden rtl:block" />
            </Button>
          </div>
          {/* Desktop Next */}
          <div className="absolute top-1/2 -right-8 hidden -translate-y-1/2 sm:block md:-right-10 rtl:right-auto rtl:-left-8 rtl:md:-left-10">
            <Button
              type="button"
              variant="ghost"
              aria-label="Next collection"
              onClick={scrollNext}
              disabled={!canNext}
              className="text-our-purple hover:text-our-purple pointer-events-auto cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
            >
              {/* LTR */}
              <OurIcon name="arrow-right" className="ltr:block rtl:hidden" />
              {/* RTL */}
              <OurIcon name="arrow-left" className="ltr:hidden rtl:block" />
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        <div className="mt-6 flex justify-center gap-2 sm:hidden">
          <Button
            type="button"
            aria-label="Previous projects"
            variant="ghost"
            size="icon"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0! disabled:opacity-30"
          >
            {/* LTR */}
            <OurIcon name="arrow-left" className="hidden ltr:block" />
            {/* RTL */}
            <OurIcon name="arrow-right" className="hidden rtl:block" />
          </Button>

          <Button
            type="button"
            aria-label="Next projects"
            variant="ghost"
            size="icon"
            onClick={scrollNext}
            disabled={!canNext}
            className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0! disabled:opacity-30"
          >
            {/* LTR */}
            <OurIcon name="arrow-right" className="hidden ltr:block" />
            {/* RTL */}
            <OurIcon name="arrow-left" className="hidden rtl:block" />
          </Button>
        </div>

        <div className="flex justify-center">
          <Button
            type="button"
            render={<Link href={'/works'} />}
            nativeButton={false}
            className="our-btn bg-our-blue hover:bg-our-blue mt-10 px-5! text-white lg:mt-12"
          >
            {t('viewAllProjectsBtnLabel')}
          </Button>
        </div>
      </div>
    </section>
  )
}
