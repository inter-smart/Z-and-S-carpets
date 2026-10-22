'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import { useDownloadRequest } from '@/context/download-request.context'
import type { LocaleType } from '@/i18n/types'
import { pickLocalized } from '@/lib/product-detail'
import type { DownloadItem } from '@/types/download'
import { useLocale, useTranslations } from 'next-intl'

export default function DownloadsCardSection({
  downloads,
}: {
  downloads: DownloadItem[]
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('DownloadsPage.CardSection')
  const { openDownloadRequest } = useDownloadRequest()

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
    </section>
  )
}
