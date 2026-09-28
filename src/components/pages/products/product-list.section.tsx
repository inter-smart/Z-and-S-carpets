'use client'

import ProductItemCard from '@/components/common/product-item.card'
import { Button } from '@/components/ui/button'
import { ProductItemType } from '@/types/product'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const visibleProductDefalutCount = 6

export default function ProductListSection() {
  const t = useTranslations('ProductsPage.ProductListSection')
  const t2 = useTranslations('Products')

  const filters = t.raw('filters') as { label: string; items: string[] }[]
  const products = t2.raw('Items') as ProductItemType[]

  const [visibleProductCount, setVisibleProductCount] = useState(
    visibleProductDefalutCount,
  )
  const [openFilter, setOpenFilter] = useState<string[]>(['Category'])
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({})

  const toggleFilter = (filterLabel: string, item: string) => {
    setVisibleProductCount(visibleProductDefalutCount)
    setSelectedFilters((prev) => {
      const current = prev[filterLabel] ?? []

      const updated = current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item]

      return {
        ...prev,
        [filterLabel]: updated,
      }
    })
  }

  const filteredProducts = products.filter((product) => {
    return Object.entries(selectedFilters).every(
      ([filterLabel, selectedValues]) => {
        if (selectedValues.length === 0) return true

        switch (filterLabel) {
          case 'Category':
            return selectedValues.includes(product.category)

          case 'Material':
            return selectedValues.includes(product.material)

          case 'Color':
            return selectedValues.includes(product.color)

          case 'Usage':
            return selectedValues.includes(product.usage)

          case 'Tags':
            return selectedValues.some((tag) => product.tags.includes(tag))

          default:
            return true
        }
      },
    )
  })

  return (
    <section className="container-wrapper flex">
      <div className="relative hidden h-fit w-60 bg-[#EFF9FE] md:block lg:w-70 2xl:w-80">
        <div className="absolute right-full h-full w-dvw bg-[#EFF9FE]" />
        <aside className="pe-5 pt-5 pb-8">
          <h2 className="our-heading max-sm:text-2xl">Filter</h2>
          <div className="mt-4 space-y-2">
            {filters.map((filter) => (
              <div
                key={filter.label}
                className="rounded-sm border border-[#AAAAAA]/25 bg-white px-4"
              >
                <button
                  type="button"
                  onClick={() =>
                    openFilter.includes(filter.label)
                      ? setOpenFilter((prev) =>
                          prev.filter((item) => item !== filter.label),
                        )
                      : setOpenFilter((prev) => [...prev, filter.label])
                  }
                  aria-expanded={openFilter.includes(filter.label)}
                  className="flex w-full items-center justify-between py-3 text-left text-[14px] focus:ring-0 focus:outline-none"
                >
                  <span>{filter.label}</span>
                  <span aria-hidden="true">
                    {openFilter.includes(filter.label) ? (
                      <ChevronUpIcon className="stroke-1" size={15} />
                    ) : (
                      <ChevronDownIcon className="stroke-1" size={15} />
                    )}
                  </span>
                </button>
                {openFilter.includes(filter.label) && (
                  <div className="border-t border-black/15 py-3">
                    {filter.items.map((item) => (
                      <label
                        key={item}
                        className="flex items-center gap-3 py-2 text-[13px]"
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedFilters[filter.label]?.includes(item) ??
                            false
                          }
                          onChange={() => toggleFilter(filter.label, item)}
                          className="accent-our-blue size-3.5"
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </aside>
      </div>
      <div className="flex-1 pt-4 pb-20 md:ps-4">
        <div className="grid gap-4 sm:grid-cols-2 md:gap-2 lg:gap-5 xl:grid-cols-3">
          {filteredProducts.slice(0, visibleProductCount).map((product) => (
            <div key={product.name}>
              <ProductItemCard product={product} />
            </div>
          ))}
        </div>
        {visibleProductCount < filteredProducts.length && (
          <div className="mt-12 flex w-full justify-center lg:mt-20">
            <Button
              variant={'outline'}
              onClick={() => setVisibleProductCount(filteredProducts.length)}
              className="border-our-blue our-btn hover:bg-transparent"
            >
              {t('loadMore')}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
