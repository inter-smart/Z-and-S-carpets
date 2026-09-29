'use client'

import FilterDropdown from '@/components/common/filter.dropdown'
import { Button } from '@/components/ui/button'
import type { ProductCategoryType } from '@/types/product'
import { CircleCheckIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function CategoryListSection() {
  const t = useTranslations('CategoryPage.CategoryListSection')
  const t2 = useTranslations('Products')

  const categories = t2.raw('Categories') as ProductCategoryType[]
  const filterValues = t.raw('filterValues') as string[]

  const [selectedFilter, setSelectedFilter] = useState<null | string>(null)

  const [visibleCount, setVisibleCount] = useState(6)
  const filteredCategories = !selectedFilter
    ? categories
    : categories.filter((item) => item.badge.toLowerCase() === selectedFilter)

  const visibleCategories = filteredCategories.slice(0, visibleCount)

  return (
    <section className="container-wrapper pt-5 pb-10 lg:pt-10 lg:pb-20">
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

      <div
        className="mt-10 space-y-3 lg:mt-15 lg:space-y-5"
        aria-label="Flooring categories"
      >
        {visibleCategories.map((item) => (
          <article
            key={item.name}
            className="flex flex-col overflow-hidden rounded-md border border-[#D9D9D9] bg-white md:flex-row"
          >
            <div className="relative h-50 w-full shrink-0 md:h-auto md:w-50 lg:w-70 xl:w-80">
              <Image
                src={item.image}
                alt={`${item.name} flooring`}
                fill
                className="h-full w-full rounded-md object-cover"
              />
              <span className="absolute top-2 right-3 rounded-xs bg-white px-2 py-0.5 text-[0.5rem] font-medium text-black">
                {item.badge}
              </span>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-3 px-3 py-5 md:px-7 md:py-5 xl:px-12 xl:py-7">
              <h2 className="text-2xl font-semibold">{item.name}</h2>
              <p className="our-text">{item.description}</p>
              <ul
                className="flex flex-wrap gap-x-6 gap-y-1"
                aria-label={`${item.name} features`}
              >
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="our-text flex items-center gap-2 text-sm font-medium"
                  >
                    <CircleCheckIcon
                      fill="#4BAE4F"
                      size={20}
                      className="text-white"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                type="button"
                nativeButton={false}
                render={<Link href={`/products`} />}
                className="hover:bg-our-purple border-our-purple our-btn w-fit border bg-transparent text-black transition-colors hover:text-white"
              >
                {t('button')}
              </Button>
            </div>
          </article>
        ))}
      </div>

      {visibleCount < filteredCategories.length && (
        <div className="mt-12 flex w-full justify-center lg:mt-20">
          <Button
            variant={'outline'}
            onClick={() => setVisibleCount(filteredCategories.length)}
            className="border-our-blue our-btn hover:bg-transparent"
          >
            {t('loadMore')}
          </Button>
        </div>
      )}
    </section>
  )
}
