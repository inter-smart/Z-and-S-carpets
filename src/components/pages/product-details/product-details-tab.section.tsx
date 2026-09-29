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

export default function ProductDetailsTabSection({
  product,
}: {
  product: ProductDetailsType
}) {
  const [activeTab, setActiveTab] = useState('Product Description')

  return (
    <section className="container-wrapper mt-12 pb-15">
      {/* tabs */}
      <div className="flex scrollbar-none justify-between gap-5 overflow-x-auto scroll-smooth border-y border-black/10">
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
                  'relative h-60 overflow-hidden xl:h-70 2xl:h-80',
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
          <div className="mt-4 grid gap-3 lg:grid-cols-2 xl:gap-4">
            {product.detailVideos.map((video, index) => (
              <div
                key={index}
                className="relative h-60 sm:h-80 lg:h-70 2xl:h-80"
              >
                <div className="absolute top-0 z-10 h-full w-full bg-black/20" />
                <video
                  className="h-full w-full object-cover"
                  playsInline
                  autoPlay
                  muted
                  loop
                  poster={video.poster}
                >
                  <source src={video.src} type="video/mp4" />
                </video>
                <div className="absolute bottom-0 z-20 w-full px-5 pb-3 text-white">
                  <h3 className="text-2xl">{video.title}</h3>
                  <p className="text-lg">{video.description}</p>
                </div>
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
