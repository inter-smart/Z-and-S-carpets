import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export interface SeasonalOfferContentData {
  media: { path: string | null }
  badge: { path: string | null }
  buttonText: string
  buttonHref: string
}

export default function SeasonalOfferContent({
  media,
  badge,
  buttonText,
  buttonHref,
}: SeasonalOfferContentData) {
  return (
    <>
      <DialogClose className="absolute top-2 right-2 z-50 focus:ring-0 focus:outline-none">
        <XIcon className="size-4" />
      </DialogClose>
      <div className="relative h-full text-black">
        <div className="relative h-full overflow-hidden rounded-sm">
          <DialogClose
            nativeButton={false}
            render={
              <Button
                aria-label={buttonText}
                className="absolute inset-0 z-15 h-auto w-auto rounded-none border-none bg-transparent p-0"
                nativeButton={false}
                render={<Link href={buttonHref} />}
              />
            }
          />

          {media.path && (
            <Image
              src={media.path}
              alt={buttonText}
              width={0}
              height={0}
              sizes="(max-width: 640px) 90vw, 800px"
              className="z-10 h-full w-auto max-w-full object-contain"
            />
          )}

          <div className="absolute right-4 bottom-4 z-20 sm:right-5 sm:bottom-5">
            <DialogClose
              nativeButton={false}
              render={
                <Button
                  className="our-btn bg-our-purple px-8!"
                  nativeButton={false}
                  render={<Link href={buttonHref} />}
                >
                  {buttonText}
                </Button>
              }
            />
          </div>
        </div>

        {badge.path && (
          <div className="absolute -top-6 left-8 z-30 h-28 w-28 rounded-full bg-white p-1.5 sm:-top-8 sm:h-33 sm:w-33 rtl:right-8 rtl:left-auto">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src={badge.path}
                alt=""
                fill
                sizes="132px"
                className="object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
