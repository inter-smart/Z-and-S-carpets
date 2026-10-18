'use client'

import type { LocaleType } from '@/i18n/types'
import { pickLocalized } from '@/lib/product-detail'
import type {
  ProductDetailField,
  ProductDetailItem,
} from '@/types/product-detail'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

type Tab = {
  slug: string
  name: string
  type: ProductDetailField['type']
  items: ProductDetailItem[]
}

// Tabs come from the detail fields resolved for the selected variant (hidden / empty ones are
// already dropped by the API). The product description is the first tab, from the product itself
// when no "Product Description" field has content.
export default function ProductDetailsTabSection({
  fields,
  description,
}: {
  fields: ProductDetailField[]
  description: { html: string; html_ar: string }
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('ProductDetailsPage.Details')
  const [activeSlug, setActiveSlug] = useState('')

  const tabs: Tab[] = fields.map((field) => ({
    slug: field.slug,
    name: pickLocalized(locale, field.name, field.name_ar),
    type: field.type,
    items: field.items,
  }))
  const hasDescriptionField = fields.some(
    (field) => field.slug === 'product-description',
  )
  if (!hasDescriptionField && (description.html || description.html_ar)) {
    tabs.unshift({
      slug: 'product-description',
      name: t('descriptionTab'),
      type: 'rich_text',
      items: [
        {
          id: 0,
          sort_order: 0,
          text_content: description.html,
          text_content_ar: description.html_ar,
          media: null,
        },
      ],
    })
  }

  if (!tabs.length) return null

  // the chosen tab may disappear when another variant is picked: fall back to the first one
  const active = tabs.find((tab) => tab.slug === activeSlug) ?? tabs[0]

  return (
    <section className="container-wrapper mt-12 pb-15">
      <div className="grid grid-cols-1 justify-between border-t border-black/10 min-[325px]:grid-cols-2 min-[425px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:flex xl:border-b">
        {tabs.map((tab) => (
          <div
            key={tab.slug}
            className="flex justify-center border-black/10 px-0 max-xl:border-b"
          >
            <button
              type="button"
              onClick={() => setActiveSlug(tab.slug)}
              className={cn(
                'ltr:font-manrope rtl:font-cairo w-fit border-b-3 border-transparent py-3 text-sm focus:ring-0 focus:outline-none',
                active.slug === tab.slug && 'border-our-purple font-semibold',
              )}
            >
              {tab.name}
            </button>
          </div>
        ))}
      </div>

      <section className="mt-9">
        <h3 className="ltr:font-manrope rtl:font-cairo text-base font-semibold">
          {active.name}
        </h3>

        {active.type === 'rich_text' &&
          active.items.map((item) => {
            // the Arabic page shows the English text until an Arabic one is written
            const html = pickLocalized(
              locale,
              item.text_content,
              item.text_content_ar,
            )
            return html ? (
              <div
                key={item.id}
                className="blog-body blog-body-start check-list mt-4 text-sm"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            ) : null
          })}

        {active.type === 'image' && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 xl:gap-4">
            {active.items.map((item, i) => {
              const media = item.media
              if (!media?.url) return null
              const title = pickLocalized(locale, media.title, media.title_ar)
              const text = pickLocalized(
                locale,
                media.description,
                media.description_ar,
              )
              const alt =
                pickLocalized(locale, media.alt_text, media.alt_text_ar) ||
                title ||
                active.name
              return (
                <div
                  key={item.id}
                  className={cn(
                    'relative h-60 overflow-hidden xl:h-70 2xl:h-80',
                    i === 2 ? 'sm:col-span-2' : 'sm:col-span-1',
                    i < 3 ? 'lg:col-span-2' : 'lg:col-span-3',
                  )}
                >
                  <Image
                    src={media.url}
                    alt={alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                  {(title || text) && (
                    <>
                      <div className="absolute top-0 z-10 h-full w-full bg-black/20" />
                      <div className="absolute bottom-0 z-20 w-full px-5 pb-3 text-white">
                        {title && <h3 className="text-3xl">{title}</h3>}
                        {text && <p className="text-lg">{text}</p>}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {active.type === 'video' && (
          <div className="mt-4 grid gap-3 lg:grid-cols-2 xl:gap-4">
            {active.items.map((item) => {
              const media = item.media
              if (!media?.url) return null
              const title = pickLocalized(locale, media.title, media.title_ar)
              const text = pickLocalized(
                locale,
                media.description,
                media.description_ar,
              )
              return (
                <figure key={item.id}>
                  <video
                    className="h-60 w-full bg-black object-cover sm:h-80 lg:h-70 2xl:h-80"
                    controls
                    playsInline
                    preload="metadata"
                    poster={media.thumbnail_url ?? undefined}
                  >
                    <source
                      src={media.url}
                      type={media.mime_type ?? 'video/mp4'}
                    />
                    {t('noVideoSupport')}
                  </video>
                  {(title || text) && (
                    <figcaption className="mt-2 text-sm">
                      {title && <strong className="block">{title}</strong>}
                      {text}
                    </figcaption>
                  )}
                </figure>
              )
            })}
          </div>
        )}
      </section>
    </section>
  )
}
