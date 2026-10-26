'use client'

import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { XIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSyncExternalStore } from 'react'

export interface SeasonalOfferContentData {
  media: { path: string | null }
  mobileMedia?: { path: string | null }
  badge: { path: string | null }
  buttonText: string
  buttonHref: string
}

export default function SeasonalOfferContent({
  media,
  mobileMedia,
  badge,
  buttonText,
  buttonHref,
}: SeasonalOfferContentData) {
  return (
    <>
      <DialogClose className="absolute top-2 right-2 z-50 focus:ring-0 focus:outline-none">
        <XIcon className="size-4" />
      </DialogClose>
      <div className="relative h-full w-full text-black">
        <div className="relative h-full w-full overflow-hidden rounded-sm">
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
              fill
              sizes="(max-width: 640px) 90vw, 800px"
              className={`z-10 object-cover ${mobileMedia?.path ? 'max-sm:hidden' : ''}`}
            />
          )}
          {mobileMedia?.path && (
            <Image
              src={mobileMedia.path}
              alt={buttonText}
              fill
              sizes="90vw"
              className="z-10 object-cover sm:hidden"
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
          <div className="absolute -top-20 left-8 z-30 h-35 w-35 rounded-full bg-white sm:-top-10 rtl:right-8 rtl:left-auto">
            <div className="bg-our-green relative ms-auto h-33 w-33 overflow-hidden rounded-full">
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

// The dialog body only mounts on open, so its images would start downloading (and being optimized)
// at that moment. This warms the browser cache with the exact variant the dialog will request.
export function SeasonalOfferPreload({
  media,
  mobileMedia,
  badge,
}: Pick<SeasonalOfferContentData, 'media' | 'mobileMedia' | 'badge'>) {
  // null on the server / first render so nothing is fetched before we know the viewport
  const mobile = useSyncExternalStore(
    () => () => {},
    () => window.matchMedia('(max-width: 639px)').matches,
    () => null,
  )

  if (mobile === null) return null

  const main = mobile && mobileMedia?.path ? mobileMedia.path : media.path

  return (
    <div hidden aria-hidden="true">
      {main && (
        <Image
          src={main}
          alt=""
          fill
          loading="eager"
          fetchPriority="low"
          sizes={mobile ? '90vw' : '(max-width: 640px) 90vw, 800px'}
        />
      )}
      {badge.path && (
        <Image
          src={badge.path}
          alt=""
          fill
          loading="eager"
          fetchPriority="low"
          sizes="132px"
        />
      )}
    </div>
  )
}
