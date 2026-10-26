'use client'

import { Button } from '@/components/ui/button'
import { useQuoteCart } from '@/context/quote-cart.context'
import type { LocaleType } from '@/i18n/types'
import { pickLocalized } from '@/lib/product-detail'
import { ChevronLeftIcon, TrashIcon, XIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import GetAQuoteDialog from './get-a-quote.dialog'
import QuotesEmptySection from './quotes-empty.section'

export default function QuotesListSection() {
  const t = useTranslations('QuotesPage')
  const locale = useLocale() as LocaleType
  const { items, updateQuantity, removeItem, clear } = useQuoteCart()
  const [quoteDialogOpen, setQuoteDialogOpen] = useState(false)

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
                {t('selectedProducts')}
              </h2>
              <div className="flex flex-1 items-center justify-between gap-6">
                <span className="border-our-green rounded border px-3 py-1 text-base">
                  {t('itemsCount', { count: items.length })}
                </span>
                <button
                  type="button"
                  onClick={clear}
                  className="hover:text-our-purple flex items-center gap-1"
                >
                  <TrashIcon size={18} className="stroke-1 text-[#FF0009]" />
                  <span className="text-lg underline underline-offset-2">
                    {t('clearAll')}
                  </span>
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {items.map((item) => {
                const name = pickLocalized(
                  locale,
                  item.productTitle,
                  item.productTitleAr,
                )
                const variantLabel = pickLocalized(
                  locale,
                  item.variantLabel || '',
                  item.variantLabelAr || '',
                )
                return (
                  <article
                    key={item.lineId}
                    className="relative flex items-start gap-3 rounded border border-[#828282]/50 p-2 sm:gap-4 sm:p-4"
                  >
                    <div className="relative mb-auto aspect-square min-w-26! overflow-hidden rounded bg-[#F4F4F4]">
                      {item.media && (
                        <Image
                          src={item.media}
                          alt={name}
                          fill
                          sizes="104px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="flex h-full flex-col gap-2 pe-8 sm:justify-between md:gap-0">
                      <div>
                        <h3
                          title={name}
                          className="text-base font-semibold sm:w-95 sm:truncate md:w-115 lg:w-90 xl:w-130 2xl:w-190"
                        >
                          {name}
                        </h3>
                        {variantLabel && (
                          <p className="mt-1 text-sm">{variantLabel}</p>
                        )}
                      </div>
                      <div className="mt-8 flex w-fit items-center rounded border text-center font-light">
                        <button
                          type="button"
                          aria-label={`Decrease ${name}`}
                          onClick={() =>
                            updateQuantity(item.lineId, item.quantity - 1)
                          }
                          className="w-5"
                        >
                          -
                        </button>
                        <span className="min-w-5.5 px-1 text-base font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${name}`}
                          onClick={() =>
                            updateQuantity(item.lineId, item.quantity + 1)
                          }
                          className="w-5"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${name}`}
                      onClick={() => removeItem(item.lineId)}
                      className="absolute top-4 right-5 text-[#555]"
                    >
                      <XIcon size={16} />
                    </button>
                  </article>
                )
              })}
            </div>
            <Link
              href="/products"
              className="group mt-5 flex w-fit items-center gap-1 text-base text-[#007DC5] lg:mt-7 rtl:flex-row-reverse"
            >
              <ChevronLeftIcon size={12} />
              <span className="text-lg decoration-1 underline-offset-5 group-hover:underline">
                {t('continueShopping')}
              </span>
            </Link>
          </section>
          <aside className="mt-1 flex items-center justify-center rounded-sm bg-[#D9D9D9]/20 px-8 py-10 lg:mt-10">
            <Button
              type="button"
              onClick={() => setQuoteDialogOpen(true)}
              className="bg-our-purple our-btn"
            >
              {t('requestQuote')}
            </Button>
          </aside>
        </div>
      ) : (
        <QuotesEmptySection />
      )}
      <GetAQuoteDialog
        open={quoteDialogOpen}
        onOpenChange={setQuoteDialogOpen}
      />
    </section>
  )
}
