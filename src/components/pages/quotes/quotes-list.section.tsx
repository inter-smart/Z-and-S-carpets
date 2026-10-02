'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, TrashIcon, XIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import QuotesEmptySection from './quotes-empty.section'

export default function QuotesListSection() {
  const t = useTranslations('QuotesPage')

  const products = t.raw('products') as {
    name: string
    image: string
    color: string
    material: string
  }[]

  const [items, setItems] = useState(
    products.map((product) => ({ ...product, quantity: 1 })),
  )

  const updateQuantity = (index: number, amount: number) => {
    setItems((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    )
  }

  return (
    <section className="container-wrapper pt-12 pb-8 lg:pt-20 lg:pb-15">
      <h1 className="our-heading">{t('title')}</h1>
      <p className="mt-2 text-base">{t('description')}</p>
      {items.length ? (
        <div className="mt-12 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start xl:grid-cols-[minmax(0,1fr)_380px]">
          <section aria-labelledby="selected-products-title">
            <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-5">
              <h2
                id="selected-products-title"
                className="text-3xl font-semibold"
              >
                Selected Products
              </h2>
              <div className="flex flex-1 items-center justify-between gap-6">
                <span className="border-our-green rounded border px-3 py-1 text-base">
                  {items.length} Items
                </span>
                <button
                  type="button"
                  onClick={() => setItems([])}
                  className="hover:text-our-purple flex items-center gap-1"
                >
                  <TrashIcon size={18} className="stroke-1 text-[#FF0009]" />
                  <span className="text-lg underline underline-offset-2">
                    Clear All
                  </span>
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {items.map((item, index) => (
                <article
                  key={item.name}
                  className="relative flex items-start gap-3 rounded border border-[#828282]/50 p-2 sm:gap-4 sm:p-4"
                >
                  <div className="relative mb-auto aspect-square min-w-26! overflow-hidden rounded">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex h-full flex-col gap-2 pe-8 sm:justify-between md:gap-0">
                    <div>
                      <h3
                        title={item.name}
                        className="text-base font-semibold sm:w-95 sm:truncate md:w-115 lg:w-90 xl:w-130 2xl:w-190"
                      >
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm">
                        Colour : {item.color} <span className="mx-2">•</span>{' '}
                        Material : {item.material}
                      </p>
                    </div>
                    <div className="mt-8 flex w-fit items-center rounded border text-center font-light">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name}`}
                        onClick={() => updateQuantity(index, -1)}
                        className="w-5"
                      >
                        -
                      </button>
                      <span className="min-w-5.5 px-1 text-base font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase ${item.name}`}
                        onClick={() => updateQuantity(index, 1)}
                        className="w-5"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${item.name}`}
                    onClick={() =>
                      setItems((current) =>
                        current.filter((_, itemIndex) => itemIndex !== index),
                      )
                    }
                    className="absolute top-4 right-5 text-[#555]"
                  >
                    <XIcon className="" size={16} />
                  </button>
                </article>
              ))}
            </div>
            <Link
              href="/products"
              className="group mt-5 flex w-fit items-center gap-1 text-base text-[#007DC5] lg:mt-7 rtl:flex-row-reverse"
            >
              <ChevronLeftIcon className=" " size={12} />
              <span className="text-lg decoration-1 underline-offset-5 group-hover:underline">
                Continue Shopping
              </span>
            </Link>
          </section>
          <aside className="mt-1 flex items-center justify-center rounded-sm bg-[#D9D9D9]/20 px-8 py-10 lg:mt-10">
            <Button
              type="button"
              nativeButton={false}
              render={<Link href={'/quotes/form'} />}
              className="bg-our-purple our-btn"
            >
              Request A Quote
            </Button>
          </aside>
        </div>
      ) : (
        <QuotesEmptySection />
      )}
    </section>
  )
}
