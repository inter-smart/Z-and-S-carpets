'use client'

import SafeImage from '@/components/common/safe-image'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { useSearch } from '@/context/search.context'
import { useDebouncedValue } from '@/hooks/use-debounced-value'
import type { LocaleType } from '@/i18n/types'
import {
  SEARCH_MAX_CHARS,
  SEARCH_MIN_CHARS,
  cleanQuery,
  pick,
} from '@/lib/search'
import type { SearchData } from '@/types/search'
import { cn } from 'cn'
import { Loader2Icon, SearchIcon, XIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { NavCategory } from './navbar-category.dropdown'

interface Entry {
  key: string
  href: string
  title: string
  subtitle?: string
  thumb?: string | null
}

type Result =
  | { query: string; status: 'ok'; data: SearchData }
  | { query: string; status: 'error' }

export default function SearchOverlay({
  categories,
}: {
  categories?: NavCategory[]
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('Search')
  const router = useRouter()
  const { open, setOpen } = useSearch()

  const [input, setInput] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [active, setActive] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const query = cleanQuery(input)
  const debounced = useDebouncedValue(query)
  const canSearch = debounced.length >= SEARCH_MIN_CHARS

  // One request per settled query; a newer query aborts the older one so a slow response
  // can never overwrite a fresh one
  useEffect(() => {
    if (!open || !canSearch) return
    const controller = new AbortController()
    fetch(`/api/search?q=${encodeURIComponent(debounced)}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('search failed')
        return res.json() as Promise<SearchData>
      })
      .then((data) => setResult({ query: debounced, status: 'ok', data }))
      .catch((error) => {
        if (error?.name !== 'AbortError')
          setResult({ query: debounced, status: 'error' })
      })
    return () => controller.abort()
  }, [open, canSearch, debounced])

  // results of the query on screen (not a stale one)
  const current = result?.query === debounced ? result : null
  const loading = canSearch && !current
  const settled = canSearch && query === debounced

  const groups = useMemo(() => {
    if (current?.status !== 'ok') return []
    const { products, categories: cats, blogs } = current.data
    const toGroup = (label: string, entries: Entry[]) =>
      entries.length ? { label, entries } : null
    return [
      toGroup(
        t('products'),
        (products?.items ?? []).map((item) => ({
          key: `p-${item.slug}`,
          href: `/${locale}/products/${item.slug}`,
          title: pick(locale, item.title, item.title_ar),
          subtitle: pick(locale, item.category_title, item.category_title_ar),
          thumb: item.thumb,
        })),
      ),
      toGroup(
        t('categories'),
        (cats?.items ?? []).map((item) => ({
          key: `c-${item.slug}`,
          href: `/${locale}/products?category=${item.slug}`,
          title: pick(locale, item.title, item.title_ar),
        })),
      ),
      toGroup(
        t('blogs'),
        (blogs?.items ?? []).map((item) => ({
          key: `b-${item.slug}`,
          href: `/${locale}/blogs/${item.slug}`,
          title: pick(locale, item.title, item.title_ar),
          thumb: item.thumb,
        })),
      ),
    ].filter((group) => group !== null)
  }, [current, locale, t])

  const entries = groups.flatMap((group) => group.entries)
  const total = current?.status === 'ok' ? entries.length : 0

  const close = () => setOpen(false)
  const go = (href: string) => {
    close()
    router.push(href)
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown' && total) {
      event.preventDefault()
      setActive((i) => (i + 1) % total)
    } else if (event.key === 'ArrowUp' && total) {
      event.preventDefault()
      setActive((i) => (i <= 0 ? total - 1 : i - 1))
    } else if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault()
      // Enter opens the highlighted result, or the top one
      const target = entries[active >= 0 ? active : 0]
      if (target) go(target.href)
    }
  }

  const fallbackCategories = (categories ?? []).filter((c) => c.slug)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        showCloseButton={false}
        initialFocus={inputRef}
        className="top-0 left-0 max-h-[85dvh] max-w-none translate-x-0 translate-y-0 grid-rows-[auto_minmax(0,1fr)] gap-0 rounded-none rounded-b-2xl bg-white p-0 text-sm sm:max-w-none"
      >
        <DialogTitle className="sr-only">{t('label')}</DialogTitle>

        {/* input */}
        <div className="border-b border-black/10">
          <div className="container-wrapper flex items-center gap-3 py-4">
            <SearchIcon className="size-5 shrink-0 text-black/50" />
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value.slice(0, SEARCH_MAX_CHARS))
                setActive(-1)
              }}
              onKeyDown={onKeyDown}
              type="text"
              role="combobox"
              aria-expanded={total > 0}
              aria-controls="search-results"
              aria-activedescendant={
                active >= 0 ? `search-item-${active}` : undefined
              }
              aria-label={t('label')}
              placeholder={t('placeholder')}
              autoComplete="off"
              enterKeyHint="search"
              className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-black/40 sm:text-lg"
            />
            {loading && (
              <Loader2Icon
                className="size-4 shrink-0 animate-spin text-black/50"
                aria-label={t('searching')}
              />
            )}
            {input && (
              <button
                type="button"
                onClick={() => {
                  setInput('')
                  setActive(-1)
                  inputRef.current?.focus()
                }}
                aria-label={t('clear')}
                className="shrink-0 cursor-pointer rounded-full p-1 text-black/60 hover:bg-black/5"
              >
                <XIcon className="size-4" />
              </button>
            )}
            <button
              type="button"
              onClick={close}
              className="shrink-0 cursor-pointer rounded-md border border-black/15 px-3 py-1.5 text-xs font-medium hover:bg-black/5"
            >
              {t('close')}
            </button>
          </div>
        </div>

        {/* results */}
        <div
          id="search-results"
          role="listbox"
          aria-label={t('label')}
          className="min-h-0 overflow-y-auto"
        >
          <div className="container-wrapper py-4">
            {!canSearch && (
              <div>
                <p className="text-black/60">{t('minChars')}</p>
                {!query && fallbackCategories.length > 0 && (
                  <div className="mt-5">
                    <p className="mb-2 text-xs font-semibold tracking-wider text-black/50 uppercase">
                      {t('browseCategories')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {fallbackCategories.map((category) => (
                        <Link
                          key={category.slug}
                          href={`/${locale}/products?category=${category.slug}`}
                          onClick={close}
                          className="rounded-full border border-black/15 px-3.5 py-1.5 hover:bg-black/5"
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {loading && <p className="text-black/60">{t('searching')}</p>}

            {current?.status === 'error' && (
              <p className="text-red-600">{t('error')}</p>
            )}

            {settled && current?.status === 'ok' && total === 0 && (
              <div>
                <p className="font-medium">
                  {t('noResults', { query: debounced })}
                </p>
                <p className="mt-1 text-black/60">{t('noResultsHint')}</p>
              </div>
            )}

            {total > 0 && (
              <div className="space-y-5">
                {groups.map((group) => (
                  <section key={group.label}>
                    <h3 className="mb-1.5 text-xs font-semibold tracking-wider text-black/50 uppercase">
                      {group.label}
                    </h3>
                    <ul>
                      {group.entries.map((entry) => {
                        const index = entries.indexOf(entry)
                        return (
                          <li
                            key={entry.key}
                            id={`search-item-${index}`}
                            role="option"
                            aria-selected={active === index}
                          >
                            <Link
                              href={entry.href}
                              onClick={close}
                              onMouseEnter={() => setActive(index)}
                              className={cn(
                                'flex items-center gap-3 rounded-md p-2',
                                active === index
                                  ? 'bg-black/5'
                                  : 'hover:bg-black/5',
                              )}
                            >
                              {entry.thumb !== undefined && (
                                <span className="relative size-12 shrink-0 overflow-hidden rounded bg-black/5">
                                  <SafeImage
                                    src={entry.thumb}
                                    alt=""
                                    fill
                                    sizes="48px"
                                    className="object-cover"
                                  />
                                </span>
                              )}
                              <span className="min-w-0">
                                <span className="block truncate font-medium">
                                  {entry.title}
                                </span>
                                {entry.subtitle && (
                                  <span className="block truncate text-xs text-black/55">
                                    {entry.subtitle}
                                  </span>
                                )}
                              </span>
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </section>
                ))}

              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
