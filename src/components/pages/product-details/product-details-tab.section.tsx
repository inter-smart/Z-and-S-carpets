'use client'

import { useProductVariant } from '@/context/product-variant.context'
import type { LocaleType } from '@/i18n/types'
import { pickLocalized } from '@/lib/product-detail'
import type {
  ProductDetailField,
  ProductDetailItem,
} from '@/types/product-detail'
import { cn } from 'cn'
import { Pause, Play } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import { useVideoPlayback } from '@/hooks/use-video-playback'
import { getVideoMimeType, withFirstFrameFragment } from '@/lib/video'

type Tab = {
  slug: string
  name: string
  type: ProductDetailField['type']
  items: ProductDetailItem[]
}

// Tabs come from the detail fields resolved for the selected variant (hidden / empty ones are
// already dropped by the API); nothing is rendered when the product has none. Switching variant
// is the one interaction on this page that needs the server (the admin's authored content isn't
// preloaded for every variant), so this is the only part with its own loading state.
export default function ProductDetailsTabSection() {
  const locale = useLocale() as LocaleType
  const t = useTranslations('ProductDetailsPage.Details')
  const { details, loadingDetails, detailsError, retryDetails } =
    useProductVariant()
  const [activeSlug, setActiveSlug] = useState('')

  const tabs: Tab[] = details.map((field) => ({
    slug: field.slug,
    name: pickLocalized(locale, field.name, field.name_ar),
    type: field.type,
    items: field.items,
  }))

  if (loadingDetails) {
    return (
      <section
        className="container-wrapper mt-12 pb-15"
        role="status"
        aria-busy="true"
      >
        <span className="sr-only">{t('loadingDetails')}</span>
        <div className="flex gap-2 border-t border-b border-black/10 py-2">
          {[28, 36, 32, 24].map((width, i) => (
            <div
              key={i}
              className="h-6 animate-pulse rounded bg-[#F4F4F4]"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
        <div className="mt-9 space-y-3">
          <div className="h-4 w-1/3 animate-pulse rounded bg-[#F4F4F4]" />
          <div className="h-4 w-full animate-pulse rounded bg-[#F4F4F4]" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-[#F4F4F4]" />
        </div>
      </section>
    )
  }
  if (!tabs.length && !detailsError) return null

  // the chosen tab may disappear when another variant is picked: fall back to the first one
  const active = tabs.find((tab) => tab.slug === activeSlug) ?? tabs[0]

  return (
    <section className="container-wrapper mt-12 pb-15">
      {detailsError && (
        <p
          role="alert"
          className="text-our-purple mb-4 flex flex-wrap items-center gap-x-3 text-sm"
        >
          {t('detailsError')}
          <button
            type="button"
            onClick={retryDetails}
            className="ltr:font-manrope rtl:font-cairo cursor-pointer font-semibold underline focus:ring-0 focus:outline-none"
          >
            {t('retry')}
          </button>
        </p>
      )}
      {/* a horizontal row: tabs grow to share the full width when they fit, and the row scrolls
          when there are too many for the screen */}
      {active && (
        <>
          <div className="flex scrollbar-none gap-1 overflow-x-auto border-t border-b border-black/10 sm:gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.slug}
                type="button"
                onClick={() => setActiveSlug(tab.slug)}
                className={cn(
                  'ltr:font-manrope rtl:font-cairo shrink-0 grow border-b-3 border-transparent px-3 py-3 text-center text-sm whitespace-nowrap focus:ring-0 focus:outline-none sm:px-4',
                  active.slug === tab.slug && 'border-our-purple font-semibold',
                )}
              >
                {tab.name}
              </button>
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
                  const title = pickLocalized(
                    locale,
                    media.title,
                    media.title_ar,
                  )
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
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-6 xl:gap-4">
                {active.items.map((item, i) => {
                  const media = item.media
                  if (!media?.url) return null
                  return (
                    <VideoCard
                      key={item.id}
                      url={media.url}
                      mimeType={media.mime_type}
                      poster={media.thumbnail_url}
                      title={pickLocalized(locale, media.title, media.title_ar)}
                      text={pickLocalized(
                        locale,
                        media.description,
                        media.description_ar,
                      )}
                      noSupportMessage={t('noVideoSupport')}
                      className={cn(
                        i === 2 ? 'sm:col-span-2' : 'sm:col-span-1',
                        i < 3 ? 'lg:col-span-2' : 'lg:col-span-3',
                      )}
                    />
                  )
                })}
              </div>
            )}
          </section>
        </>
      )}
    </section>
  )
}

// Same card style as the Detailed Photos tab, but a video: native controls are hidden and a
// centred play / pause button is shown instead (same pattern as the process section's video).
function VideoCard({
  url,
  mimeType,
  poster,
  title,
  text,
  noSupportMessage,
  className,
}: {
  url: string
  mimeType: string | null
  poster: string | null
  title: string
  text: string
  noSupportMessage: string
  className?: string
}) {
  const tv = useTranslations('Common.Video')
  const { setRef, isPlaying, hasError, toggle, handlers } = useVideoPlayback()

  return (
    <div
      className={cn(
        'group relative h-60 overflow-hidden xl:h-70 2xl:h-80',
        className,
      )}
    >
      <video
        ref={setRef}
        className="h-full w-full object-cover"
        playsInline
        preload="metadata"
        poster={poster ?? undefined}
        onClick={toggle}
        {...handlers}
      >
        <source
          src={withFirstFrameFragment(url, !!poster)}
          type={getVideoMimeType(url, mimeType)}
        />
        {noSupportMessage}
      </video>

      {hasError && (
        <div className="bg-foreground/60 absolute inset-0 z-10 grid place-items-center px-2 text-center text-sm text-white">
          {tv('unavailable')}
        </div>
      )}
      <div
        className={cn(
          hasError && 'hidden',
          'bg-foreground/20 absolute inset-0 z-10 grid place-items-center transition-opacity',
          isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100',
        )}
      >
        <button
          type="button"
          aria-label={isPlaying ? tv('pause') : tv('play')}
          onClick={toggle}
          className="grid cursor-pointer place-items-center text-sm focus:ring-0 focus:outline-none"
        >
          <span className="bg-background grid size-7 place-items-center rounded-full text-[#0066B3]">
            {isPlaying ? (
              <Pause className="size-3 fill-current stroke-1" />
            ) : (
              <Play className="size-3 fill-current stroke-1" />
            )}
          </span>
        </button>
      </div>

      {(title || text) && (
        <div className="pointer-events-none absolute bottom-0 z-20 w-full px-5 pb-3 text-white">
          {title && <h3 className="text-3xl">{title}</h3>}
          {text && <p className="text-lg">{text}</p>}
        </div>
      )}
    </div>
  )
}
