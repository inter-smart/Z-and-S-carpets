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
            <div className="bg-primary/25 flex h-fit flex-wrap overflow-hidden rounded-md border border-white/10 backdrop-blur-lg lg:flex-col lg:gap-6 lg:overflow-visible lg:py-10">
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
                      'w-1/2 px-4 py-5 text-sm font-medium tracking-widest text-white transition-colors focus:ring-0 focus:outline-none sm:w-1/3 md:w-1/4 lg:w-full lg:min-w-0 ltr:text-left rtl:text-right',
                      active && 'bg-linear-to-t from-[#812990] to-[#812990]/0',
                    )}
                    aria-pressed={active}
                  >
                    {item.name}
                  </button>
                )
              })}
            </div>

            <div className="bg-primary/25 gap-6 rounded-md border border-white/10 px-4 py-6 backdrop-blur-lg lg:flex xl:px-8 xl:py-14">
              <div className="flex flex-1 flex-col-reverse gap-3 xl:flex-row xl:gap-6">
                {/* details */}
                <div className="text-primary-foreground flex w-full flex-col justify-evenly gap-3 xl:w-50 xl:gap-0 2xl:w-60">
                  <div className="">
                    <p className="ltr:font-nobile rtl:font-cairo hidden text-3xl font-semibold xl:block">
                      {category.name.charAt(0) +
                        category.name.slice(1).toLowerCase()}
                    </p>
                    <p className="text-primary-foreground mt-4 text-sm leading-6 xl:pe-5">
                      {category.description}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="w-fit rounded-md border-white bg-transparent px-6 py-4.5 text-xs font-semibold text-white hover:bg-white hover:text-[#073b68]"
                  >
                    {category.cta}
                  </Button>
                </div>

                {/* main image */}
                <div className="flex-1">
                  <p className="ltr:font-nobile rtl:font-cairo pb-3 text-3xl font-medium text-white xl:hidden">
                    {category.name.charAt(0) +
                      category.name.slice(1).toLowerCase()}
                  </p>
                  <div className="relative">
                    <Image
                      src={
                        productImgs[
                          activeProductData.image as keyof typeof productImgs
                        ]
                      }
                      alt={`${activeProductData.name} interior`}
                      className={cn(
                        'overflow-hidden rounded-md object-cover object-bottom transition-transform duration-700 ease-out',
                        'h-(--main-image-height)',
                      )}
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
              </div>

              {/* image stack container */}
              <div className="flex flex-row gap-1 max-lg:mt-6 lg:flex-col lg:gap-0 lg:max-xl:mt-10">
                {/* Left and up arrow */}
                <div
                  className={cn(
                    'flex flex-col items-center justify-center lg:justify-start',
                    'lg:h-(--image-stack-button-height)',
                  )}
                >
                  <Button
                    aria-label="Scroll up"
                    variant="ghost"
                    size="icon"
                    disabled={!isImgStackScrollable || imgStackScrollIsAtStart}
                    onClick={() => scrollProducts('up')}
                    className={cn(
                      'flex cursor-pointer hover:bg-transparent rtl:max-lg:hidden',
                      !isImgStackScrollable && 'invisible',
                    )}
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
                    className={cn(
                      'hidden cursor-pointer hover:bg-transparent rtl:flex rtl:lg:hidden',
                      !isImgStackScrollable && 'invisible',
                    )}
                  >
                    <Image
                      src={ArrowLeftIcon}
                      alt="arrow-right_and_down"
                      className="h-2.5 w-auto rotate-180 lg:-rotate-90"
                    />
                  </Button>
                </div>

                {/* image stack */}
                <div className="w-1 flex-1 lg:w-full lg:flex-none">
                  <div
                    className={cn(
                      'flex h-16 overflow-x-auto',
                      'scroll-smooth rounded [&::-webkit-scrollbar]:hidden',
                      // 'lg:block lg:w-20 lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto 2xl:w-30',
                      'gap-2 lg:w-20 lg:flex-col lg:gap-3 lg:overflow-x-hidden lg:overflow-y-auto 2xl:w-30',
                      'lg:h-(--image-stack-height)',
                    )}
                    ref={productsRef}
                  >
                    {category.products.map((product, index) => (
                      <button
                        key={product.name + index}
                        type="button"
                        onClick={() => setActiveProduct(index)}
                        className={cn(
                          'relative h-16 w-28 shrink-0 cursor-pointer overflow-hidden rounded-sm transition-all focus:ring-0 focus:outline-none lg:h-12 lg:w-full 2xl:h-16',
                        )}
                        aria-label={`Select ${product.name}`}
                        aria-pressed={activeProduct === index}
                      >
                        <div
                          className={cn(
                            'bg-primary/40 absolute inset-0 z-11 rounded-sm',
                            activeProduct === index
                              ? 'border border-white'
                              : 'border-transparent',
                          )}
                        />
                        <Image
                          src={
                            productImgs[
                              product.image as keyof typeof productImgs
                            ]
                          }
                          alt={product.name}
                          className="size-full object-cover object-bottom"
                        />
                        <span className="text-primary-foreground absolute inset-x-1 bottom-1 z-12 truncate text-xs font-medium">
                          {product.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right and Down arrow */}
                <div
                  className={cn(
                    'flex flex-col items-center justify-center lg:justify-end',
                    'lg:h-(--image-stack-button-height)',
                  )}
                >
                  <Button
                    aria-label="Scroll down"
                    variant="ghost"
                    size="icon"
                    disabled={!isImgStackScrollable || imgStackScrollIsAtEnd}
                    onClick={() => scrollProducts('down')}
                    className={cn(
                      'flex cursor-pointer hover:bg-transparent rtl:max-lg:hidden',
                      !isImgStackScrollable && 'invisible',
                    )}
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
                    className={cn(
                      'hidden cursor-pointer hover:bg-transparent rtl:flex rtl:lg:hidden',
                      !isImgStackScrollable && 'invisible',
                    )}
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
      </div>
    </section>
  )
}
