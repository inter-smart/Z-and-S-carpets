'use client'

import WorkItemCard from '@/components/common/work-item.card'
import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import { pickLocalized, toWorkCard } from '@/lib/works'
import type { HomeData } from '@/types/home'
import type {
  WorkCardItem,
  WorkCategoryType,
  WorkFilterIndustry,
  WorkListData,
  WorkProject,
} from '@/types/work'
import { cn } from 'cn'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface WorksHomeClientProps {
  industries: WorkFilterIndustry[]
  initialProjects: WorkProject[]
  limit: number
  title?: HomeData['works_section']
}

export default function WorksHomeClient({
  industries,
  initialProjects,
  limit,
  title,
}: WorksHomeClientProps) {
  const locale = useLocale() as LocaleType

  const t = useTranslations('HomePage.WorksSection')
  const t2 = useTranslations('Works')

  const allLabel =
    (t2.raw('Categories') as WorkCategoryType[]).find((c) => c.id === 'all')
      ?.label ?? 'All'

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

  // #Filter by industry: the first list comes from the server; every filter click
  // fetches that industry from the /api/works route
  const [industry, setIndustry] = useState('')
  const [projects, setProjects] = useState<WorkProject[]>(initialProjects)
  const [isLoading, setIsLoading] = useState(false)
  const requestRef = useRef(0)
  const industryRef = useRef('')

  const selectIndustry = async (slug: string) => {
    const previous = industryRef.current
    const requestId = ++requestRef.current
    industryRef.current = slug
    setIndustry(slug)

    // keep the current cards visible while the new ones load
    setIsLoading(true)
    try {
      const query = new URLSearchParams({
        page: '1',
        limit: String(limit),
        show_in_home: '1',
      })
      if (slug) query.set('industry', slug)

      const response = await fetch(`/api/works?${query}`)
      if (!response.ok) throw new Error('Failed to load projects')

      const data = (await response.json()) as WorkListData
      if (requestId === requestRef.current) setProjects(data.projects)
    } catch {
      if (requestId === requestRef.current) {
        industryRef.current = previous
        setIndustry(previous)
      }
    } finally {
      if (requestId === requestRef.current) setIsLoading(false)
    }
  }

  const workItems: WorkCardItem[] = useMemo(
    () =>
      projects.map((project) =>
        toWorkCard(project, locale, t2('viewProjectLabel')),
      ),
    [projects, locale, t2],
  )

  const columns = useMemo(() => {
    const result: {
      type: 'full' | 'stacked'
      items: WorkCardItem[]
    }[] = []

    for (let i = 0; i < workItems.length; i += 3) {
      result.push({
        type: 'full',
        items: [workItems[i]],
      })

      if (workItems[i + 1]) {
        result.push({
          type: 'stacked',
          items: workItems.slice(i + 1, i + 3),
        })
      }
    }

    return result
  }, [workItems])

  useEffect(() => {
    if (!emblaApi) return

    emblaApi.reInit()
    emblaApi.scrollTo(0, true)
  }, [projects, emblaApi])

  // #Prev/Next
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const canScroll = canPrev || canNext

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
        <h2 id="projects-title" className="our-heading text-center">
          {pickLocalized(locale, title?.title, title?.title_ar) || t('title')}
        </h2>

        {industries.length > 0 && (
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {[
              { slug: '', label: allLabel },
              ...industries.map((item) => ({
                slug: item.slug,
                label: pickLocalized(locale, item.title, item.title_ar),
              })),
            ].map((item) => (
              <Button
                key={item.slug || 'all'}
                type="button"
                variant="outline"
                onClick={() => selectIndustry(item.slug)}
                className={cn(
                  'hover:border-our-blue hover:text-our-blue our-btn font-semibold! uppercase transition-colors',
                  industry === item.slug
                    ? 'border-our-blue! text-our-blue!'
                    : 'border-[#CDCDCD]!',
                )}
              >
                {item.label}
              </Button>
            ))}
          </div>
        )}

        {workItems.length === 0 ? (
          <p
            role="status"
            className={cn(
              'text-muted-foreground mt-12 text-center text-lg',
              isLoading && 'opacity-60',
            )}
          >
            {t2('noProjectsFound')}
          </p>
        ) : (
          <>
            {/* WorkItemCards */}
            <div className="relative mt-10">
              <div
                className={cn(
                  'overflow-hidden rounded-md transition-opacity',
                  isLoading && 'opacity-60',
                )}
                ref={emblaRef}
              >
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

              {/* Desktop navigation (hidden when there is nothing to scroll) */}
              {canScroll && (
                <>
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
                      <OurIcon
                        name="arrow-left"
                        className="ltr:block rtl:hidden"
                      />
                      {/* RTL */}
                      <OurIcon
                        name="arrow-right"
                        className="ltr:hidden rtl:block"
                      />
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
                      <OurIcon
                        name="arrow-right"
                        className="ltr:block rtl:hidden"
                      />
                      {/* RTL */}
                      <OurIcon
                        name="arrow-left"
                        className="ltr:hidden rtl:block"
                      />
                    </Button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile navigation */}
            {canScroll && (
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
            )}
          </>
        )}

        <div className="flex justify-center">
          <Button
            type="button"
            render={
              <Link
                href={`/${locale}/works${industry ? `?industry=${industry}` : ''}`}
              />
            }
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
