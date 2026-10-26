'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import type { HomeData } from '@/types/home'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// The category stack shows its scroll arrows only when it has more than this many items
const STACK_ARROWS_MIN_ITEMS = 5

interface BuiltForSectionProps {
  industries: HomeData['industries_section']
}

export default function BuiltForSection({ industries }: BuiltForSectionProps) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('HomePage.BuiltForSection')
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''
  const [activeCategory, setActiveCategory] = useState(0)
  const [activeProduct, setActiveProduct] = useState(0)
  const productsRef = useRef<HTMLDivElement>(null)

  // left: industries, middle: the active industry (+ selected category image), right: its categories
  const categories = industries.list.map((item) => ({
    id: item.id,
    name: pick(item.title, item.title_ar),
    description: pick(item.description, item.description_ar),
    // already resolved server-side: null unless a CMS link is configured AND this
    // industry has at least one category to filter by
    button: item.button
      ? {
          label: pick(item.button.text, item.button.text_ar),
          href: item.button.link.startsWith('/')
            ? `/${locale}${item.button.link}`
            : item.button.link,
        }
      : null,
    products: item.categories.map((cat) => ({
      id: cat.id,
      name: pick(cat.title, cat.title_ar),
      image: cat.media.path,
      alt: pick(cat.media.alt, cat.media.alt_ar),
    })),
  }))

  const category = categories[activeCategory]
  const activeProductData = category.products[activeProduct] as
    (typeof category.products)[number] | undefined

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

  // arrows only make sense when there are more categories than fit comfortably
  const showStackArrows =
    isImgStackScrollable && category.products.length > STACK_ARROWS_MIN_ITEMS

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
        className="relative mx-auto overflow-hidden rounded-md px-4 pt-18 pb-12 sm:px-8 lg:px-12"
      >
        <Image
          src={industries.background.path || t('bgImage')}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-bottom"
        />
        <div className="bg-primary/70 absolute inset-0" />
        <div className="relative z-10">
          <h2 className="our-heading text-center text-white">
            {pick(industries.title, industries.title_ar) || t('title')}
          </h2>

          <div className="mt-10 grid gap-5 lg:grid-cols-[160px_minmax(0,1fr)]">
            <div className="bg-primary/25 flex h-fit flex-wrap overflow-hidden rounded-md border border-white/10 backdrop-blur-lg lg:flex-col lg:gap-6 lg:overflow-visible lg:py-10">
              {categories.map((item, index) => {
                const active = activeCategory === index
                return (
                  <button
                    key={item.id}
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
                      'flex w-1/2 cursor-pointer justify-center px-4 py-5 text-base font-medium tracking-widest text-white transition-colors focus:ring-0 focus:outline-none sm:w-1/3 md:w-1/4 lg:w-full lg:min-w-0 lg:justify-start ltr:text-left rtl:text-right',
                      active &&
                        'from-our-purple to-our-purple/0 bg-linear-to-t',
                    )}
                    aria-pressed={active}
                  >
                    {item.name.toUpperCase()}
                  </button>
                )
              })}
            </div>

            <div className="bg-primary/25 gap-6 rounded-md border border-white/10 px-4 py-6 backdrop-blur-lg lg:flex xl:px-8 xl:py-14">
              <div className="flex flex-1 flex-col-reverse gap-3 xl:flex-row xl:gap-6">
                {/* details */}
                <div className="text-primary-foreground flex w-full flex-col justify-evenly gap-3 xl:w-50 xl:gap-0 2xl:w-60">
                  <div className="">
                    <p className="ltr:font-nobile rtl:font-cairo hidden text-4xl font-semibold xl:block">
                      {category.name.charAt(0) +
                        category.name.slice(1).toLowerCase()}
                    </p>
                    <div
                      className="text-primary-foreground mt-4 text-base leading-6 xl:pe-5"
                      dangerouslySetInnerHTML={{ __html: category.description }}
                    />
                  </div>
                  {category.button && (
                    <Button
                      variant="outline"
                      className="our-btn w-fit border-white bg-transparent px-4! hover:bg-white/10 hover:text-white"
                      nativeButton={false}
                      render={<Link href={category.button.href} />}
                    >
                      {category.button.label}
                    </Button>
                  )}
                </div>

                {/* main image */}
                <div className="flex-1">
                  <p className="ltr:font-nobile rtl:font-cairo pb-3 text-4xl font-medium text-white xl:hidden">
                    {category.name.charAt(0) +
                      category.name.slice(1).toLowerCase()}
                  </p>
                  <div className="relative h-(--main-image-height) overflow-hidden rounded-md">
                    {activeProductData?.image && (
                      <Image
                        src={activeProductData.image}
                        alt={
                          activeProductData.alt ||
                          `${activeProductData.name} interior`
                        }
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-bottom transition-transform duration-700 ease-out"
                      />
                    )}
                    <p className="font-cairo absolute inset-x-3 bottom-3 text-6xl font-bold tracking-wider text-transparent uppercase [-webkit-text-stroke:1px_white] sm:inset-x-6 sm:bottom-6 sm:text-8xl lg:inset-x-3 lg:bottom-3 xl:inset-x-6 xl:bottom-6 2xl:inset-x-10 2xl:bottom-10">
                      {(activeProductData?.name ?? '')
                        .split(' ')
                        .map((word, i) => (
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
                    'flex flex-col items-center justify-center lg:h-(--image-stack-button-height) lg:justify-start',
                    !showStackArrows && 'hidden lg:invisible lg:flex',
                  )}
                >
                  <Button
                    aria-label="Scroll up"
                    variant="ghost"
                    size="icon"
                    disabled={!isImgStackScrollable || imgStackScrollIsAtStart}
                    onClick={() => scrollProducts('up')}
                    className="flex cursor-pointer text-white hover:bg-transparent hover:text-white focus-visible:border-transparent! focus-visible:ring-0! rtl:max-lg:hidden"
                  >
                    <OurIcon name="arrow-left" className="lg:rotate-90" />
                  </Button>
                  <Button
                    aria-label="Scroll down"
                    variant="ghost"
                    size="icon"
                    disabled={!isImgStackScrollable || imgStackScrollIsAtStart}
                    onClick={() => scrollProducts('down')}
                    className="hidden cursor-pointer text-white hover:bg-transparent hover:text-white focus-visible:border-transparent! focus-visible:ring-0! rtl:flex rtl:lg:hidden"
                  >
                    <OurIcon name="arrow-right" />
                  </Button>
                </div>

                {/* image stack */}
                <div className="w-1 flex-1 lg:w-full lg:flex-none">
                  <div
                    className={cn(
                      'flex h-16 scrollbar-none gap-2 overflow-x-auto scroll-smooth rounded-xs lg:w-20 lg:flex-col lg:gap-3 lg:overflow-x-hidden lg:overflow-y-auto 2xl:w-30',
                      'lg:h-(--image-stack-height)',
                    )}
                    ref={productsRef}
                  >
                    {category.products.map((product, index) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => setActiveProduct(index)}
                        className={cn(
                          'relative h-16 w-28 shrink-0 cursor-pointer overflow-hidden rounded-xs transition-all focus:ring-0 focus:outline-none lg:h-12 lg:w-full 2xl:h-16',
                        )}
                        aria-label={`Select ${product.name}`}
                        aria-pressed={activeProduct === index}
                      >
                        <div
                          className={cn(
                            'bg-primary/40 absolute inset-0 z-11 rounded-xs',
                            activeProduct === index
                              ? 'border border-white'
                              : 'border-transparent',
                          )}
                        />
                        {product.image && (
                          <Image
                            src={product.image}
                            alt={product.alt || product.name}
                            fill
                            sizes="112px"
                            className="size-full object-cover object-bottom"
                          />
                        )}
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
                    'flex flex-col items-center justify-center lg:h-(--image-stack-button-height) lg:justify-end',
                    !showStackArrows && 'hidden lg:invisible lg:flex',
                  )}
                >
                  <Button
                    aria-label="Scroll down"
                    variant="ghost"
                    size="icon"
                    disabled={!isImgStackScrollable || imgStackScrollIsAtEnd}
                    onClick={() => scrollProducts('down')}
                    className="flex cursor-pointer text-white hover:bg-transparent hover:text-white focus-visible:border-transparent! focus-visible:ring-0! rtl:max-lg:hidden"
                  >
                    <OurIcon name="arrow-right" className="lg:rotate-90" />
                  </Button>
                  <Button
                    aria-label="Scroll up"
                    variant="ghost"
                    size="icon"
                    disabled={!isImgStackScrollable || imgStackScrollIsAtEnd}
                    onClick={() => scrollProducts('up')}
                    className="hidden cursor-pointer text-white hover:bg-transparent hover:text-white focus-visible:border-transparent! focus-visible:ring-0! rtl:flex rtl:lg:hidden"
                  >
                    <OurIcon name="arrow-left" />
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
