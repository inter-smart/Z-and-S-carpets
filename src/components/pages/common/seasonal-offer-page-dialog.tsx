'use client'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import SeasonalOfferContent from './seasonal-offer-content'

export default function SeasonalOfferPageDialog({
  triggerLabel,
  media,
  badge,
  buttonText,
  buttonHref,
}: {
  triggerLabel: string
  media: { path: string | null }
  badge: { path: string | null }
  buttonText: string
  buttonHref: string
}) {
  return (
    <Dialog
      onOpenChange={(next, eventDetails) => {
        if (!next && eventDetails.reason !== 'close-press') {
          eventDetails.cancel()
        }
      }}
    >
      <DialogTrigger render={<Button variant="outline">{triggerLabel}</Button>} />
      <DialogContent
        showCloseButton={false}
        className="flex h-100 min-w-[35vw] rounded-sm p-1.5 sm:min-w-150 md:min-w-180 lg:min-w-200"
      >
        <SeasonalOfferContent
          media={media}
          badge={badge}
          buttonText={buttonText}
          buttonHref={buttonHref}
        />
      </DialogContent>
    </Dialog>
  )
}
