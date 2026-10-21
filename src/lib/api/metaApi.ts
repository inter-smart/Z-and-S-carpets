import type { Metadata } from 'next'
import { LocaleType } from '@/i18n/types'
import { parseOtherMeta } from '@/lib/metaHelper'
import { defaultMeta, DefaultOgImage, PageMeta } from './constants'

const SERVER_API_URL =
  process.env.API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || ''
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || ''

type BackendMetaDataPayload = {
  meta_title?: string | null
  meta_description?: string | null
  meta_keywords?: string | null
  other_meta?: string | null
}

type BackendEnvelope<T> = {
  success: boolean
  data?: T
  message?: string
}

const fallbackPageMeta: Record<LocaleType, PageMeta> = {
  en: {
    title: 'Z&S Carpets',
    description: 'Fallback description if nothing else is available.',
    keywords: 'Z&S Carpets',
  },
  ar: {
    title: 'زد اند إس للسجاد',
    description: 'وصف احتياطي في حال عدم توفر أي بيانات أخرى.',
    keywords: 'زد اند إس للسجاد',
  },
}

function buildFallbackMetadata(
  pageMeta: PageMeta,
  locale: LocaleType,
  pagename = '',
): Metadata {
  const canonicalUrl = `${SITE_URL}/${locale}/${pagename}`.replace(/\/$/, '')

  return {
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords,
    openGraph: {
      title: pageMeta.title,
      description: pageMeta.description,
      images: [{ url: DefaultOgImage, width: 1200, height: 630 }],
      type: 'website',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMeta.title,
      description: pageMeta.description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  }
}

async function fetchMetaData(
  params: Record<string, string>,
  locale: LocaleType,
): Promise<BackendMetaDataPayload | null> {
  const search = new URLSearchParams({ ...params, lang: locale })

  const res = await fetch(
    `${SERVER_API_URL}/api/frontend/meta-data?${search.toString()}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    },
  )

  const result: BackendEnvelope<BackendMetaDataPayload> = await res.json()
  if (!result.success || !result.data) return null
  return result.data
}

// For static/listing pages (home, about, contact, services, category, blogs
// listing, works listing, downloads, quotes, seasonal-offer, privacy-policy, ...).
// `pageKey` must match the `page_name` the admin panel saved the meta row under,
// and should also exist as a key in `defaultMeta` for the fallback.
export async function getMetaData(
  pageKey: string,
  locale: LocaleType,
  pagename: string = pageKey,
): Promise<Metadata> {
  const pageMeta = defaultMeta[pageKey]?.[locale] ?? fallbackPageMeta[locale]
  const canonicalUrl = `${SITE_URL}/${locale}/${pagename}`.replace(/\/$/, '')

  try {
    const meta = await fetchMetaData({ page: pageKey }, locale)
    if (!meta) return buildFallbackMetadata(pageMeta, locale, pagename)

    const { other } = parseOtherMeta(meta.other_meta)
    const title = meta.meta_title || pageMeta.title
    const description = meta.meta_description || pageMeta.description

    return {
      title,
      description,
      keywords: meta.meta_keywords || pageMeta.keywords,
      openGraph: {
        title,
        description,
        images: [{ url: DefaultOgImage, width: 1200, height: 630 }],
        type: 'website',
        url: canonicalUrl,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        canonical: canonicalUrl,
      },
      other,
    }
  } catch {
    return buildFallbackMetadata(pageMeta, locale, pagename)
  }
}

export type MetaDetailTarget =
  | { productId: number | string }
  | { variantId: number | string }
  | { blogId: number | string }

function targetToParams(target: MetaDetailTarget): Record<string, string> {
  if ('productId' in target) return { product_id: String(target.productId) }
  if ('variantId' in target) return { variant_id: String(target.variantId) }
  return { blog_id: String(target.blogId) }
}

// Tries each target in order (e.g. the selected variant's own SEO row first, then the product's)
// and returns the first one that has a row written in the admin; null when none do.
async function resolveMetaRow(
  targets: MetaDetailTarget | MetaDetailTarget[],
  locale: LocaleType,
): Promise<BackendMetaDataPayload | null> {
  for (const target of Array.isArray(targets) ? targets : [targets]) {
    const meta = await fetchMetaData(targetToParams(target), locale)
    if (meta) return meta
  }
  return null
}

// For slug-based detail pages (product, product variant, blog post, ...). `target` can be a
// single entity, or several in priority order (e.g. `[{variantId}, {productId}]`: the selected
// variant's own SEO row wins when the admin wrote one, else the product's).
// `image` is the entity's own image (not returned by the meta endpoint itself),
// pass it in from the page's own data fetch so OG/Twitter images reflect the entity.
export async function getDetailMetaData(
  target: MetaDetailTarget | MetaDetailTarget[],
  locale: LocaleType,
  currentUrl: string,
  image?: string | null,
  // the entity's own title / description, used when the admin has not written SEO data for it
  fallback?: { title: string; description: string },
): Promise<Metadata> {
  const pageMeta: PageMeta = fallback
    ? { ...fallbackPageMeta[locale], ...fallback }
    : fallbackPageMeta[locale]
  const ogImage = image || DefaultOgImage

  // generic fallback, but with the entity's own image and URL
  const entityFallback = (): Metadata => ({
    ...buildFallbackMetadata(pageMeta, locale),
    openGraph: {
      title: pageMeta.title,
      description: pageMeta.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: pageMeta.title }],
      type: 'website',
      url: currentUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMeta.title,
      description: pageMeta.description,
      images: [ogImage],
    },
    alternates: { canonical: currentUrl },
  })

  try {
    const meta = await resolveMetaRow(target, locale)
    if (!meta)
      return fallback
        ? entityFallback()
        : buildFallbackMetadata(pageMeta, locale)

    const { other } = parseOtherMeta(meta.other_meta)
    const title = meta.meta_title || pageMeta.title
    const description = meta.meta_description || pageMeta.description

    return {
      title,
      description,
      keywords: meta.meta_keywords || pageMeta.keywords,
      openGraph: {
        title,
        description,
        images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
        url: currentUrl,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImage],
      },
      alternates: {
        canonical: currentUrl,
      },
      other,
    }
  } catch {
    return fallback ? entityFallback() : buildFallbackMetadata(pageMeta, locale)
  }
}

// Plain-string flavour of the above, for updating `document.title` client-side when the visitor
// switches variants without a page navigation (no OG/canonical — those stay as the initial SSR
// values; a crawler always sees the SSR version for the URL it actually requested).
export async function getDetailMetaStrings(
  target: MetaDetailTarget | MetaDetailTarget[],
  locale: LocaleType,
  fallback: { title: string; description: string },
): Promise<{ title: string; description: string }> {
  try {
    const meta = await resolveMetaRow(target, locale)
    return {
      title: meta?.meta_title || fallback.title,
      description: meta?.meta_description || fallback.description,
    }
  } catch {
    return fallback
  }
}
