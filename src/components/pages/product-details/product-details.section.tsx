'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { ProductDetailsType } from '@/types/product'
import { cn } from 'cn'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ExpandIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function ProductDetailsSection({
  product,
}: {
  product: ProductDetailsType
}) {
  const [quantity, setQuantity] = useState(1)

  // #TAG ROW SCROLL
  const tagRowRef = useRef<HTMLDivElement>(null)
  const [isTagRowScrollable, setIsTagRowScrollable] = useState(false)

  const scrollTagRow = (direction: 'left' | 'right') => {
    tagRowRef.current?.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const container = tagRowRef.current
    if (!container) return

    const canScrollX = container.scrollWidth > container.clientWidth
    const canScrollY = container.scrollHeight > container.clientHeight

    setIsTagRowScrollable(canScrollX || canScrollY)
  }, [])

  // #COLOR ROW SCROLL
  const colorRowRef = useRef<HTMLDivElement>(null)
  const [isColorRowScrollable, setIsColorRowScrollable] = useState(false)

  const scrollColorRow = (direction: 'left' | 'right') => {
    colorRowRef.current?.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const container = colorRowRef.current
    if (!container) return

    const canScrollX = container.scrollWidth > container.clientWidth
    const canScrollY = container.scrollHeight > container.clientHeight

    setIsColorRowScrollable(canScrollX || canScrollY)
  }, [])

  return (
    <section className="container-wrapper space-y-8 pt-8 lg:pt-12 xl:grid xl:grid-cols-[0.95fr_1.05fr] xl:gap-10 xl:space-y-0 2xl:gap-12">
      {/* main image */}
      <div className="relative h-120 overflow-hidden rounded-md xl:h-auto">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="w-full object-cover"
        />
        <button
          type="button"
          aria-label="View fullscreen"
          className="absolute right-7 bottom-7 rounded bg-black/70 p-1.5 text-white"
        >
          <ExpandIcon className="stroke-1" size={20} />
        </button>
      </div>

      {/* details */}
      <div className="pt-1">
        <p className="ltr:font-manrope rtl:font-cairo text-lg tracking-wider uppercase">
          {product.category}
        </p>
        <h1 className="text-[26px] font-bold">{product.name}</h1>

        {/* tags */}
        {/* #TAG ROW SCROLL */}
        <div className="relative mt-2 xl:w-fit">
          {/* sm:w-130 md:w-150 lg:w-210 xl:w-130 2xl:w-160 */}
          <div className="border-our-purple/60 border-y xl:w-130 2xl:w-160">
            <div
              ref={tagRowRef}
              className="mx-6 flex scrollbar-none gap-3 overflow-x-auto scroll-smooth py-2"
            >
              {product.tags.map((tag, i) => (
                <p key={i} className="z-30 shrink-0 text-xs">
                  <span
                    className={cn('text-our-purple me-3', i === 0 && 'hidden')}
                  >
                    •
                  </span>
                  <span className="">{tag}</span>
                </p>
              ))}
            </div>
            {/* LEFT ARROW */}
            <div className="absolute top-0 left-0 h-full bg-linear-to-r from-white to-white/5 pr-15">
              <Button
                aria-label="Scroll up"
                variant="ghost"
                disabled={!isTagRowScrollable}
                onClick={() => scrollTagRow('left')}
                className="text-our-purple hover:text-our-purple flex h-full cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0! rtl:max-lg:hidden"
              >
                <ChevronLeftIcon />
              </Button>
            </div>
            {/* RIGHT ARROW */}
            <div className="absolute top-0 right-0 h-full bg-linear-to-l from-white to-white/5 pl-15">
              <Button
                aria-label="Scroll up"
                variant="ghost"
                disabled={!isTagRowScrollable}
                onClick={() => scrollTagRow('right')}
                className="text-our-purple hover:text-our-purple flex h-full cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0! rtl:max-lg:hidden"
              >
                <ChevronRightIcon />
              </Button>
            </div>
          </div>
        </div>

        {/* description */}
        <p className="mt-5 text-sm">{product.description}</p>

        {/* specification */}
        <p className="ltr:font-manrope rtl:font-cairo mt-4 text-base font-medium tracking-wider uppercase">
          Specifications
        </p>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {product.specifications.map((item, i) => (
            <span
              key={i}
              className="rounded bg-[#979797]/10 px-2 py-3 text-center text-sm"
            >
              {item}
            </span>
          ))}
        </div>

        {/* size */}
        <p className="ltr:font-manrope rtl:font-cairo mt-7 text-base font-medium tracking-wider uppercase">
          Size
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((size, i) => (
            <button
              type="button"
              key={i}
              className="border-our-blue rounded border px-4 py-2 text-sm focus:ring-0 focus:outline-none"
            >
              {size}
            </button>
          ))}
        </div>

        {/* color */}
        <p className="ltr:font-manrope rtl:font-cairo mt-5 text-base font-medium tracking-wider uppercase">
          Color
        </p>
        {/* #COLOR ROW SCROLL */}
        <div className="relative mt-2 xl:w-130 2xl:w-160">
          <div
            ref={colorRowRef}
            className="mx-10 flex scrollbar-none gap-3 overflow-x-auto scroll-smooth md:gap-6"
          >
            {product.colors.map((color, index) => (
              <div
                key={`${color.label}-${index}`}
                className="flex flex-col items-center gap-2"
              >
                <button
                  type="button"
                  className="relative size-13 overflow-hidden rounded-full 2xl:size-14.5"
                >
                  <span className="sr-only">{color.label}</span>
                  <Image src={color.image} alt={color.label} fill />
                </button>
                <p className="ltr:font-manrope rtl:font-cairo text-sm tracking-wider">
                  {color.label}
                </p>
              </div>
            ))}
          </div>
          {/* LEFT ARROW */}
          <div className="absolute top-0 left-0 h-full w-fit pt-4">
            <Button
              aria-label="Scroll up"
              variant="ghost"
              disabled={!isColorRowScrollable}
              onClick={() => scrollColorRow('left')}
              className="flex cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0! rtl:max-lg:hidden"
            >
              <OurIcon name="arrow-left" className="" />
            </Button>
          </div>
          {/* RIGHT ARROW */}
          <div className="absolute top-0 right-0 h-full pt-4">
            <Button
              aria-label="Scroll up"
              variant="ghost"
              disabled={!isColorRowScrollable}
              onClick={() => scrollColorRow('right')}
              className="flex cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0! rtl:max-lg:hidden"
            >
              <OurIcon name="arrow-right" className="" />
            </Button>
          </div>
        </div>

        {/* buttons */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-[#D2D2D2]/80 pt-6">
          <div className="border-our-blue flex h-10 w-18 items-center rounded-sm border">
            <input
              aria-label="Quantity"
              type="number"
              min={1}
              value={quantity}
              onChange={(event) =>
                setQuantity(Math.max(1, Number(event.target.value)))
              }
              className={cn(
                'h-full min-w-0 flex-1 border-0 bg-transparent text-center text-sm font-medium outline-none',
                '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
              )}
            />

            <div className="me-1 flex w-5 flex-col overflow-hidden rounded bg-gray-100">
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex flex-1 items-center justify-center hover:bg-gray-200"
                aria-label="Increase quantity"
              >
                <ChevronUpIcon className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex flex-1 items-center justify-center hover:bg-gray-200"
                aria-label="Decrease quantity"
              >
                <ChevronDownIcon className="size-4" />
              </button>
            </div>
          </div>
          <button
            type="button"
            className="rounded-sm bg-[#8b279c] px-4 py-2.5 text-sm font-medium text-white"
          >
            Add to Quote
          </button>
          <button
            type="button"
            className="rounded-sm bg-[#72bf3d] px-4 py-2.5 text-sm font-medium text-white"
          >
            Chat on WhatsApp
          </button>
          <button
            type="button"
            className="rounded-sm bg-[#0879be] px-4 py-2.5 text-sm font-medium text-white"
          >
            Get Sample
          </button>
          <button
            type="button"
            className="rounded-sm border border-[#CDCDCD] px-4 py-2.5 text-sm font-medium"
          >
            Download Datasheet
          </button>
        </div>
      </div>
    </section>
  )
}
