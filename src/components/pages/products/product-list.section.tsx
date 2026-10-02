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
import { ProductItemType, type ProductCategoryType } from '@/types/product'
import { ChevronDownIcon, ChevronUpIcon, ListFilterIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import ProductsEmptySection from './products-empty.section'
import RelatedProductsSection from './related-products.section'

const visibleProductDefalutCount = 6

export default function ProductListSection() {
  const searchParams = useSearchParams()
  const categoryId_query = searchParams.get('category')

  const t2 = useTranslations('Products')

  const products = t2.raw('Items') as ProductItemType[]

  const prodCategories = t2.raw('Categories') as ProductCategoryType[]
  const prodMaterials = t2.raw('Materials') as { id: string; name: string }[]
  const prodColors = t2.raw('Colors') as { id: string; name: string }[]
  const prodUsages = t2.raw('Usages') as { id: string; name: string }[]
  const prodTags = t2.raw('Tags') as { id: string; name: string }[]

  const categoryName_query = prodCategories.find(
    (item) => item.id === categoryId_query,
  )?.name

  const filters = [
    {
      id: 'category',
      label: 'Category',
      items: prodCategories,
    },
    {
      id: 'material',
      label: 'Material',
      items: prodMaterials,
    },
    {
      id: 'color',
      label: 'Color',
      items: prodColors,
    },
    {
      id: 'usage',
      label: 'Usage',
      items: prodUsages,
    },
    {
      id: 'tags',
      label: 'Tags',
      items: prodTags,
    },
  ]

  const [visibleProductCount, setVisibleProductCount] = useState(
    visibleProductDefalutCount,
  )
  const [openFilter, setOpenFilter] = useState<string[]>(['category'])
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >(categoryName_query ? { category: [categoryName_query ?? ''] } : {})

  const toggleFilter = (filterId: string, itemName: string) => {
    setVisibleProductCount(visibleProductDefalutCount)
    setSelectedFilters((prev) => {
      const current = prev[filterId] ?? []

      const updated = current.includes(itemName)
        ? current.filter((value) => value !== itemName)
        : [...current, itemName]

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
          <div className="absolute bottom-full -z-10 h-full w-dvw bg-[#EFF9FE] ltr:right-0 rtl:left-0" />
          <div className="absolute h-full w-dvw bg-[#EFF9FE] ltr:right-full rtl:left-full" />
          <aside className="pe-5 pt-5 pb-8">
            <h2 className="our-heading text-6xl!">Filter</h2>
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
                    className="flex w-full items-center justify-between py-3 text-left text-lg focus:ring-0 focus:outline-none"
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
                          key={item.id}
                          className="flex items-center gap-3 py-2 text-base"
                        >
                          <input
                            type="checkbox"
                            checked={
                              selectedFilters[filter.id]?.includes(item.name) ??
                              false
                            }
                            onChange={() => toggleFilter(filter.id, item.name)}
                            className="accent-our-blue size-3.5"
                          />
                          {item.name}
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
              className="inset-y-4! top-4! bottom-4! h-auto! w-[94%]! max-w-80! rounded-e-md bg-[#EFF9FE] pt-5 rtl:right-0! rtl:left-auto!"
            >
              <SheetHeader>
                <SheetTitle>
                  <p className="our-heading text-6xl!">Filter</p>
                </SheetTitle>
              </SheetHeader>
              <div className="min-h-0 flex-1 scrollbar-none space-y-2 overflow-y-auto overscroll-none px-6 pb-6">
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
                      className="flex w-full items-center justify-between py-3 text-left text-lg focus:ring-0 focus:outline-none"
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
                            key={item.id}
                            className="flex items-center gap-3 py-2 text-base"
                          >
                            <input
                              type="checkbox"
                              checked={
                                selectedFilters[filter.id]?.includes(
                                  item.name,
                                ) ?? false
                              }
                              onChange={() =>
                                toggleFilter(filter.id, item.name)
                              }
                              className="accent-our-blue size-3.5"
                            />
                            {item.name}
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
                Load More
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
