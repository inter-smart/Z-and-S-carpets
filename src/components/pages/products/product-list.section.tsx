'use client'

import ProductItemCard from '@/components/common/product-item.card'
import FAQSection from '@/components/pages/common/faq.section'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { LocaleType } from '@/i18n/types'
import { buildFilterQuery, toProductCard } from '@/lib/products'
import type { HomeData } from '@/types/home'
import type {
  ProductFiltersData,
  ProductListData,
  ProductListItem,
} from '@/types/product-list'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ListFilterIcon,
  Loader2Icon,
} from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useMemo, useState, useTransition, type ReactNode } from 'react'
import ProductsEmptySection from './products-empty.section'
// import RelatedCategoriesSection from './related-categories.section'

type FilterCategory = ProductFiltersData['categories'][number]

interface ProductListSectionProps {
  // filter options (categories, attributes with values); null when they could not be loaded
  filters: ProductFiltersData | null
  // selected filters (from ?category= and ?attrs=)
  activeCategories: string[]
  activeAttrs: Record<string, string[]>
  // selected tag slugs (from ?tag=)
  activeTags: string[]
  // how many pages the first load already contains (from ?page=)
  initialPage: number
  // the first `initialPage` pages of the list (loaded on the server)
  initialProducts: ProductListItem[]
  initialHasMore: boolean
  // general FAQs shown under the list
  faqs?: HomeData['faqs_section']
}

// One collapsible block of the filter panel
function FilterGroup({
  label,
  open,
  onToggle,
  children,
}: {
  label: string
  open: boolean
  onToggle: () => void
  children: ReactNode
}) {
  return (
    <div className="rounded-sm border border-[#AAAAAA]/25 bg-white px-4">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-3 text-left text-lg focus:ring-0 focus:outline-none rtl:text-right"
      >
        <span>{label}</span>
        <span aria-hidden="true">
          {open ? (
            <ChevronUpIcon className="stroke-1" size={15} />
          ) : (
            <ChevronDownIcon className="stroke-1" size={15} />
          )}
        </span>
      </button>
      {open && <div className="border-t border-black/15 py-3">{children}</div>}
    </div>
  )
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex items-center gap-3 py-2 text-base">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="accent-our-blue size-3.5"
      />
      <span>{label}</span>
    </label>
  )
}

