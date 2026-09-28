'use client'

import { Button } from '@/components/ui/button'
import { cn } from 'cn'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleCheck,
  ExpandIcon,
} from 'lucide-react'
// import product from '@/data/product-details.json'
import Image from 'next/image'
import { title } from 'process'
import { useRef, useState } from 'react'

const product = {
  name: 'Wood Pattern Vinyl',
  category: 'Vinyl Flooring',
  description:
    'Self adhesive Wood Pattern Vinyl - 1.5mm is a quick and simple solution to redecorate a space with professional-looking results. Wood effect vinyl floor planks mimic the appearance of real hardwood at a fraction of the price. It is well-liked throughout the world, including in the United States, East Asia, and other regions.',
  image: '/images/floor-img-12.webp',
  tags: [
    'Wooden Pattern',
    'PVC sheet mat',
    'Vinyl',
    'Synthetic floor',
    'Waterproof',
    'Anti-slip',
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
  colors: ['267-7', '267-7', '267-7', '551223', '555202', '555204'],
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
          // alt={`${title} ${index + 1}`}
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

  const productsRef = useRef<HTMLDivElement>(null)
  const scrollProducts = (direction: 'left' | 'right') => {
    productsRef.current?.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <section className="container-wrapper space-y-8 pt-8 lg:pt-12 xl:grid xl:grid-cols-[0.95fr_1.05fr] xl:gap-10 xl:space-y-0 2xl:gap-12">
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

        <div className="pt-1">
          <p className="ltr:font-manrope rtl:font-cairo text-lg tracking-wider uppercase">
            {product.category}
          </p>
          <h1 className="text-[26px] font-bold">{product.name}</h1>

          {/* TAGS SCROLL */}
          <div className="relative mt-2 xl:w-fit">
            {/* sm:w-130 md:w-150 lg:w-210 xl:w-130 2xl:w-160 */}
            <div className="border-our-purple/60 border-y xl:w-130 2xl:w-160">
              <div
                ref={productsRef}
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
              <div
                className={cn(
                  'absolute top-0 left-0 h-full bg-linear-to-r from-white to-white/5 pe-15',
                  // !isImgStackScrollable && 'hidden lg:invisible lg:flex',
                )}
              >
                <Button
                  aria-label="Scroll up"
                  variant="ghost"
                  // disabled={!isImgStackScrollable || imgStackScrollIsAtStart}
                  onClick={() => scrollProducts('left')}
                  className="text-our-purple hover:text-our-purple flex cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0! rtl:max-lg:hidden"
                >
                  <ChevronLeftIcon className=" " />
                </Button>
              </div>
              {/* RIGHT ARROW */}
              <div
                className={cn(
                  'absolute top-0 right-0 h-full bg-linear-to-l from-white to-white/5 ps-15',
                  // !isImgStackScrollable && 'hidden lg:invisible lg:flex',
                )}
              >
                <Button
                  aria-label="Scroll up"
                  variant="ghost"
                  // disabled={!isImgStackScrollable || imgStackScrollIsAtStart}
                  onClick={() => scrollProducts('right')}
                  className="text-our-purple hover:text-our-purple flex cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0! rtl:max-lg:hidden"
                >
                  <ChevronRightIcon className=" " />
                </Button>
              </div>
            </div>
          </div>

          <p className="mt-5 text-sm">{product.description}</p>

          <p className="ltr:font-manrope rtl:font-cairo mt-4 text-base tracking-wider uppercase">
            Specifications
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {product.specifications.map((item) => (
              <span
                key={item}
                className="rounded bg-[#979797]/10 px-2 py-3 text-center text-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <p className="ltr:font-manrope rtl:font-cairo mt-7 text-base tracking-wider uppercase">
            Size
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                type="button"
                key={size}
                className="border-our-blue rounded border px-4 py-2 text-sm focus:ring-0 focus:outline-none"
              >
                {size}
              </button>
            ))}
          </div>

          <p className="ltr:font-manrope rtl:font-cairo mt-5 text-base tracking-wider uppercase">
            Color
          </p>
          <div className="mt-2 flex gap-3">
            {product.colors.map((color, index) => (
              <div key={`${color}-${index}`}>
                <button
                  type="button"
                  aria-label={`Select color ${color}`}
                  className={`h-11 w-11 rounded-full border-2 bg-linear-to-br ${index % 2 ? 'from-[#bb806c] to-[#e3c1a4]' : 'from-[#747b8b] to-[#d2d5db]'} ${index === 0 ? 'border-[#111]' : 'border-transparent'}`}
                >
                  <span className="sr-only">{color}</span>
                </button>
                <p className="ltr:font-manrope rtl:font-cairo">Color</p>
              </div>
            ))}
          </div>

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
