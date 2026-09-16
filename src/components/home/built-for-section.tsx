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
import { useEffect, useRef, useState } from 'react'

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

  const [imgStackScrollIsAtStart, setImgStackScrollIsAtStart] = useState(true)
  const [imgStackScrollIsAtEnd, setImgStackScrollIsAtEnd] = useState(false)
  const [isImgStackScrollable, setIsImgStackScrollable] = useState(false)

  const getNormalizedScrollLeft = (el: HTMLDivElement) => {
    const { scrollLeft } = el
    const direction = getComputedStyle(el).direction

    if (direction === 'rtl') {
      // RTL: scrollLeft is 0 at start, negative at end
      // Convert to positive distance from start
      return Math.abs(scrollLeft)
    }
    return scrollLeft
  }

  useEffect(() => {
    const container = productsRef.current
    if (!container) return

    const canScrollX = container.scrollWidth > container.clientWidth
    const canScrollY = container.scrollHeight > container.clientHeight

    setIsImgStackScrollable(canScrollX || canScrollY)

    const handleScroll = () => {
      if (canScrollX) {
        const scrollLeft = getNormalizedScrollLeft(container)
        const maxScroll = container.scrollWidth - container.clientWidth

        setImgStackScrollIsAtStart(scrollLeft <= 1)
        setImgStackScrollIsAtEnd(scrollLeft >= maxScroll - 1)
      }
      // vertical is unaffected by RTL
      if (canScrollY) {
        setImgStackScrollIsAtStart(container.scrollTop <= 1)
        setImgStackScrollIsAtEnd(
          container.scrollTop + container.clientHeight >=
            container.scrollHeight - 1,
        )
      }
    }

    // Use passive listener for better performance
    container.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup listener on unmount
    return () => {
      container.removeEventListener('scroll', handleScroll)
    }
  }, [activeCategory])

  return (
    <section className="bg-background container-wrapper py-16 lg:py-24">
      <div
        className="relative mx-auto overflow-hidden rounded-md bg-cover bg-bottom px-4 pt-18 pb-12 sm:px-8 lg:px-12"
        style={{ backgroundImage: `url(${FloorImg11.src})` }}
      >
        <div className="bg-primary/70 absolute inset-0" />
        <div className="relative z-10">
          <h2 className="section-title text-primary-foreground text-center">
            {t('title')}
          </h2>

          <div className="mt-10 grid gap-5 lg:grid-cols-[160px_minmax(0,1fr)]">
            <div className="bg-primary/25 flex h-fit flex-wrap rounded-md border border-white/10 backdrop-blur-lg lg:flex-col lg:gap-6 lg:overflow-visible lg:py-10">
              {categories.map((item, index) => {
                const active = activeCategory === index
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => {
                      setActiveCategory(index)
                      setImgStackScrollIsAtStart(true)
                      setActiveProduct(0)
                      productsRef.current?.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: 'smooth',
                      })
                    }}
                    className={cn(
                      'w-1/2 px-4 py-5 text-sm font-medium tracking-widest text-white transition-colors sm:w-1/3 md:w-1/4 lg:w-full lg:min-w-0 ltr:text-left rtl:text-right',
                      active && 'bg-linear-to-t from-[#812990] to-[#812990]/0',
                    )}
                    aria-pressed={active}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>

            <div className="bg-primary/25 rounded-md border border-white/10 p-5 backdrop-blur-lg sm:p-8 lg:flex lg:gap-6">
              <div className="flex flex-col-reverse xl:w-5/6 xl:flex-row">
                {/* details */}
                <div className="text-primary-foreground flex flex-col justify-center py-4 xl:w-4/12 2xl:w-3/12">
                  <p className="ltr:font-nobile rtl:font-cairo hidden text-3xl font-semibold xl:block">
                    {category.name.charAt(0) +
                      category.name.slice(1).toLowerCase()}
                  </p>
                  <p className="text-primary-foreground mt-4 text-sm leading-6 xl:pe-5">
                    {category.description}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8 w-fit rounded-md border-white bg-transparent px-6 py-4.5 text-xs font-semibold text-white hover:bg-white hover:text-[#073b68]"
                  >
                    {category.cta}
                  </Button>
                </div>

                {/* main image */}
                <div className="relative mt-6 overflow-hidden rounded-md min-[360px]:aspect-[1.45] lg:mt-0 xl:aspect-[3] xl:w-8/12 2xl:h-120 2xl:w-9/12">
                  <p className="ltr:font-nobile rtl:font-cairo text-3xl font-medium text-white xl:hidden">
                    {category.name.charAt(0) +
                      category.name.slice(1).toLowerCase()}
                  </p>
                  <Image
                    src={
                      productImgs[
                        activeProductData.image as keyof typeof productImgs
                      ]
                    }
                    alt={`${activeProductData.name} interior`}
                    className="size-full h-full rounded-md object-cover object-bottom transition-transform duration-700 ease-out max-xl:mt-4"
                  />
                  <p className="font-cairo absolute inset-x-3 bottom-3 text-3xl font-bold tracking-wider text-transparent uppercase [-webkit-text-stroke:1px_white] sm:inset-x-6 sm:bottom-6 sm:text-4xl md:text-5xl lg:inset-x-3 lg:bottom-3 xl:inset-x-6 xl:bottom-6 2xl:inset-x-10 2xl:bottom-10">
                    {activeProductData.name.split(' ').map((word, i) => (
                      <span key={i}>
                        {word}
                        <br />
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              {/* image stack container */}
              <div className="mt-3 flex flex-row gap-2 lg:flex-col xl:w-1/6">
                {/* Left and up arrow */}
                <Button
                  aria-label="Scroll up"
                  variant="ghost"
                  size="icon"
                  disabled={!isImgStackScrollable || imgStackScrollIsAtStart}
                  onClick={() => scrollProducts('up')}
                  className="my-auto hidden cursor-pointer hover:bg-transparent lg:mx-auto ltr:flex"
                >
                  <Image
                    src={ArrowRightIcon}
                    alt="arrow-left_and_up"
                    className="h-2.5 w-auto rotate-180 lg:-rotate-90"
                  />
                </Button>
                <Button
                  aria-label="Scroll down"
                  variant="ghost"
                  size="icon"
                  disabled={!isImgStackScrollable || imgStackScrollIsAtStart}
                  onClick={() => scrollProducts('down')}
                  className="my-auto hidden cursor-pointer hover:bg-transparent lg:mx-auto rtl:flex"
                >
                  <Image
                    src={ArrowLeftIcon}
                    alt="arrow-right_and_down"
                    className="h-2.5 w-auto rotate-180 lg:-rotate-90"
                  />
                </Button>
                {/* image stack */}
                <div
                  className={cn(
                    'mx-auto scroll-smooth rounded [&::-webkit-scrollbar]:hidden',
                    'flex w-40 flex-1 gap-2 overflow-x-auto',
                    'lg:block lg:h-80 lg:w-30 lg:flex-none lg:overflow-x-hidden lg:overflow-y-auto',
                  )}
                  ref={productsRef}
                >
                  {category.products.map((product, index) => (
                    <button
                      key={product.name + index}
                      type="button"
                      onClick={() => setActiveProduct(index)}
                      className={cn(
                        'relative h-16 min-w-28 cursor-pointer overflow-hidden rounded border-2 transition-all lg:h-1/5 lg:w-full lg:min-w-0',
                        activeProduct === index
                          ? 'border-2 border-white'
                          : 'border-transparent',
                      )}
                      aria-label={`Select ${product.name}`}
                      aria-pressed={activeProduct === index}
                    >
                      <div className="bg-primary/40 absolute inset-0 z-11 rounded"></div>
                      <Image
                        src={
                          productImgs[product.image as keyof typeof productImgs]
                        }
                        alt={product.name}
                        className="size-full object-cover object-bottom"
                      />
                      <span className="text-primary-foreground absolute inset-x-1 bottom-1 z-99 truncate text-xs font-medium [text-shadow:0_1px_3px_oklch(0_0_0/90%)]">
                        {product.name}
                      </span>
                    </button>
                  ))}
                </div>
                {/* Right and Down arrow */}
                <Button
                  aria-label="Scroll down"
                  variant="ghost"
                  size="icon"
                  disabled={!isImgStackScrollable || imgStackScrollIsAtEnd}
                  onClick={() => scrollProducts('down')}
                  className="my-auto hidden cursor-pointer hover:bg-transparent lg:mx-auto ltr:flex"
                >
                  <Image
                    src={ArrowLeftIcon}
                    alt="arrow-right_and_down"
                    className="h-2.5 w-auto rotate-180 lg:-rotate-90"
                  />
                </Button>
                <Button
                  aria-label="Scroll up"
                  variant="ghost"
                  size="icon"
                  disabled={!isImgStackScrollable || imgStackScrollIsAtEnd}
                  onClick={() => scrollProducts('up')}
                  className="my-auto hidden cursor-pointer hover:bg-transparent lg:mx-auto rtl:flex"
                >
                  <Image
                    src={ArrowRightIcon}
                    alt="arrow-left_and_up"
                    className="h-2.5 w-auto rotate-180 lg:-rotate-90"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
