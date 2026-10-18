'use client'

import BlogItemCard from '@/components/common/blog-item.card'
import FilterDropdown from '@/components/common/filter.dropdown'
import AdBanner from '@/components/pages/common/ad.banner'
import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import { buildBlogQuery, pickLocalized, type BlogSort } from '@/lib/blogs'
import type { BlogAd, BlogCard, BlogListData, BlogOption } from '@/types/blog'
import { Loader2Icon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

interface BlogListSectionProps {
  // heading from the CMS; the translation is the fallback
  heading?: { title: string; title_ar: string }
  // options of the filters (only categories / tags that published posts use)
  categories: BlogOption[]
  tags: BlogOption[]
  ads: BlogAd[]
  // selected filters (from ?category= ?tag= ?sort=)
  activeCategories: string[]
  activeTags: string[]
  sort: BlogSort
  // how many pages the first load already contains (from ?page=)
  initialPage: number
  // the first `initialPage` pages of the list (loaded on the server)
  initialBlogs: BlogCard[]
  initialHasMore: boolean
}

export default function BlogListSection({
  heading,
  categories,
  tags,
  ads,
  activeCategories,
  activeTags,
  sort,
  initialPage,
  initialBlogs,
  initialHasMore,
}: BlogListSectionProps) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('BlogsPage.BlogListSection')

  const pathname = usePathname()
  const router = useRouter()
  const [isFiltering, startTransition] = useTransition()

  const [blogs, setBlogs] = useState(initialBlogs)
  const [page, setPage] = useState(initialPage)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [loadError, setLoadError] = useState(false)

  // A new filter selection brings a freshly rendered list from the server: start from it again
  // (dropping the pages loaded with Load More). The component stays mounted.
  const filterKey = buildBlogQuery(
    activeCategories,
    activeTags,
    sort,
  ).toString()
  const [loadedFilterKey, setLoadedFilterKey] = useState(filterKey)
  if (loadedFilterKey !== filterKey) {
    setLoadedFilterKey(filterKey)
    setBlogs(initialBlogs)
    setPage(initialPage)
    setHasMore(initialHasMore)
    setLoadError(false)
  }

  // The filters live in the URL: the server renders the new list (and a refresh / shared link /
  // back button gives the same view). Changing a filter starts again from the first page.
  const applyFilters = (
    nextCategories: string[],
    nextTags: string[],
    nextSort: BlogSort,
  ) => {
    const query = buildBlogQuery(nextCategories, nextTags, nextSort)
      .toString()
      .replace(/%2C/gi, ',')
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    })
  }

  const loadMore = async () => {
    if (isLoadingMore) return
    const nextPage = page + 1
    setIsLoadingMore(true)
    setLoadError(false)

    try {
      const query = buildBlogQuery(activeCategories, activeTags, sort)
      query.set('page', String(nextPage))
      const res = await fetch(`/api/blogs?${query}`)
      if (!res.ok) throw new Error('Request failed')
      const data = (await res.json()) as BlogListData

      setBlogs((current) => [...current, ...data.blogs])
      setPage(nextPage)
      setHasMore(data.pagination.hasMore)

      const url = new URL(window.location.href)
      url.searchParams.set('page', String(nextPage))
      window.history.replaceState(null, '', url)
    } catch {
      setLoadError(true)
    } finally {
      setIsLoadingMore(false)
    }
  }

  const options = (items: BlogOption[]) =>
    items.map((item) => ({
      value: item.slug,
      label: pickLocalized(locale, item.title, item.title_ar),
    }))

  const sortOptions = [{ value: 'oldest', label: t('oldest') }]

  const firstGroup = blogs.slice(0, 4)
  const secondGroup = blogs.slice(4, 8)
  const thirdGroup = blogs.slice(8)

  return (
    <div className="container-wrapper pt-5 pb-10 lg:pt-10 lg:pb-20">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="our-heading">
          {(heading &&
            pickLocalized(locale, heading.title, heading.title_ar)) ||
            t('title')}
        </h1>
        <div className="flex flex-wrap gap-2">
          {categories.length > 0 && (
            <FilterDropdown
              filterLabel={t('filters.category.label')}
              allLabel={t('all')}
              options={options(categories)}
              value={activeCategories[0] ?? null}
              onValueChange={(value) =>
                applyFilters(value ? [value] : [], activeTags, sort)
              }
            />
          )}
          <FilterDropdown
            filterLabel={t('filters.blogs.label')}
            allLabel={t('latest')}
            options={sortOptions}
            value={sort === 'oldest' ? 'oldest' : null}
            onValueChange={(value) =>
              applyFilters(
                activeCategories,
                activeTags,
                value === 'oldest' ? 'oldest' : 'latest',
              )
            }
          />
          {tags.length > 0 && (
            <FilterDropdown
              filterLabel={t('filters.tags.label')}
              allLabel={t('all')}
              options={options(tags)}
              value={activeTags[0] ?? null}
              onValueChange={(value) =>
                applyFilters(activeCategories, value ? [value] : [], sort)
              }
            />
          )}
        </div>
      </header>

      <div
        aria-busy={isFiltering || isLoadingMore}
        className={isFiltering ? 'opacity-50 transition-opacity' : ''}
      >
        {blogs.length === 0 ? (
          <p className="mt-16 text-center text-lg">{t('noPosts')}</p>
        ) : (
          <>
            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {firstGroup.map((article) => (
                <BlogItemCard key={article.slug} article={article} />
              ))}
            </div>

            {ads[0] && <AdBanner ad={ads[0]} />}

            {secondGroup.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {secondGroup.map((article) => (
                  <BlogItemCard key={article.slug} article={article} />
                ))}
              </div>
            )}

            {secondGroup.length > 0 && ads[1] && <AdBanner ad={ads[1]} />}

            {thirdGroup.length > 0 && (
              <div className="grid gap-4 md:grid-cols-2">
                {thirdGroup.map((article) => (
                  <BlogItemCard key={article.slug} article={article} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {isFiltering && (
        <div className="mt-6 flex justify-center" role="status">
          <Loader2Icon className="text-our-blue size-8 animate-spin" />
        </div>
      )}

      {loadError && (
        <p role="alert" className="mt-6 text-center text-red-600">
          {t('loadError')}
        </p>
      )}

      {hasMore && (
        <div className="mt-10 flex w-full justify-center">
          <Button
            variant={'outline'}
            disabled={isLoadingMore}
            onClick={loadMore}
            className="border-our-blue our-btn"
          >
            {isLoadingMore && <Loader2Icon className="animate-spin" />}
            {t('loadMore')}
          </Button>
        </div>
      )}
    </div>
  )
}
