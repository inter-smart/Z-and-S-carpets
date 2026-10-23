'use client'

import type { LocaleType } from '@/i18n/types'
import { buildAttrsParam, formatList, narrowChosen } from '@/lib/product-detail'
import type {
  ProductDetailAttribute,
  ProductDetailField,
  ProductDetailVariant,
} from '@/types/product-detail'
import { useLocale, useTranslations } from 'next-intl'
import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type ProductVariantContextValue = {
  attributes: ProductDetailAttribute[]
  variants: ProductDetailVariant[]
  // the resolved combination shown on the swatches: what was clicked, plus whatever has no real
  // alternative given that (see `narrowChosen`) — computed locally, no network call
  chosen: Record<string, string>
  // the one variant that combination fully picks out, if any — its image/sku/label are already in
  // `variants` so the hero section can switch to them immediately, with no loading state
  selectedVariant: ProductDetailVariant | null
  // the selected variant's tab content: this is the only part that needs the server (the admin's
  // authored guides/photos/videos aren't preloaded for every variant), so it alone has a loading
  // state and arrives slightly after the swatches/hero already updated
  details: ProductDetailField[]
  loadingDetails: boolean
  // the last tab-content request failed (the previous content stays on screen); `retryDetails`
  // repeats it
  detailsError: boolean
  retryDetails: () => void
  // whether the visitor has explicitly picked anything (what "Clear choices" would reset)
  hasSelection: boolean
  clear: () => void
  // picking `option` of `attribute`; clicking an already-explicitly-picked value clears it, and
  // clearing a value that other explicit picks depended on clears those too (reported via `notice`)
  choose: (attribute: ProductDetailAttribute, option: string) => void
  isAvailable: (attributeSlug: string, option: string) => boolean
  // what just happened ("X isn't available with your other choices, so Y was cleared") — shown
  // until the next click
  notice: string
  // what to do next ("Please choose a Material to continue") — recomputed from the current
  // selection on every render, so it's always in sync, unlike `notice`
  guidance: string
}

const ProductVariantContext = createContext<ProductVariantContextValue | null>(
  null,
)

export function useProductVariant() {
  const ctx = useContext(ProductVariantContext)
  if (!ctx)
    throw new Error(
      'useProductVariant must be used inside ProductVariantProvider',
    )
  return ctx
}

