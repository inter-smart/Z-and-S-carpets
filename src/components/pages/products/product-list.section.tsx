'use client'

import { Button } from '@/components/ui/button'
import { ProductCategoryType, ProductItemType } from '@/types/product'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

export default function ProductListSection() {
  const t = useTranslations('ProductsPage.ProductListSection')
  const t2 = useTranslations('Products')

  const productCategories = t2.raw('Categories') as ProductCategoryType[]
  const filters = t.raw('filters') as string[]
  const products = t2.raw('Items') as ProductItemType[]

  const [selectedCategory, setSelectedCategory] = useState('Vinyl Flooring')
  const [visibleCount, setVisibleCount] = useState(6)
  const [openFilter, setOpenFilter] = useState('Category')

  return (
    <section className="container-wrapper flex">
      <div className="relative h-fit w-80 bg-[#EFF9FE]">
        <div className="absolute right-full h-full w-dvw bg-[#EFF9FE]" />
        <aside className="pe-5 pt-5 pb-5">
          <h2 className="our-heading">Filter</h2>
          <div className="mt-4 space-y-2">
            {filters.map((filter) => (
              <div key={filter} className="rounded-sm border bg-white">
                <button
                  type="button"
                  onClick={() =>
                    setOpenFilter(openFilter === filter ? '' : filter)
                  }
                  aria-expanded={openFilter === filter}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-[14px]"
                >
                  <span>{filter}</span>
                  <span aria-hidden="true">
                    {openFilter === filter ? '⌃' : '⌄'}
                  </span>
                </button>
                {openFilter === filter && filter === 'Category' && (
                  <div className="border-t border-[#d8d8d8] px-4 py-3">
                    {productCategories.map((category) => (
                      <label
                        key={category.id}
                        className="flex items-center gap-3 py-2 text-[13px]"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategory === category.id}
                          onChange={() => setSelectedCategory(category.id)}
                          className="accent-[#0572b9]"
                        />
                        {category.name}
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
          {products.slice(0, visibleCount).map((product) => (
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
        {visibleCount < products.length && (
          <div className="mt-12 flex w-full justify-center lg:mt-20">
            <Button
              variant={'outline'}
              onClick={() => setVisibleCount(products.length)}
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
