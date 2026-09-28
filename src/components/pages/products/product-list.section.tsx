'use client'

import { Button } from '@/components/ui/button'
import { ProductItemType } from '@/types/product'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
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
      <div className="relative h-fit w-80 bg-[#EFF9FE]">
        <div className="absolute right-full h-full w-dvw bg-[#EFF9FE]" />
        <aside className="pe-5 pt-5 pb-8">
          <h2 className="our-heading">Filter</h2>
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
      <div className="flex-1 ps-4 pt-4 pb-20">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.slice(0, visibleProductCount).map((product) => (
            <article key={product.name} className="bg-white">
              <div className="relative h-45 overflow-hidden rounded-t-sm">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="h-full w-full object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 right-3 rounded bg-white px-2 py-0.5 text-[0.55rem]">
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="border-our-blue rounded-b-sm border border-t-0 p-3 pb-6">
                <p className="text-[0.6rem] uppercase">Vinyl Flooring</p>
                <h3 className="mt-1 text-sm font-semibold">{product.name}</h3>
                <p className="mt-2 line-clamp-3 text-xs text-[#222]">
                  {product.description}
                </p>
                <div className="mt-7 flex gap-2">
                  <Button
                    type="button"
                    variant={'outline'}
                    className="flex-1 rounded border border-black py-3 text-[9px] font-semibold hover:bg-[#f3f3f3]"
                  >
                    View Details
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 rounded bg-[#8b279c] py-3 text-[9px] font-semibold text-white hover:bg-[#702080]"
                  >
                    Add to Quote
                  </Button>
                </div>
              </div>
            </article>
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
