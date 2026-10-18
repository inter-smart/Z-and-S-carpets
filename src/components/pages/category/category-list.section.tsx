'use client'

import FilterDropdown from '@/components/common/filter.dropdown'
import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import type {
  CategoryBadge,
  CategoryItem,
  CategoryListData,
} from '@/types/category'
import { CircleCheckIcon, Loader2Icon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

interface CategoryListSectionProps {
  // badges the active categories use, for the filter
  filters: CategoryBadge[]
  // first page of the unfiltered list (loaded on the server)
  initialCategories: CategoryItem[]
  initialHasMore: boolean
}

export default function CategoryListSection({
  filters,
  initialCategories,
  initialHasMore,
}: CategoryListSectionProps) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('CategoryPage.CategoryListSection')
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  const [selectedBadge, setSelectedBadge] = useState<null | string>(null)
  const [categories, setCategories] = useState(initialCategories)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState(false)

  // only the latest request may update the list (filter clicks can overlap)
  const requestId = useRef(0)

  const fetchPage = async (badge: null | string, nextPage: number) => {
    const id = ++requestId.current
    setIsLoading(true)
    setLoadError(false)

    try {
      const query = new URLSearchParams({ page: String(nextPage) })
      if (badge) query.set('badge', badge)
      const res = await fetch(`/api/categories?${query}`)
      if (!res.ok) throw new Error('Request failed')
      const data = (await res.json()) as CategoryListData
      if (id !== requestId.current) return

      setCategories((current) =>
        nextPage === 1 ? data.categories : [...current, ...data.categories],
      )
      setPage(nextPage)
      setHasMore(data.pagination.hasMore)
    } catch {
      if (id === requestId.current) setLoadError(true)
    } finally {
      if (id === requestId.current) setIsLoading(false)
    }
  }

  const changeBadge = (badge: null | string) => {
    if (badge === selectedBadge) return
    setSelectedBadge(badge)
    // back to "all": the server-rendered first page is still what the API returns
    fetchPage(badge, 1)
  }

  return (
    <section className="container-wrapper pt-5 pb-10 lg:pt-10 lg:pb-20">
      {/* header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6 xl:items-center">
        <h2 className="our-heading">{t('title')}</h2>
        {filters.length > 0 && (
          <FilterDropdown
            filterLabel={t('filterLabel')}
            allLabel={t('all')}
            options={filters.map((item) => ({
              value: item.slug,
              label: pick(item.title, item.title_ar),
            }))}
            value={selectedBadge}
            onValueChange={changeBadge}
          />
        )}
      </div>

      <div
        className="mt-10 space-y-3 lg:mt-15 lg:space-y-5"
        aria-label="Flooring categories"
        aria-busy={isLoading}
      >
        {categories.map((item) => {
          const title = pick(item.title, item.title_ar)
          const description = pick(item.description, item.description_ar)

          return (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-md border border-[#D9D9D9] bg-white md:flex-row"
            >
              <div className="relative h-50 w-full shrink-0 md:h-auto md:w-50 lg:w-70 xl:w-80">
                {item.media.path && (
                  <Image
                    src={item.media.path}
                    alt={pick(item.media.alt, item.media.alt_ar) || title}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="h-full w-full rounded-md object-cover"
                  />
                )}
                {item.badge && (
                  <span className="absolute top-2 right-3 rounded-xs bg-white px-1.5 py-0.5 text-xs font-medium text-black uppercase">
                    {pick(item.badge.title, item.badge.title_ar)}
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-center gap-3 px-3 py-5 md:px-7 md:py-5 xl:px-12 xl:py-7">
                <h2 className="ltr:font-nobile rtl:font-cairo text-5xl font-medium">
                  {title}
                </h2>
                {description && (
                  <div
                    className="text-base"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                )}
                {item.highlights.length > 0 && (
                  <ul
                    className="flex flex-wrap gap-x-6 gap-y-1"
                    aria-label={`${title} features`}
                  >
                    {item.highlights.map((feature) => (
                      <li
                        key={feature.id}
                        className="flex items-center gap-2 text-base font-medium"
                      >
                        <CircleCheckIcon
                          fill="#4BAE4F"
                          size={20}
                          className="text-white"
                        />
                        {pick(feature.title, feature.title_ar)}
                      </li>
                    ))}
                  </ul>
                )}
                <Button
                  type="button"
                  nativeButton={false}
                  render={
                    <Link href={`/${locale}/products?category=${item.slug}`} />
                  }
                  className="border-our-purple our-btn hover:bg-our-purple w-fit border bg-transparent text-black transition-colors hover:text-white"
                >
                  {t('button')}
                </Button>
              </div>
            </article>
          )
        })}
      </div>

      {!isLoading && !loadError && categories.length === 0 && (
        <p className="mt-10 text-center text-lg">{t('noCategories')}</p>
      )}

      {isLoading && categories.length === 0 && (
        <div className="mt-10 flex justify-center" role="status">
          <Loader2Icon className="text-our-blue size-8 animate-spin" />
        </div>
      )}

      {loadError && (
        <p role="alert" className="mt-6 text-center text-red-600">
          {t('loadError')}
        </p>
      )}

      {hasMore && categories.length > 0 && (
        <div className="mt-12 flex w-full justify-center lg:mt-20">
          <Button
            variant={'outline'}
            disabled={isLoading}
            onClick={() => fetchPage(selectedBadge, page + 1)}
            className="border-our-blue our-btn hover:bg-transparent"
          >
            {isLoading && <Loader2Icon className="animate-spin" />}
            {t('loadMore')}
          </Button>
        </div>
      )}
    </section>
  )
}
