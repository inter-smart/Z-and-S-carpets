'use client'

import type { ProductDetailsType } from '@/types/product'
import { cn } from 'cn'
import { CircleCheck } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

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

export default function ProductDetailsTabSection({
  product,
}: {
  product: ProductDetailsType
}) {
  const [activeTab, setActiveTab] = useState('Product Description')

  return (
    <section className="container-wrapper mt-12 pb-15">
      {/* tabs */}
      <div className="flex justify-between gap-10 overflow-x-auto scroll-smooth border-y border-[#eee] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setActiveTab(tab)}
            className={cn(
              'ltr:font-manrope rtl:font-cairo w-fit shrink-0 py-4 text-sm focus:ring-0 focus:outline-none',
              activeTab === tab && 'border-our-purple border-b-3 font-semibold',
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* tab - product_description */}
      {activeTab === 'Product Description' && (
        <section className="mt-9">
          <h3 className="ltr:font-manrope rtl:font-cairo text-base font-semibold">
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

      {/* tab - detailed_photos */}
      {activeTab === 'Detailed Photos' && (
        <section className="mt-9">
          <h3 className="ltr:font-manrope rtl:font-cairo text-base font-semibold">
            Detailed Photos
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 xl:gap-4">
            {product.detailPhotos.map((photo, i) => (
              <div
                key={i}
                className={cn(
                  'relative col-span-full h-60 w-full overflow-hidden xl:h-70 2xl:h-80',
                  i === 2 ? 'sm:col-span-2' : 'sm:col-span-1',
                  i < 3 ? 'lg:col-span-2' : 'lg:col-span-3',
                )}
              >
                <div className="absolute top-0 z-10 h-full w-full bg-black/20" />
                <Image
                  src={photo.image}
                  alt={photo.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 z-20 w-full px-5 pb-3 text-white">
                  <h3 className="text-2xl">{photo.title}</h3>
                  <p className="text-lg">{photo.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* tab - videos */}
      {activeTab === 'Videos' && (
        <section className="mt-9">
          <h3 className="ltr:font-manrope rtl:font-cairo text-[15px] font-semibold">
            Videos
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {product.videos.map((src, index) => (
              <div key={index}>
                <MediaGrid items={src} title="Videos" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* tab - coming_tabs */}
      {!['Product Description', 'Detailed Photos', 'Videos'].includes(
        activeTab,
      ) && (
        <section className="py-10 text-sm text-[#555]">
          Product information for {activeTab} will be available here.
        </section>
      )}
    </section>
  )
}
