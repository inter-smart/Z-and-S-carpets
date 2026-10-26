'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import { useDownloadRequest } from '@/context/download-request.context'
import type { LocaleType } from '@/i18n/types'
import { pickLocalized } from '@/lib/product-detail'
import { DOWNLOADS_PAGE_LIMIT } from '@/lib/api/downloads'
import type { DownloadItem, DownloadsPageData } from '@/types/download'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

export default function DownloadsCardSection({
  initialDownloads,
  initialPage,
  initialHasMore,
}: {
  initialDownloads: DownloadItem[]
  // how many pages the first load already contains (from ?page=)
  initialPage: number
  initialHasMore: boolean
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('DownloadsPage.CardSection')
  const { openDownloadRequest } = useDownloadRequest()

  // first page comes from the server; further pages are appended from the /api/downloads route
  const [downloads, setDownloads] = useState(initialDownloads)
  const [page, setPage] = useState(initialPage)
  const [hasMore, setHasMore] = useState(initialHasMore)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [loadError, setLoadError] = useState(false)

  const loadMore = async () => {
    if (isLoadingMore) return
    const nextPage = page + 1
    setIsLoadingMore(true)
    setLoadError(false)

    try {
      const query = new URLSearchParams({
        page: String(nextPage),
        limit: String(DOWNLOADS_PAGE_LIMIT),
      })
      const response = await fetch(`/api/downloads?${query}`)
      if (!response.ok) throw new Error('Failed to load downloads')
      const data = (await response.json()) as DownloadsPageData

      setDownloads((current) => {
        const known = new Set(current.map((item) => item.id))
        return [...current, ...data.downloads.filter((d) => !known.has(d.id))]
      })
      setPage(nextPage)
      setHasMore(data.pagination.hasMore)

      // keep the loaded page count in the URL so a refresh / shared link shows the same list
      const url = new URL(window.location.href)
      url.searchParams.set('page', String(nextPage))
      window.history.replaceState(null, '', url)
    } catch {
      setLoadError(true)
    } finally {
      setIsLoadingMore(false)
    }
  }

  if (!downloads.length) {
    return (
      <section className="container-wrapper pt-12 pb-20">
        <p className="text-center text-base text-[#555]">{t('noItems')}</p>
      </section>
    )
  }

  return (
    <section className="container-wrapper pt-12 pb-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {downloads.map((item) => (
          <div
            key={item.id}
            className="border-our-blue grid grid-cols-1 gap-5 overflow-hidden rounded-md border p-8 sm:grid-cols-[1fr_auto]"
          >
            <div className="flex gap-5 sm:items-center">
              <div className="bg-our-green/10 h-fit w-fit p-4">
                <OurIcon name="file-open" className="text-our-green size-8" />
              </div>
              <div className="flex-1 space-y-1 md:my-auto lg:my-0">
                <p className="our-heading text-2xl leading-7 font-medium">
                  {pickLocalized(locale, item.title, item.title_ar)}
                </p>
                {(item.description || item.description_ar) && (
                  <p className="text-base">
                    {pickLocalized(
                      locale,
                      item.description,
                      item.description_ar,
                    )}
                  </p>
                )}
              </div>
            </div>
            <Button
              className="our-btn bg-our-purple col-span-2 w-full px-8! sm:col-span-1 sm:my-auto sm:w-fit lg:col-span-2 lg:w-full xl:col-span-1"
              onClick={() =>
                openDownloadRequest({ kind: 'download', download: item })
              }
            >
              {t('downloadBtnLable')}
            </Button>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex w-full justify-center">
          <Button
            variant="outline"
            className="our-btn border-our-blue"
            onClick={loadMore}
            disabled={isLoadingMore}
          >
            {t('loadMoreBtnLable')}
          </Button>
        </div>
      )}
      {loadError && (
        <p className="mt-3 text-center text-sm text-red-600">
          {t('loadMoreError')}
        </p>
      )}
    </section>
  )
}
