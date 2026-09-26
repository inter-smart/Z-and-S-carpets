'use client'

import BlogItemCard from '@/components/common/blog-item.card'
import FilterDropdown from '@/components/common/filter.dropdown'
import { AdBanner1, AdBanner2 } from '@/components/pages/common/ad.banner'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function BlogListSection() {
  const t = useTranslations('BlogsPage.BlogListSection')
  const t2 = useTranslations('Blogs')

  const filters = t.raw('filters') as {
    category: {
      label: string
      values: string
    }
    blogs: {
      label: string
      values: string
    }
    tags: {
      label: string
      values: string
    }
  }
  const data = t2.raw('Items')

  const extraData = [
    {
      ...data[0],
      image: '/images/floor-img-46.webp',
    },
    {
      ...data[1],
      image: '/images/floor-img-44.webp',
    },
    {
      ...data[2],
      image: '/images/floor-img-50.webp',
    },
    {
      ...data[3],
      image: '/images/floor-img-45.webp',
    },
    {
      ...data[2],
      id: 'office',
      image: '/images/floor-img-41.webp',
    },
    {
      ...data[3],
      id: 'rolling',
      image: '/images/floor-img-43.webp',
    },
  ]

  //  const articles = [...data.articles, ...extra]
  const articles = [...data, ...extraData]

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<
    null | string
  >(null)
  const [selectedBlogsFilter, setSelectedBlogsFilter] = useState<null | string>(
    null,
  )
  const [selectedTagsFilter, setSelectedTagsFilter] = useState<null | string>(
    null,
  )

  return (
    <div className="container-wrapper pt-5 pb-10 lg:pt-10 lg:pb-20">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="our-heading">{t('title')}</h1>
        <div className="flex flex-wrap gap-2">
          <FilterDropdown
            filterLabel={filters.category.label}
            filterValues={[null, ...filters.category.values]}
            value={selectedCategoryFilter}
            onValueChange={setSelectedCategoryFilter}
          />
          <FilterDropdown
            filterLabel={filters.blogs.label}
            filterValues={[null, ...filters.blogs.values]}
            value={selectedBlogsFilter}
            onValueChange={setSelectedBlogsFilter}
          />
          <FilterDropdown
            filterLabel={filters.tags.label}
            filterValues={[null, ...filters.tags.values]}
            value={selectedTagsFilter}
            onValueChange={setSelectedTagsFilter}
          />
        </div>
      </header>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        {articles.slice(0, 4).map((article) => (
          <BlogItemCard key={article.id} article={article} />
        ))}
      </div>

      <AdBanner1 />

      <div className="grid gap-4 md:grid-cols-2">
        {articles.slice(4, 8).map((article) => (
          <BlogItemCard key={article.id} article={article} />
        ))}
      </div>

      <AdBanner2 />

      <div className="grid gap-4 md:grid-cols-2">
        {articles.slice(8).map((article) => (
          <BlogItemCard key={article.id} article={article} />
        ))}
      </div>

      <div className="mt-10 flex w-full justify-center">
        <Button
          variant={'outline'}
          className="border-our-blue our-btn hover:bg-transparent"
        >
          {t('loadMore')}
        </Button>
      </div>
    </div>
  )
}
