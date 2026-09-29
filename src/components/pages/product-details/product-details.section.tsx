'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import { cn } from 'cn'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheck,
  ExpandIcon,
} from 'lucide-react'
import Image from 'next/image'
import { title } from 'process'
import { useEffect, useRef, useState } from 'react'

const product = {
  name: 'Wood Pattern Vinyl',
  category: 'Vinyl Flooring',
  description:
    'Self adhesive Wood Pattern Vinyl - 1.5mm is a quick and simple solution to redecorate a space with professional-looking results. Wood effect vinyl floor planks mimic the appearance of real hardwood at a fraction of the price. It is well-liked throughout the world, including in the United States, East Asia, and other regions.',
  image: '/images/floor-img-52.webp',
  tags: [
    'Wooden Pattern',
    'PVC sheet mat',
    'Vinyl',
    'Synthetic floor',
    'Waterproof',
    'Anti-slip',
    //
    'Wooden Pattern',
    'PVC sheet mat',
    'Vinyl',
    'Synthetic floor',
    'Waterproof',
    'Anti-slip',
  ],
  specifications: [
    'Waterproof',
    'Easy to Maintain',
    'Easy installation',
    'Extreme Durability',
    'Moisture Resistant',
    'Anti-Slip',
  ],
  sizes: ['S - 90 cm', 'M - 120cm', 'L - 150 cm', 'XL - 180 cm'],
  colors: [
    {
      label: '267-7',
      image: '/images/prod-color-1.png',
    },
    {
      label: '267-7',
      image: '/images/prod-color-2.png',
    },
    {
      label: '267-7',
      image: '/images/prod-color-3.png',
    },
    {
      label: '551223',
      image: '/images/prod-color-4.png',
    },
    {
      label: '555202',
      image: '/images/prod-color-5.png',
    },
    {
      label: '555204',
      image: '/images/prod-color-6.png',
    },
    //
    {
      label: '267-7',
      image: '/images/prod-color-1.png',
    },
    {
      label: '267-7',
      image: '/images/prod-color-2.png',
    },
    {
      label: '267-7',
      image: '/images/prod-color-3.png',
    },
    {
      label: '551223',
      image: '/images/prod-color-4.png',
    },
    {
      label: '555202',
      image: '/images/prod-color-5.png',
    },
    {
      label: '555204',
      image: '/images/prod-color-6.png',
    },
  ],
  detailedDesc: {
    desc: 'Our Wood Pattern Vinyl flooring offers a perfect blend of aesthetic appeal and functional performance. Designed for high-traffic residential and light commercial environments, it features a 0.5mm wear layer that protects against scratches and scuffs.',
    bullets: [
      'Eco-friendly virgin vinyl material.',
      'Heat-resistant and moisture-proof backing.',
      'Low VOC emissions for better indoor air quality.',
      'Realistic wood embossing textures.',
    ],
  },
  detailPhotos: [
    '/images/floor-img-12.webp',
    '/images/floor-img-12.webp',
    '/images/floor-img-12.webp',
    '/images/floor-img-12.webp',
    '/images/floor-img-12.webp',
  ],
  videos: [
    '/images/floor-img-12.webp',
    '/images/floor-img-12.webp',
    '/images/floor-img-12.webp',
    '/images/floor-img-12.webp',
  ],
}

const tabs = [
  'Product Description',
  'Related Accessories',
  'Certificates/Test Reports',
  'Installation Instruction',
  'Maintenance',
  'Packaging & Shipping',
  'Detailed Photos',
  'Videos',
]