export default function ProductListSection({
  filters,
  activeCategories,
  activeAttrs,
  activeTags,
  initialPage,
  initialProducts,
  initialHasMore,
  faqs,
}: ProductListSectionProps) {
  const locale = useLocale() as LocaleType
  const t2 = useTranslations('Products')
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  const pathname = usePathname()
  const router = useRouter()
  const [isFiltering, startTransition] = useTransition()

  const [items, setItems] = useState(initialProducts)
  const [page, setPage] = useState(initialPage)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [loadError, setLoadError] = useState(false)

  // A new filter selection brings a freshly rendered list from the server: start from it again
  // (dropping the pages loaded with Load More). The component itself stays mounted, so the
  // open / closed state of the filter groups is kept.
  const filterKey = buildFilterQuery(
    activeCategories,
    activeAttrs,
    activeTags,
  ).toString()
  const [loadedFilterKey, setLoadedFilterKey] = useState(filterKey)
  if (loadedFilterKey !== filterKey) {
    setLoadedFilterKey(filterKey)
    setItems(initialProducts)
    setPage(initialPage)
    setHasMore(initialHasMore)
    setLoadError(false)
  }

  const products = useMemo(
    () => items.map((item) => toProductCard(item, locale)),
    [items, locale],
  )

  // Category is open at first, plus the groups that already have a chosen value
  const [openFilter, setOpenFilter] = useState<string[]>([
    'category',
    ...Object.keys(activeAttrs).map((slug) => `attr-${slug}`),
    ...(activeTags.length ? ['tags'] : []),
  ])
  const toggleOpen = (id: string) =>
    setOpenFilter((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )

  // ---- category tree (flat list from the API -> children by parent) ----
  const { rootCategories, childrenOf } = useMemo(() => {
    const categories = filters?.categories ?? []
    const known = new Set(categories.map((item) => item.slug))
    const children = new Map<string, FilterCategory[]>()
    const roots: FilterCategory[] = []
    for (const item of categories) {
      if (item.parent_slug && known.has(item.parent_slug)) {
        children.set(item.parent_slug, [
          ...(children.get(item.parent_slug) ?? []),
          item,
        ])
      } else {
        roots.push(item)
      }
    }
    return { rootCategories: roots, childrenOf: children }
  }, [filters])

  const descendantsOf = (slug: string): string[] =>
    (childrenOf.get(slug) ?? []).flatMap((child) => [
      child.slug,
      ...descendantsOf(child.slug),
    ])

  // The filters live in the URL: the server renders the new list (and a refresh / shared link /
  // back button gives the same view). Changing a filter starts again from the first page.
  const applyFilters = (
    categories: string[],
    attrs: Record<string, string[]>,
    tags: string[],
  ) => {
    // keep the commas / colons readable in the address bar
    const query = buildFilterQuery(categories, attrs, tags)
      .toString()
      .replace(/%2C/gi, ',')
      .replace(/%3A/gi, ':')
    startTransition(() => {
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false })
    })
  }

  // Unselecting a category keeps its selected sub-categories: they stay selected and stay
  // visible under it (see renderCategories).
  const toggleCategory = (slug: string) => {
    const next = new Set(activeCategories)
    if (next.has(slug)) next.delete(slug)
    else next.add(slug)
    applyFilters([...next], activeAttrs, activeTags)
  }

  const toggleTag = (slug: string) =>
    applyFilters(
      activeCategories,
      activeAttrs,
      activeTags.includes(slug)
        ? activeTags.filter((item) => item !== slug)
        : [...activeTags, slug],
    )

  const toggleAttribute = (attribute: string, value: string) => {
    const current = activeAttrs[attribute] ?? []
    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]
    const next = { ...activeAttrs, [attribute]: updated }
    if (!updated.length) delete next[attribute]
    applyFilters(activeCategories, next, activeTags)
  }

  const hasActiveFilters =
    activeCategories.length > 0 ||
    Object.keys(activeAttrs).length > 0 ||
    activeTags.length > 0

  // Load More: the next page comes from the API; the URL remembers how far the visitor went
  const loadMore = async () => {
    if (isLoadingMore) return
    const nextPage = page + 1
    setIsLoadingMore(true)
    setLoadError(false)

    try {
      const query = buildFilterQuery(activeCategories, activeAttrs, activeTags)
      query.set('page', String(nextPage))
      const res = await fetch(`/api/products?${query}`)
      if (!res.ok) throw new Error('Request failed')
      const data = (await res.json()) as ProductListData

      setItems((current) => [...current, ...data.products])
      setPage(nextPage)
      setHasMore(data.pagination.hasMore)

      const url = new URL(window.location.href)
      url.searchParams.set('page', String(nextPage))
      window.history.replaceState(null, '', url)
    } catch {
      setLoadError(true)
    } finally {
      setIsLoadingMore(false)
    }
  }

  const renderCategories = (nodes: FilterCategory[]): ReactNode =>
    nodes.map((node) => {
      const checked = activeCategories.includes(node.slug)
      const children = childrenOf.get(node.slug) ?? []
      // the sub-categories show under a chosen category, and also under an unchosen one that
      // still has a chosen sub-category (the API only sends them for these)
      const isOpen =
        checked ||
        descendantsOf(node.slug).some((slug) => activeCategories.includes(slug))

      return (
        <div key={node.slug}>
          <CheckboxRow
            label={pick(node.title, node.title_ar)}
            checked={checked}
            onChange={() => toggleCategory(node.slug)}
          />
          {isOpen && children.length > 0 && (
            <div className="ms-1.5 border-s border-black/15 ps-3">
              {renderCategories(children)}
            </div>
          )}
        </div>
      )
    })

  // The filter panel (desktop sidebar and mobile sheet render the same content)
  const filterGroups = (
    <div className="space-y-2">
      {rootCategories.length > 0 && (
        <FilterGroup
          label={t2('categoryFilter')}
          open={openFilter.includes('category')}
          onToggle={() => toggleOpen('category')}
        >
          {renderCategories(rootCategories)}
        </FilterGroup>
      )}
      {filters?.attributes.map((attribute) => (
        <FilterGroup
          key={attribute.slug}
          label={pick(attribute.title, attribute.title_ar)}
          open={openFilter.includes(`attr-${attribute.slug}`)}
          onToggle={() => toggleOpen(`attr-${attribute.slug}`)}
        >
          {attribute.values.map((value) => (
            <CheckboxRow
              key={value.slug}
              label={pick(value.value, value.value_ar)}
              checked={
                activeAttrs[attribute.slug]?.includes(value.slug) ?? false
              }
              onChange={() => toggleAttribute(attribute.slug, value.slug)}
            />
          ))}
        </FilterGroup>
      ))}
      {!!filters?.tags?.length && (
        <FilterGroup
          label={t2('tagsFilter')}
          open={openFilter.includes('tags')}
          onToggle={() => toggleOpen('tags')}
        >
          {filters.tags.map((tag) => (
            <CheckboxRow
              key={tag.slug}
              label={pick(tag.title, tag.title_ar)}
              checked={activeTags.includes(tag.slug)}
              onChange={() => toggleTag(tag.slug)}
            />
          ))}
        </FilterGroup>
      )}
    </div>
  )

  const clearButton = hasActiveFilters && (
    <button
      type="button"
      onClick={() => applyFilters([], {}, [])}
      className="text-our-blue mt-3 text-sm underline underline-offset-4"
    >
      {t2('clearFilters')}
    </button>
  )

  return (
    <>
      <section className="container-wrapper flex">
        <div className="relative hidden h-fit w-60 bg-[#EFF9FE] md:block lg:w-70 2xl:w-80">
          <div className="absolute bottom-full -z-10 h-full w-dvw bg-[#EFF9FE] ltr:right-0 rtl:left-0" />
          <div className="absolute h-full w-dvw bg-[#EFF9FE] ltr:right-full rtl:left-full" />
          <aside className="pe-5 pt-5 pb-8">
            <h2 className="our-heading text-6xl!">{t2('filterTitle')}</h2>
            <div className="mt-4">{filterGroups}</div>
            {clearButton}
          </aside>
        </div>

        <div className="relative flex-1 pt-4 pb-20 md:ps-4">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant={'outline'}
                  className="absolute -top-10 right-0 w-fit rounded-sm px-3 py-3.5 text-xs font-medium tracking-widest text-black uppercase hover:bg-transparent md:hidden rtl:right-auto rtl:left-0"
                >
                  <ListFilterIcon data-icon="inline-center" />
                  {t2('filterTitle')}
                </Button>
              }
            />
            <SheetContent
              side="left"
              className="inset-y-4! top-4! bottom-4! h-auto! w-[94%]! max-w-80! rounded-e-md bg-[#EFF9FE] pt-5 rtl:right-0! rtl:left-auto!"
            >
              <SheetHeader>
                <SheetTitle>
                  <p className="our-heading text-6xl!">{t2('filterTitle')}</p>
                </SheetTitle>
              </SheetHeader>
              <div className="min-h-0 flex-1 scrollbar-none overflow-y-auto overscroll-none px-6 pb-6">
                {filterGroups}
                {clearButton}
              </div>
            </SheetContent>
          </Sheet>

          <div
            aria-busy={isFiltering || isLoadingMore}
            className={isFiltering ? 'opacity-50 transition-opacity' : ''}
          >
            {products.length ? (
              <div className="grid gap-4 sm:grid-cols-2 md:gap-2 lg:gap-5 xl:grid-cols-3">
                {products.map((product) => (
                  <div key={product.slug ?? product.name} className="h-full">
                    <ProductItemCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <ProductsEmptySection />
            )}
          </div>

          {loadError && (
            <p role="alert" className="mt-6 text-center text-red-600">
              {t2('loadError')}
            </p>
          )}

          {hasMore && (
            <div className="mt-12 flex w-full justify-center lg:mt-20">
              <Button
                variant={'outline'}
                disabled={isLoadingMore}
                onClick={loadMore}
                className="border-our-blue our-btn hover:bg-transparent"
              >
                {isLoadingMore && <Loader2Icon className="animate-spin" />}
                {t2('loadMore')}
              </Button>
            </div>
          )}
        </div>
      </section>

      <div>
        {/* Related categories (<RelatedCategoriesSection />) are disabled for empty results until the section is reworked */}
        {products.length > 0 && faqs?.is_visible && (
          <FAQSection className="bg-[#EFF9FE]" data={faqs} />
        )}
      </div>
    </>
  )
}
