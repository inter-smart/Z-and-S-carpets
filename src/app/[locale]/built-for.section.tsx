'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons'
import {
  FloorImg11,
  FloorImg12,
  FloorImg2,
  FloorImg3,
  FloorImg7,
} from '@/assets/images'
import { Button } from '@/components/ui/button'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRef, useState } from 'react'

const productImgs = {
  'floor-2': FloorImg2,
  'floor-3': FloorImg3,
  'floor-7': FloorImg7,
  'floor-11': FloorImg11,
  'floor-12': FloorImg12,
}

export default function BuiltForSection() {
  const t = useTranslations('BuiltFor')
  const [activeCategory, setActiveCategory] = useState(0)
  const [activeProduct, setActiveProduct] = useState(0)
  const productsRef = useRef<HTMLDivElement>(null)

  const categories = t.raw('categories') as {
    name: string
    description: string
    cta: string
    feature: boolean
    image: string
    products: {
      name: string
      image: string
    }[]
  }[]

  const category = categories[activeCategory]
  const activeProductData = category.products[activeProduct]

  const scrollProducts = (direction: 'up' | 'down') => {
    productsRef.current?.scrollBy({
      top: direction === 'up' ? -200 : 200,
      left: direction === 'up' ? -200 : 200,
      behavior: 'smooth',
    })
  }

  return (
    <section className="bg-background container-wrapper py-16 lg:py-24">
      <div
        className="relative mx-auto overflow-hidden rounded-md bg-cover bg-bottom px-4 pt-18 pb-12 sm:px-8 lg:px-12"
        style={{ backgroundImage: `url(${FloorImg11.src})` }}
      >
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10">
          <h2 className="text-center text-4xl font-medium ltr:font-nobile rtl:font-cairo tracking-tight text-primary-foreground sm:text-5xl">
            {t('title')}
          </h2>

          <div className="mt-10 grid gap-5 lg:grid-cols-[160px_minmax(0,1fr)]">
            <div className="h-fit flex flex-wrap rounded-md bg-primary/25 backdrop-blur-lg border border-white/10 lg:flex-col gap-0 lg:overflow-visible">
              {categories.map((item, index) => {
                const active = activeCategory === index
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setActiveCategory(index)
                      setActiveProduct(0)
                    }}
                    className={cn(
                      'text-white w-1/2 sm:w-1/3 md:w-1/4 lg:w-full px-4 py-5 ltr:text-left rtl:text-right text-sm font-semibold tracking-widest transition-colors lg:min-w-0',
                      active && 'bg-linear-to-t from-[#812990] to-[#812990]/0',
                    )}
                    aria-pressed={active}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>

            <div className="rounded-md bg-primary/25 backdrop-blur-lg border border-white/10 p-5 sm:p-8 lg:flex lg:gap-6">
              <div className="xl:w-5/6 flex flex-col-reverse xl:flex-row">
                {/* details */}
                <div className="flex flex-col justify-center py-4 text-primary-foreground">
                  <p className="hidden xl:block text-3xl font-medium ltr:font-nobile rtl:font-cairo">
                    {category.name.charAt(0) +
                      category.name.slice(1).toLowerCase()}
                  </p>
                  <p className="mt-4 xl:pr-5 text-sm leading-6 text-primary-foreground/80">
                    {category.description}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8 w-fit border-white/50 bg-transparent text-white hover:bg-white hover:text-[#073b68] px-10 py-4.5 rounded-md"
                  >
                    {category.cta}
                  </Button>
                </div>

                {/* main image */}
                <div className="relative mt-6 aspect-[1.45] overflow-hidden rounded-md lg:mt-0">
                  <p className="text-white xl:hidden text-3xl font-medium ltr:font-nobile rtl:font-cairo">
                    {category.name.charAt(0) +
                      category.name.slice(1).toLowerCase()}
                  </p>
                  <Image
                    // src={activeProductData?.image || category.image}
                    src={
                      productImgs[
                        activeProductData.image as keyof typeof productImgs
                      ]
                    }
                    // alt={`${activeProductData?.name || category.feature} interior`}
                    alt={`${activeProductData.name} interior`}
                    className="max-xl:mt-4 size-full object-cover object-bottom transition-transform duration-700 ease-out h-full rounded-md"
                  />
                  <div className="absolute inset-x-6 bottom-6 text-2xl sm:text-4xl md:text-5xl font-light tracking-wider text-primary-foreground [text-shadow:0_2px_8px_oklch(0_0_0/60%)]">
                    {/* {activeProductData?.name || category.feature} */}
                    {activeProductData.name}
                  </div>
                </div>
              </div>

              {/* image stack */}
              <div className="xl:w-1/6 flex flex-row lg:flex-col lg:max-xl:mt-4">
                {/* Left and Up arrow */}
                <button
                  type="button"
                  onClick={() => scrollProducts('up')}
                  className="my-auto lg:mx-auto cursor-pointer p-2 text-white rotate-180 lg:-rotate-90"
                  aria-label="Scroll up"
                >
                  <Image
                    src={ArrowRightIcon}
                    alt="arrow-left_and_up"
                    className="w-auto h-2.5"
                  />
                </button>
                {/* ********* h-80 */}
                <div
                  // className="
                  //   mt-6
                  //   flex
                  //   gap-3
                  //   overflow-x-auto
                  //   scroll-smooth

                  //   lg:mt-0
                  //   lg:flex-col
                  //   lg:justify-center
                  //   lg:max-h-100
                  //   lg:overflow-x-hidden
                  //   lg:overflow-y-auto

                  //   [&::-webkit-scrollbar]:hidden
                  //   lg:[&::-webkit-scrollbar]:block
                  //   lg:[&::-webkit-scrollbar]:w-1.5
                  //   lg:[&::-webkit-scrollbar-track]:bg-primary/50
                  //   lg:[&::-webkit-scrollbar-thumb]:rounded-full
                  //   lg:[&::-webkit-scrollbar-thumb]:bg-primary-foreground/40
                  // "
                  // className="h-80 overflow-y-auto [&::-webkit-scrollbar]:hidden"
                  className={cn(
                    'scroll-smooth rounded [&::-webkit-scrollbar]:hidden',
                    'mt-6 flex-1 flex gap-2 h-20 w-40 overflow-x-auto',
                    'lg:mt-0 lg:flex-none lg:block lg:h-80 lg:w-30 lg:overflow-x-hidden lg:overflow-y-auto',
                  )}
                  ref={productsRef}
                >
                  {category.products.map((product, index) => (
                    <button
                      key={product.name + index}
                      type="button"
                      onClick={() => setActiveProduct(index)}
                      className={cn(
                        'relative h-16 min-w-28 overflow-hidden rounded border-2 transition-all lg:h-1/5 lg:w-full lg:min-w-0 cursor-pointer',
                        activeProduct === index
                          ? 'border-2 border-white'
                          : 'border-transparent opacity-80',
                      )}
                      aria-label={`Select ${product.name}`}
                      aria-pressed={activeProduct === index}
                    >
                      <Image
                        src={
                          productImgs[product.image as keyof typeof productImgs]
                        }
                        alt=""
                        className="size-full object-cover object-bottom"
                      />
                      <span className="absolute inset-x-1 bottom-1 truncate text-[10px] font-medium text-primary-foreground [text-shadow:0_1px_3px_oklch(0_0_0/90%)]">
                        {product.name}
                      </span>
                    </button>
                  ))}
                </div>
                {/* Right and Down arrow */}
                <button
                  type="button"
                  onClick={() => scrollProducts('down')}
                  className="my-auto lg:mx-auto cursor-pointer p-2 text-white rotate-180 lg:-rotate-90"
                  aria-label="Scroll down"
                >
                  <Image
                    src={ArrowLeftIcon}
                    alt="arrow-right_and_down"
                    className="w-auto h-2.5"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
