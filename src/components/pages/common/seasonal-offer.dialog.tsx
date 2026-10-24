'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useSeasonalOffer } from '@/context/seasonal-offer.context'
import type { LocaleType } from '@/i18n/types'
import { useLocale } from 'next-intl'
import SeasonalOfferContent from './seasonal-offer-content'

export default function SeasonalOfferDialog() {
  const locale = useLocale() as LocaleType
  const { open, data, close } = useSeasonalOffer()
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  if (!data?.is_visible) return null

  const buttonHref = data.button_link.startsWith('/')
    ? `/${locale}${data.button_link}`
    : data.button_link

  return (
    <Dialog
      open={open}
      onOpenChange={(next, eventDetails) => {
        if (next) return
        if (eventDetails.reason !== 'close-press') {
          eventDetails.cancel()
          return
        }
        close()
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="flex h-100 w-auto rounded-sm p-1.5 sm:max-w-[calc(100%-2rem)]"
      >
        <SeasonalOfferContent
          media={data.media}
          badge={data.badge}
          buttonText={pick(data.button_text, data.button_text_ar)}
          buttonHref={buttonHref}
        />
      </DialogContent>
    </Dialog>
  )
}
