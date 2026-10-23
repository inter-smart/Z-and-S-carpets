'use client'

import FilterDropdown from '@/components/common/filter.dropdown'
import WorkItemCard from '@/components/common/work-item.card'
import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import { toWorkCard } from '@/lib/works'
import type { WorkProject } from '@/types/work'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'

const filterValues = ['One', 'Two', 'Three']

export default function RelatedProjectsSection({
  projects,
}: {
  projects: WorkProject[]
}) {
  const locale = useLocale() as LocaleType

  const t = useTranslations('WorksPage.RelatedProjectsSection')
  const t2 = useTranslations('Works')

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

  // #Prev/Next
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  // Arrows only matter when the cards overflow the viewport: 1 card per view on mobile,
  // 2 from md up. Embla recomputes this on resize ('reInit'), so it covers every breakpoint.
  const hasOverflow = canPrev || canNext

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

  const [selectedFilter, setSelectedFilter] = useState<null | string>(null)

  return (
    <section className="bg-[#EFF9FE] py-12 lg:py-20">
      <div className="container-wrapper">
        {/* header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6 xl:items-center">
          <h2 className="our-heading">{t('title')}</h2>
          <FilterDropdown
            filterLabel={t('filterLabel')}
            filterValues={[null, ...filterValues]}
            value={selectedFilter}
            onValueChange={setSelectedFilter}
          />
        </div>
        <div className="relative mt-10">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ms-4 flex">
              {projects.map((project) => {
                return (
                  <div
                    key={project.slug}
                    className="h-60 min-w-0 shrink-0 grow-0 basis-full ps-4 md:basis-1/2 2xl:h-80"
                  >
                    <WorkItemCard
                      project={toWorkCard(
                        project,
                        locale,
                        t2('viewProjectLabel'),
                      )}
                      hasViewProductsBtn
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* btns */}
          {/* Desktop Previous */}
          <div
            className={cn(
              'absolute top-1/2 -left-10 hidden -translate-y-1/2 lg:block rtl:-right-10 rtl:left-auto',
              !hasOverflow && 'lg:hidden',
            )}
          >
            <Button
              type="button"
              variant="ghost"
              aria-label="Previous collection"
              onClick={scrollPrev}
              disabled={!canPrev}
              className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
            >
              {/* LTR */}
              <OurIcon name="arrow-left" className="ltr:block rtl:hidden" />
              {/* RTL */}
              <OurIcon name="arrow-right" className="ltr:hidden rtl:block" />
            </Button>
          </div>

          {/* Desktop Next */}
          <div
            className={cn(
              'absolute top-1/2 -right-10 hidden -translate-y-1/2 lg:block rtl:right-auto rtl:-left-10',
              !hasOverflow && 'lg:hidden',
            )}
          >
            <Button
              type="button"
              variant="ghost"
              aria-label="Next collection"
              onClick={scrollNext}
              disabled={!canNext}
              className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
            >
              {/* LTR */}
              <OurIcon name="arrow-right" className="ltr:block rtl:hidden" />
              {/* RTL */}
              <OurIcon name="arrow-left" className="ltr:hidden rtl:block" />
            </Button>
          </div>
        </div>

        {/* btn mobile */}
        <div
          className={cn(
            'mt-2 flex justify-center gap-2 lg:hidden',
            !hasOverflow && 'hidden',
          )}
        >
          <Button
            aria-label="Previous products"
            variant="ghost"
            size="icon"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
          >
            {/* LTR */}
            <OurIcon name="arrow-left" className="hidden ltr:block" />
            {/* RTL */}
            <OurIcon name="arrow-right" className="hidden rtl:block" />
          </Button>
          <Button
            aria-label="Next products"
            variant="ghost"
            size="icon"
            onClick={scrollNext}
            disabled={!canNext}
            className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
          >
            {/* LTR */}
            <OurIcon name="arrow-right" className="hidden ltr:block" />
            {/* RTL */}
            <OurIcon name="arrow-left" className="hidden rtl:block" />
          </Button>
        </div>
      </div>
    </section>
  )
}
