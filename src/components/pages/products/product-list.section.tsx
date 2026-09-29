'use client'

import ProductItemCard from '@/components/common/product-item.card'
import FAQSection from '@/components/pages/common/faq.section'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ProductItemType } from '@/types/product'
import { ChevronDownIcon, ChevronUpIcon, ListFilterIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import ProductsEmptySection from './products-empty.section'
import RelatedProductsSection from './related-products.section'

const visibleProductDefalutCount = 6

export default function ProductListSection() {
  const t = useTranslations('ProductsPage.ProductListSection')
  const t2 = useTranslations('Products')

  const filters = t.raw('filters') as {
    id: string
    label: string
    items: string[]
  }[]
  const products = t2.raw('Items') as ProductItemType[]

  const [visibleProductCount, setVisibleProductCount] = useState(
    visibleProductDefalutCount,
  )
  const [openFilter, setOpenFilter] = useState<string[]>(['Category'])
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({})

  const toggleFilter = (filterId: string, item: string) => {
    setVisibleProductCount(visibleProductDefalutCount)
    setSelectedFilters((prev) => {
      const current = prev[filterId] ?? []

      const updated = current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item]

      return {
        ...prev,
        [filterId]: updated,
      }
    })
  }

  const filteredProducts = products.filter((product) => {
    return Object.entries(selectedFilters).every(
      ([filterId, selectedValues]) => {
        if (!selectedValues.length) return true

        switch (filterId) {
          case 'category':
            return selectedValues.includes(product.category)

          case 'material':
            return selectedValues.includes(product.material)

          case 'color':
            return selectedValues.includes(product.color)

          case 'usage':
            return selectedValues.includes(product.usage)

          case 'tags':
            return selectedValues.some((tag) => product.tags.includes(tag))

          default:
            return true
        }
      },
    )
  })

  return (
    <>
      <section className="container-wrapper flex">
        <div className="relative hidden h-fit w-60 bg-[#EFF9FE] md:block lg:w-70 2xl:w-80">
          <div className="absolute right-full h-full w-dvw bg-[#EFF9FE] rtl:right-auto rtl:left-full" />
          <aside className="pe-5 pt-5 pb-8">
            <h2 className="our-heading max-sm:text-2xl">Filter</h2>
            <div className="mt-4 space-y-2">
              {filters.map((filter) => (
                <div
                  key={filter.id}
                  className="rounded-sm border border-[#AAAAAA]/25 bg-white px-4"
                >
                  <button
                    type="button"
                    onClick={() =>
                      openFilter.includes(filter.id)
                        ? setOpenFilter((prev) =>
                            prev.filter((item) => item !== filter.id),
                          )
                        : setOpenFilter((prev) => [...prev, filter.id])
                    }
                    aria-expanded={openFilter.includes(filter.id)}
                    className="flex w-full items-center justify-between py-3 text-left text-[14px] focus:ring-0 focus:outline-none"
                  >
                    <span>{filter.label}</span>
                    <span aria-hidden="true">
                      {openFilter.includes(filter.id) ? (
                        <ChevronUpIcon className="stroke-1" size={15} />
                      ) : (
                        <ChevronDownIcon className="stroke-1" size={15} />
                      )}
                    </span>
                  </button>
                  {openFilter.includes(filter.id) && (
                    <div className="border-t border-black/15 py-3">
                      {filter.items.map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-3 py-2 text-[13px]"
                        >
                          <input
                            type="checkbox"
                            checked={
                              selectedFilters[filter.id]?.includes(item) ??
                              false
                            }
                            onChange={() => toggleFilter(filter.id, item)}
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

        {/* FILTER SIDEBAR */}
        <div className="relative flex-1 pt-4 pb-20 md:ps-4">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant={'outline'}
                  className="absolute -top-10 right-0 w-fit rounded-sm px-3 py-3.5 text-xs font-medium tracking-widest text-black uppercase hover:bg-transparent md:hidden rtl:right-auto rtl:left-0"
                >
                  <ListFilterIcon data-icon="inline-center" />
                  Filter
                </Button>
              }
            />
            <SheetContent
              side="left"
              className="inset-y-4! top-4! bottom-4! h-auto! w-[94%]! max-w-80! scrollbar-none overflow-y-scroll rounded-e-md bg-[#EFF9FE] pt-5 rtl:right-0! rtl:left-auto!"
            >
              <SheetHeader>
                <SheetTitle>
                  <p className="our-heading text-2xl">Filter</p>
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-2 px-6 pb-6">
                {filters.map((filter) => (
                  <div
                    key={filter.id}
                    className="rounded-sm border border-[#AAAAAA]/25 bg-white px-4"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        openFilter.includes(filter.id)
                          ? setOpenFilter((prev) =>
                              prev.filter((item) => item !== filter.id),
                            )
                          : setOpenFilter((prev) => [...prev, filter.id])
                      }
                      aria-expanded={openFilter.includes(filter.id)}
                      className="flex w-full items-center justify-between py-3 text-left text-[14px] focus:ring-0 focus:outline-none"
                    >
                      <span>{filter.label}</span>
                      <span aria-hidden="true">
                        {openFilter.includes(filter.id) ? (
                          <ChevronUpIcon className="stroke-1" size={15} />
                        ) : (
                          <ChevronDownIcon className="stroke-1" size={15} />
                        )}
                      </span>
                    </button>
                    {openFilter.includes(filter.id) && (
                      <div className="border-t border-black/15 py-3">
                        {filter.items.map((item) => (
                          <label
                            key={item}
                            className="flex items-center gap-3 py-2 text-[13px]"
                          >
                            <input
                              type="checkbox"
                              checked={
                                selectedFilters[filter.id]?.includes(item) ??
                                false
                              }
                              onChange={() => toggleFilter(filter.id, item)}
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
            </SheetContent>
          </Sheet>

          {filteredProducts.length ? (
            <div className="grid gap-4 sm:grid-cols-2 md:gap-2 lg:gap-5 xl:grid-cols-3">
              {filteredProducts.slice(0, visibleProductCount).map((product) => (
                <div key={product.name}>
                  <ProductItemCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <ProductsEmptySection />
          )}

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

      <div>
        {filteredProducts.length ? (
          <FAQSection className="bg-[#EFF9FE]" />
        ) : (
          <RelatedProductsSection />
        )}
      </div>
    </>
  )
}
