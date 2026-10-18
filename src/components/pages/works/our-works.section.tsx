'use client'

import WorkItemCard from '@/components/common/work-item.card'
import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import { WORKS_PAGE_LIMIT, pickLocalized, toWorkCard } from '@/lib/works'
import type {
  WorkCategoryType,
  WorkFilterIndustry,
  WorkListData,
  WorkProject,
} from '@/types/work'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'

interface OurWorksSectionProps {
  industries: WorkFilterIndustry[]
  activeIndustry: string
  initialProjects: WorkProject[]
  initialHasMore: boolean
  // heading from the CMS (both languages); the translation is the fallback
  title?: { title: string; title_ar: string }
}

export default function OurWorksSection({
  industries,
  activeIndustry,
  initialProjects,
  initialHasMore,
  title,
}: OurWorksSectionProps) {
  const locale = useLocale() as LocaleType

  const t = useTranslations('WorksPage.OurWorks')
  const t2 = useTranslations('Works')

  const allLabel =
    (t2.raw('Categories') as WorkCategoryType[]).find((c) => c.id === 'all')
      ?.label ?? 'All'

  // first page comes from the server; further pages are appended from the cached /api/works route
  const [projects, setProjects] = useState(initialProjects)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [loadError, setLoadError] = useState(false)

  const loadMore = async () => {
    if (isLoadingMore) return
    setIsLoadingMore(true)
    setLoadError(false)

    try {
      const query = new URLSearchParams({
        page: String(page + 1),
        limit: String(WORKS_PAGE_LIMIT),
      })
      if (activeIndustry) query.set('industry', activeIndustry)

      const response = await fetch(`/api/works?${query}`)
      if (!response.ok) throw new Error('Failed to load projects')
      const data = (await response.json()) as WorkListData

      setProjects((current) => {
        const known = new Set(current.map((item) => item.slug))
        return [...current, ...data.projects.filter((p) => !known.has(p.slug))]
      })
      setPage(data.pagination.page)
      setHasMore(data.pagination.hasMore)
    } catch {
      setLoadError(true)
    } finally {
      setIsLoadingMore(false)
    }
  }

  const chips = [
    { slug: '', label: allLabel },
    ...industries.map((item) => ({
      slug: item.slug,
      label: pickLocalized(locale, item.title, item.title_ar),
    })),
  ]

  return (
    <section className="container-wrapper pt-8 pb-12 lg:pt-12 lg:pb-18">
      <h2 id="projects-title" className="our-heading text-center">
        {(title && pickLocalized(locale, title.title, title.title_ar)) ||
          t('title')}
      </h2>

      {industries.length > 0 && (
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {chips.map((item) => (
            <Button
              key={item.slug || 'all'}
              variant="outline"
              nativeButton={false}
              render={
                <Link
                  href={
                    item.slug
                      ? `/${locale}/works?industry=${item.slug}`
                      : `/${locale}/works`
                  }
                  scroll={false}
                />
              }
              className={cn(
                'hover:border-our-blue hover:text-our-blue our-btn font-semibold! uppercase transition-colors',
                activeIndustry === item.slug
                  ? 'border-our-blue! text-our-blue!'
                  : 'border-[#CDCDCD]!',
              )}
            >
              {item.label}
            </Button>
          ))}
        </div>
      )}

      {/* WorkItemCards */}
      {projects.length === 0 ? (
        <p
          role="status"
          className="text-muted-foreground mt-12 text-center text-lg"
        >
          {t2('noProjectsFound')}
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <div key={project.slug} className="h-60 md:h-70">
              <WorkItemCard
                project={toWorkCard(project, locale, t2('viewProjectLabel'))}
                hasViewProductsBtn
                priority={index < 2}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-12 flex w-full justify-center">
          <Button
            variant="outline"
            className="our-btn border-our-blue"
            onClick={loadMore}
            disabled={isLoadingMore}
          >
            {t('loadMoreBtnLable')}
          </Button>
        </div>
      )}
      {loadError && (
        <p className="mt-3 text-center text-sm text-red-600">
          Couldn&apos;t load more projects. Please try again.
        </p>
      )}
    </section>
  )
}
