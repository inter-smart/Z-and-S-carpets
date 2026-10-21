'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import { useProductVariant } from '@/context/product-variant.context'
import { useGetASample } from '@/context/get-a-sample.context'
import type { LocaleType } from '@/i18n/types'
import { buildWhatsappLink, pickLocalized } from '@/lib/product-detail'
import type { ProductDetailAttribute, ProductDetailData } from '@/types/product-detail'
import { cn } from 'cn'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// Horizontal row that scrolls with arrow buttons (arrows are enabled only when it overflows)
function useScrollRow() {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollable, setScrollable] = useState(false)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const check = () =>
      setScrollable(
        container.scrollWidth > container.clientWidth ||
          container.scrollHeight > container.clientHeight,
      )
    check()
    const observer = new ResizeObserver(check)
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const scrollBy = (direction: 'left' | 'right') =>
    ref.current?.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth',
    })

  return [ref, scrollable, scrollBy] as const
}

export default function ProductDetailsSection({
  data,
  whatsapp,
  productUrl,
  descriptionHtml,
}: {
  data: ProductDetailData
  whatsapp?: string
  productUrl: string
  // already localized and sanitised by the API
  descriptionHtml: string
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('ProductDetailsPage.Details')
  const tCard = useTranslations('Common.ProductCard')
  const { openGetASample } = useGetASample()
  const { attributes, chosen, selectedVariant, choose, isAvailable, notice, guidance } =
    useProductVariant()
  // what just happened wins while it's fresh (it explains a conflict); otherwise, if the
  // combination still isn't fully resolved, say what's left to pick
  const message = notice || guidance

  const [quantity, setQuantity] = useState(1)
  const [tagRef, tagsScrollable, scrollTags] = useScrollRow()

  const { product } = data

  const name = pickLocalized(locale, product.title, product.title_ar)
  // the resolved variant's image/sku are already in `variants` (loaded up front), so this
  // switches the moment a combination resolves — it never waits on the tab-content fetch
  const heroPath = selectedVariant?.media.path || product.media.path
  const heroMedia = selectedVariant?.media.path ? selectedVariant.media : product.media
  const heroAlt = pickLocalized(locale, heroMedia.alt, heroMedia.alt_ar) || name
  const category = product.categories.at(-1)

  const optionLabel = (attribute: ProductDetailAttribute, slug: string) => {
    const option = attribute.values.find((item) => item.slug === slug)
    return option ? pickLocalized(locale, option.value, option.value_ar) : ''
  }

  const whatsappLink = whatsapp
    ? buildWhatsappLink(
        whatsapp,
        t('whatsappMessage', {
          product: name,
          options: attributes.length
            ? ` (${attributes
                .map((attribute) => optionLabel(attribute, chosen[attribute.slug]))
                .filter(Boolean)
                .join(', ')})`
            : '',
          quantity,
          url: productUrl,
        }),
      )
    : ''

  return (
    <section className="container-wrapper space-y-8 pt-8 lg:pt-12 xl:grid xl:grid-cols-[0.95fr_1.05fr] xl:gap-10 xl:space-y-0 2xl:gap-12">
      {/* main image: the selected variant's, else the product's */}
      <div className="relative h-80 overflow-hidden rounded-md bg-[#F4F4F4] min-[400px]:h-120 xl:sticky xl:top-24 xl:aspect-square xl:h-auto xl:self-start">
        {heroPath && (
          <Image
            key={heroPath}
            src={heroPath}
            alt={heroAlt}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 50vw"
            className="w-full object-cover"
          />
        )}
        {product.badge && (
          <span className="absolute top-3 right-3 rounded-xs bg-white px-2 py-0.5 text-xs">
            {pickLocalized(locale, product.badge.title, product.badge.title_ar)}
          </span>
        )}
      </div>

      {/* details */}
      <div className="pt-1">
        {category && (
          <p className="ltr:font-manrope rtl:font-cairo text-lg tracking-wider uppercase">
            {pickLocalized(locale, category.title, category.title_ar)}
          </p>
        )}
        <h1 className="text-6xl font-bold">{name}</h1>

        {/* key features: the small swiper under the name */}
        {product.features.length > 0 && (
          <div className="relative mt-2 xl:w-fit">
            <div className="border-our-purple/60 border-y xl:w-130 2xl:w-160">
              <div
                ref={tagRef}
                className="mx-6 flex scrollbar-none gap-3 overflow-x-auto scroll-smooth py-2"
              >
                {product.features.map((feature, i) => (
                  <p key={feature.slug} className="z-30 shrink-0 text-xs">
                    <span
                      className={cn(
                        'text-our-purple me-3',
                        i === 0 && 'hidden',
                      )}
                    >
                      •
                    </span>
                    <span>
                      {pickLocalized(locale, feature.title, feature.title_ar)}
                    </span>
                  </p>
                ))}
              </div>
              <div className="absolute top-0 left-0 h-full bg-linear-to-r from-white to-white/5 pr-15">
                <Button
                  aria-label={t('scrollLeft')}
                  variant="ghost"
                  disabled={!tagsScrollable}
                  onClick={() => scrollTags('left')}
                  className="text-our-purple hover:text-our-purple flex h-full cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
                >
                  <ChevronLeftIcon className="rtl:rotate-180" />
                </Button>
              </div>
              <div className="absolute top-0 right-0 h-full bg-linear-to-l from-white to-white/5 pl-15">
                <Button
                  aria-label={t('scrollRight')}
                  variant="ghost"
                  disabled={!tagsScrollable}
                  onClick={() => scrollTags('right')}
                  className="text-our-purple hover:text-our-purple flex h-full cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
                >
                  <ChevronRightIcon className="rtl:rotate-180" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* description */}
        {descriptionHtml && (
          <div
            className="blog-body blog-body-start check-list mt-5 text-sm"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        )}

        {/* specifications */}
        {product.specifications.length > 0 && (
          <>
            <p className="ltr:font-manrope rtl:font-cairo mt-4 text-base font-medium tracking-wider uppercase">
              {t('specifications')}
            </p>
            <div className="mt-2 grid gap-2 sm:w-4/5 sm:grid-cols-3">
              {product.specifications.map((item) => (
                <span
                  key={item.slug}
                  className="rounded bg-[#979797]/10 px-2 py-2.5 text-center text-sm"
                >
                  {pickLocalized(locale, item.title, item.title_ar)}
                </span>
              ))}
            </div>
          </>
        )}

        {/* attributes (size, colour, ...) */}
        {attributes.map((attribute) => (
          <AttributeGroup
            key={attribute.slug}
            attribute={attribute}
            selectedValue={chosen[attribute.slug]}
            isAvailable={(option) => isAvailable(attribute.slug, option)}
            onChoose={(option) => choose(attribute, option)}
            scrollLabels={{ left: t('scrollLeft'), right: t('scrollRight') }}
            unavailableLabel={t('unavailableOption')}
          />
        ))}
        {message && (
          <p
            role="status"
            className={cn(
              'mt-3 text-sm',
              notice ? 'text-our-purple' : 'text-[#777]',
            )}
          >
            {message}
          </p>
        )}

        {/* buttons */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-[#D2D2D2]/80 pt-6">
          <div className="border-our-blue flex h-8 w-16 items-center rounded-sm border">
            <input
              aria-label={t('quantity')}
              type="number"
              min={1}
              value={quantity}
              onChange={(event) =>
                setQuantity(Math.max(1, Number(event.target.value) || 1))
              }
              className={cn(
                'h-full min-w-0 flex-1 border-0 bg-transparent text-center text-sm font-medium outline-none',
                '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
              )}
            />

            <div className="me-1 flex w-4 flex-col overflow-hidden rounded bg-gray-100">
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex flex-1 items-center justify-center hover:bg-gray-200"
                aria-label={t('increaseQuantity')}
              >
                <ChevronUpIcon className="size-3" />
              </button>

              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex flex-1 items-center justify-center hover:bg-gray-200"
                aria-label={t('decreaseQuantity')}
              >
                <ChevronDownIcon className="size-3" />
              </button>
            </div>
          </div>
          <Button type="button" className="our-btn bg-our-purple px-5!">
            {tCard('addToQuote')}
          </Button>
          {whatsappLink && (
            <Button
              render={
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              className="our-btn bg-our-green px-5!"
            >
              <OurIcon name="whatsapp" />
              {t('chatOnWhatsapp')}
            </Button>
          )}
          <Button
            type="button"
            onClick={() =>
              openGetASample({
                category: category?.slug,
                product: product.slug,
              })
            }
            className="our-btn bg-our-blue px-5!"
          >
            {t('getSample')}
          </Button>
          {product.data_sheet && (
            <Button
              variant={'outline'}
              render={
                <a
                  href={product.data_sheet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                />
              }
              className="our-btn border-[#CDCDCD] px-5! text-black"
            >
              {t('downloadDatasheet')}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}

// Swatches (colour attributes: colour code or image) or plain buttons. A value that does not exist
// together with the other chosen values is dimmed but still clickable (the closest variant opens).
function AttributeGroup({
  attribute,
  selectedValue,
  isAvailable,
  onChoose,
  scrollLabels,
  unavailableLabel,
}: {
  attribute: ProductDetailAttribute
  selectedValue?: string
  isAvailable: (option: string) => boolean
  onChoose: (option: string) => void
  scrollLabels: { left: string; right: string }
  unavailableLabel: string
}) {
  const locale = useLocale() as LocaleType
  const [rowRef, rowScrollable, scrollRow] = useScrollRow()
  const swatches = attribute.values.some(
    (item) => item.color_code || item.media.path,
  )

  return (
    <>
      <p className="ltr:font-manrope rtl:font-cairo mt-6 text-base font-medium tracking-wider uppercase">
        {pickLocalized(locale, attribute.title, attribute.title_ar)}
      </p>

      {swatches ? (
        <div className="relative mt-2 xl:w-130 2xl:w-160">
          <div
            ref={rowRef}
            className="mx-10 flex scrollbar-none gap-3 overflow-x-auto scroll-smooth p-1 md:gap-6"
          >
            {attribute.values.map((item) => {
              const label = pickLocalized(locale, item.value, item.value_ar)
              const active = item.slug === selectedValue
              return (
                <div
                  key={item.slug}
                  className="flex flex-col items-center gap-2"
                >
                  <button
                    type="button"
                    aria-pressed={active}
                    title={
                      !isAvailable(item.slug) && !active
                        ? unavailableLabel
                        : undefined
                    }
                    onClick={() => onChoose(item.slug)}
                    style={
                      !item.media.path && item.color_code
                        ? { backgroundColor: item.color_code }
                        : undefined
                    }
                    className={cn(
                      'relative size-13 cursor-pointer overflow-hidden rounded-full border border-black/10 2xl:size-14.5',
                      active && 'ring-our-purple ring-2 ring-offset-2',
                      !isAvailable(item.slug) &&
                        !active &&
                        'border-dashed border-black/40 opacity-40',
                    )}
                  >
                    <span className="sr-only">{label}</span>
                    {item.media.path && (
                      <Image
                        src={item.media.path}
                        alt={label}
                        fill
                        sizes="60px"
                        className="object-cover"
                      />
                    )}
                  </button>
                  <p className="ltr:font-manrope rtl:font-cairo text-sm tracking-wider">
                    {label}
                  </p>
                </div>
              )
            })}
          </div>
          <div className="absolute top-0 left-0 h-full w-fit pt-4">
            <Button
              aria-label={scrollLabels.left}
              variant="ghost"
              disabled={!rowScrollable}
              onClick={() => scrollRow('left')}
              className="flex cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
            >
              <OurIcon name="arrow-left" />
            </Button>
          </div>
          <div className="absolute top-0 right-0 h-full pt-4">
            <Button
              aria-label={scrollLabels.right}
              variant="ghost"
              disabled={!rowScrollable}
              onClick={() => scrollRow('right')}
              className="flex cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
            >
              <OurIcon name="arrow-right" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-2 flex flex-wrap gap-2">
          {attribute.values.map((item) => {
            const active = item.slug === selectedValue
            return (
              <button
                type="button"
                key={item.slug}
                aria-pressed={active}
                title={
                  !isAvailable(item.slug) && !active
                    ? unavailableLabel
                    : undefined
                }
                onClick={() => onChoose(item.slug)}
                className={cn(
                  'border-our-blue cursor-pointer rounded border px-4 py-2 text-sm focus:ring-0 focus:outline-none',
                  active && 'bg-our-blue text-white',
                  !isAvailable(item.slug) &&
                    !active &&
                    'border-dashed opacity-50',
                )}
              >
                {pickLocalized(locale, item.value, item.value_ar)}
              </button>
            )
          })}
        </div>
      )}
    </>
  )
}