function MediaGrid({ items, title }: { items: string; title: string }) {
  return (
    <article
      // className={`group overflow-hidden rounded-sm ${items.length === 5 && index > 2 ? 'lg:col-span-2' : ''}`}
      className={`group overflow-hidden rounded-sm`}
    >
      <div className="relative h-55 w-full">
        <Image
          src={items}
          alt={`${title}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-5 pt-12 pb-4 text-white">
        <p className="text-[22px] font-medium">Experience realistic</p>
        <p className="text-[14px]">Wood aesthetics with durable vinyl</p>
      </div>
    </article>
  )
}

export default function ProductDetailsSection() {
  const [activeTab, setActiveTab] = useState('Product Description')
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
    <>
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
                className="mx-6 flex gap-3 overflow-x-auto scroll-smooth py-2 [&::-webkit-scrollbar]:hidden"
              >
                {product.tags.map((tag, i) => (
                  <p key={i} className="z-30 shrink-0 text-xs">
                    <span
                      className={cn(
                        'text-our-purple me-3',
                        i === 0 && 'hidden',
                      )}
                    >
                      •
                    </span>
                    <span className="">{tag}</span>
                  </p>
                ))}
              </div>
              {/* LEFT ARROW */}
              <div className="absolute top-0 left-0 h-full bg-linear-to-r from-white to-white/5 pe-15">
                <Button
                  aria-label="Scroll up"
                  variant="ghost"
                  disabled={!isTagRowScrollable}
                  onClick={() => scrollTagRow('left')}
                  className="text-our-purple hover:text-our-purple flex cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0! rtl:max-lg:hidden"
                >
                  <ChevronLeftIcon />
                </Button>
              </div>
              {/* RIGHT ARROW */}
              <div className="absolute top-0 right-0 h-full bg-linear-to-l from-white to-white/5 ps-15">
                <Button
                  aria-label="Scroll up"
                  variant="ghost"
                  disabled={!isTagRowScrollable}
                  onClick={() => scrollTagRow('right')}
                  className="text-our-purple hover:text-our-purple flex cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0! rtl:max-lg:hidden"
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
              className="mx-10 flex gap-6 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden"
            >
              {product.colors.map((color, index) => (
                <div
                  key={`${color.label}-${index}`}
                  className="flex flex-col items-center gap-2"
                >
                  <button
                    type="button"
                    className="relative size-15 overflow-hidden rounded-full"
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
            <input
              aria-label="Quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(event) =>
                setQuantity(Math.max(1, Number(event.target.value)))
              }
              className="border-our-blue h-10 w-18 rounded-sm border px-2 py-2.5 text-center text-sm font-medium"
            />
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

      {/* bottom TAB section */}
      <section className="container-wrapper mt-12 pb-15">
        <div className="flex justify-between gap-10 overflow-x-auto scroll-smooth border-y border-[#eee] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tab, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'ltr:font-manrope rtl:font-cairo w-fit shrink-0 py-4 focus:ring-0 focus:outline-none',
                activeTab === tab
                  ? 'border-our-purple border-b-3 text-base font-semibold'
                  : 'text-sm',
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Product Description' && (
          <section className="mt-9">
            <h3 className="ltr:font-manrope rtl:font-cairo text-[15px] font-semibold">
              Detailed Product Description
            </h3>
            <p className="mt-4 text-sm">{product.detailedDesc.desc}</p>
            <ul className="mt-5 space-y-4 text-sm">
              {product.detailedDesc.bullets.map((point, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div>
                    <CircleCheck size={16} className="text-our-blue stroke-1" />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {activeTab === 'Detailed Photos' && (
          <section className="mt-7">
            <h3 className="text-[15px] font-semibold">{title}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {/* <MediaGrid items={product.detailPhotos} title="Detailed Photos" /> */}
            </div>
          </section>
        )}

        {activeTab === 'Videos' && (
          <section className="mt-7">
            <h3 className="text-[15px] font-semibold">{title}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.videos.map((src, index) => (
                <div key={index}>
                  <MediaGrid items={src} title="Videos" />
                </div>
              ))}
            </div>
          </section>
        )}

        {!['Product Description', 'Detailed Photos', 'Videos'].includes(
          activeTab,
        ) && (
          <section className="py-10 text-sm text-[#555]">
            Product information for {activeTab} will be available here.
          </section>
        )}
      </section>
    </>
  )
}