export function ProductVariantProvider({
  slug,
  attributes,
  variants,
  initialChosen,
  initialSelectedVariantId,
  initialDetails,
  children,
}: {
  slug: string
  attributes: ProductDetailAttribute[]
  variants: ProductDetailVariant[]
  // what the URL held on the server-rendered load (the visitor's own explicit picks so far)
  initialChosen: Record<string, string>
  initialSelectedVariantId: number | null
  initialDetails: ProductDetailField[]
  children: ReactNode
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('ProductDetailsPage.Details')
  const attributeSlugs = useMemo(
    () => attributes.map((a) => a.slug),
    [attributes],
  )

  const [rawPicked, setRawPicked] = useState(initialChosen)
  const [selectedVariantId, setSelectedVariantId] = useState(
    initialSelectedVariantId,
  )
  const [details, setDetails] = useState(initialDetails)
  const [loadingDetails, setLoadingDetails] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [notice, setNotice] = useState('')

  // the page's own title/meta, so it can be restored once the visitor's picks stop fully
  // resolving a variant (e.g. they change their mind partway through)
  const defaultTitleRef = useRef<string | null>(null)
  const latestRequestRef = useRef(0)
  const abortRef = useRef<AbortController | null>(null)
  const lastTargetRef = useRef<{ id: number | null; attrs: string } | null>(
    null,
  )
  // tab content already known, by selected variant id ('product' = no variant): the server-rendered
  // one is seeded, every fetched one is added, so going back to a seen combination is instant
  const cacheRef = useRef(
    new Map<string, { details: ProductDetailField[]; title?: string }>([
      [
        String(initialSelectedVariantId ?? 'product'),
        { details: initialDetails },
      ],
    ]),
  )

  const chosen = useMemo(
    () => narrowChosen(variants, attributeSlugs, rawPicked),
    [variants, attributeSlugs, rawPicked],
  )

  const selectedVariant = useMemo(() => {
    if (!attributeSlugs.length || !attributeSlugs.every((slug) => chosen[slug]))
      return null
    return (
      variants.find((variant) =>
        attributeSlugs.every((slug) => variant.values[slug] === chosen[slug]),
      ) ?? null
    )
  }, [variants, attributeSlugs, chosen])

  const attributeTitle = (attribute: ProductDetailAttribute) =>
    locale === 'ar' ? attribute.title_ar || attribute.title : attribute.title

  const optionLabel = (
    attribute: ProductDetailAttribute,
    valueSlug: string,
  ) => {
    const option = attribute.values.find((item) => item.slug === valueSlug)
    if (!option) return ''
    return locale === 'ar' ? option.value_ar || option.value : option.value
  }

  // names whichever attribute(s) are still unresolved (never guessed between two or more
  // remaining values — see `narrowChosen`), so the visitor knows what's stopping Add to Quote /
  // WhatsApp from having a specific variant to refer to
  const guidance = useMemo(() => {
    if (selectedVariant || !attributeSlugs.length) return ''
    const unresolved = attributes
      .filter((attribute) => !chosen[attribute.slug])
      .map(attributeTitle)
    return unresolved.length
      ? t('chooseOptionsPrompt', { attributes: formatList(unresolved, locale) })
      : ''
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant, attributes, attributeSlugs, chosen, locale])

  const isAvailable = (attributeSlug: string, option: string) =>
    variants.some(
      (variant) =>
        variant.values[attributeSlug] === option &&
        Object.entries(chosen).every(
          ([otherSlug, value]) =>
            otherSlug === attributeSlug || variant.values[otherSlug] === value,
        ),
    )

  const setPageTitle = (title?: string) => {
    if (defaultTitleRef.current === null)
      defaultTitleRef.current = document.title
    document.title = title || defaultTitleRef.current
  }

  const showDetails = (
    id: number | null,
    entry: { details: ProductDetailField[]; title?: string },
  ) => {
    setSelectedVariantId(id)
    setDetails(entry.details)
    setLoadingDetails(false)
    setDetailsError(false)
    // a variant without its own SEO title, or no variant at all, goes back to the page's title
    if (id === null) {
      if (defaultTitleRef.current !== null)
        document.title = defaultTitleRef.current
    } else setPageTitle(entry.title)
  }

  const fetchDetailsFor = (id: number | null, attrs: string) => {
    lastTargetRef.current = { id, attrs }
    const requestId = ++latestRequestRef.current
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    setLoadingDetails(true)
    setDetailsError(false)
    const params = new URLSearchParams({ slug, attrs, locale })
    fetch(`/api/product-variant?${params}`, { signal: controller.signal })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error('request failed')),
      )
      .then(
        (result: {
          selected_variant_id: number | null
          details: ProductDetailField[]
          meta: { title: string }
        }) => {
          // a slower, now-outdated request must not overwrite what a later click already set
          if (requestId !== latestRequestRef.current) return
          const entry = { details: result.details, title: result.meta?.title }
          cacheRef.current.set(
            String(result.selected_variant_id ?? 'product'),
            entry,
          )
          showDetails(result.selected_variant_id, entry)
        },
      )
      .catch((error: unknown) => {
        if (requestId !== latestRequestRef.current) return
        if (error instanceof DOMException && error.name === 'AbortError') return
        setLoadingDetails(false)
        setDetailsError(true)
      })
  }

  const retryDetails = () => {
    const target = lastTargetRef.current
    if (target) fetchDetailsFor(target.id, target.attrs)
  }

  // Shared by `choose` and `clear`: what the visitor explicitly picked is `next`. Colours, URL and
  // hero are local; the tab content is the one thing that may need the server, and only when the
  // resolved variant (or "no variant") differs from what's currently shown.
  const applySelection = (next: Record<string, string>) => {
    setRawPicked(next)

    const narrowedNext = narrowChosen(variants, attributeSlugs, next)
    const query = buildAttrsParam(next)
    const url = `${window.location.pathname}${query ? `?attrs=${query}` : ''}`
    // updates the address bar only — no Next.js navigation/refetch of the whole page, so picking
    // an option is instant; see `fetchDetailsFor` for the one thing that does need the server
    window.history.pushState(null, '', url)

    const fullyChosen =
      attributeSlugs.length > 0 &&
      attributeSlugs.every((slug) => narrowedNext[slug])
    const matched = fullyChosen
      ? variants.find((variant) =>
          attributeSlugs.every(
            (slug) => variant.values[slug] === narrowedNext[slug],
          ),
        )
      : undefined
    const id = matched?.id ?? null

    if (id === selectedVariantId) {
      // back to what is already shown: drop any in-flight request for something else
      latestRequestRef.current++
      abortRef.current?.abort()
      setLoadingDetails(false)
      setDetailsError(false)
      return
    }
    const cached = cacheRef.current.get(String(id ?? 'product'))
    if (cached) {
      latestRequestRef.current++
      abortRef.current?.abort()
      showDetails(id, cached)
      return
    }
    // no variant: the API answers with the product's own content for a partial / empty `attrs`
    fetchDetailsFor(id, matched ? buildAttrsParam(narrowedNext) : '')
  }

  const choose = (attribute: ProductDetailAttribute, option: string) => {
    const next: Record<string, string> = {}
    const cleared: string[] = []
    // re-clicking your own explicit pick clears it; anything else (including a value that was
    // only ever auto-filled) becomes an explicit pick
    if (rawPicked[attribute.slug] !== option) next[attribute.slug] = option

    for (const other of attributes) {
      const value = rawPicked[other.slug]
      if (other.slug === attribute.slug || !value) continue
      const exists = variants.some((variant) =>
        Object.entries({ ...next, [other.slug]: value }).every(
          ([slug, picked]) => variant.values[slug] === picked,
        ),
      )
      if (exists) next[other.slug] = value
      else cleared.push(attributeTitle(other))
    }

    setNotice(
      cleared.length
        ? t('selectionReset', {
            option: optionLabel(attribute, option),
            attributes: formatList(cleared, locale),
          })
        : '',
    )
    applySelection(next)
  }

  const clear = () => {
    setNotice('')
    applySelection({})
  }

  return (
    <ProductVariantContext.Provider
      value={{
        attributes,
        variants,
        chosen,
        selectedVariant,
        details,
        loadingDetails,
        detailsError,
        retryDetails,
        hasSelection: Object.keys(rawPicked).length > 0,
        clear,
        choose,
        isAvailable,
        notice,
        guidance,
      }}
    >
      {children}
    </ProductVariantContext.Provider>
  )
}
