'use client'

import { ArrowLeftBlueIcon, ArrowRightBlueIcon } from '@/assets/icons'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback } from 'react'
import LookingForwardBanner from '../common/looking-forward-banner'
import { Button } from '../ui/button'

interface PartnerType {
  name: string
  image: string
}

function chunkPairs(arr: PartnerType[]) {
  const result = []
  for (let i = 0; i < arr.length; i += 2) {
    result.push(arr.slice(i, i + 2))
  }
  return result
}

export default function TrustedPartnerSection() {
  const t = useTranslations('TrustedPartner')
  const trustedPartners = t.raw('partners') as PartnerType[]
  const trustedPartnersPaired = chunkPairs(trustedPartners)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
      }),
    ],
  )

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  return (
    <div className="container-wrapper pb-16 lg:pb-22">
      {/* heading */}
      <div className="">
        <h2 className="section-title">{t('title')}</h2>
      </div>

      {/* btns */}
      <div className="relative flex justify-end">
        <div className="absolute flex gap-2 md:-top-5">
          {/* prev btn */}
          <Button
            aria-label="Previous products"
            variant="ghost"
            size="icon"
            onClick={scrollPrev}
            className="cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
          >
            <Image
              src={ArrowRightBlueIcon}
              alt="arrow-right"
              className="hidden h-3 w-auto rtl:block"
            />
            <Image
              src={ArrowLeftBlueIcon}
              alt="arrow-left"
              className="hidden h-3 w-auto ltr:block"
            />
          </Button>

          {/* next btn */}
          <Button
            aria-label="Next products"
            variant="ghost"
            size="icon"
            onClick={scrollNext}
            className="cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
          >
            <Image
              src={ArrowLeftBlueIcon}
              alt="arrow-left"
              className="hidden h-3 w-auto rtl:block"
            />
            <Image
              src={ArrowRightBlueIcon}
              alt="arrow-right"
              className="hidden h-3 w-auto ltr:block"
            />
          </Button>
        </div>
      </div>

      {/* main content */}
      <div
        className="mt-8 overflow-hidden rounded-md border border-[#0066B3]/40 bg-[#EFF9FE]/40"
        ref={emblaRef}
      >
        <div className="flex">
          {trustedPartnersPaired.map((partner, i) => (
            <div
              key={i}
              className="flex h-72 min-w-0 shrink-0 grow-0 basis-1/2 flex-col justify-start border-[#0066B3]/40 min-[400px]:basis-1/3 lg:basis-1/5 xl:basis-1/7 ltr:border-r rtl:border-l"
            >
              <div className="flex h-1/2 w-full items-center justify-center border-b border-[#0066B3]/40">
                <div className="h-auto w-30 xl:w-35">
                  <Image
                    src={partner[0].image}
                    width={250}
                    height={200}
                    alt="site-logo"
                    className="h-auto w-full cursor-pointer"
                  />
                </div>
              </div>
              {partner.length > 1 && (
                <div className="flex h-1/2 w-full items-center justify-center border-[#0066B3]/40">
                  <div className="h-auto w-30 xl:w-35">
                    <Image
                      src={partner[1].image}
                      width={250}
                      height={200}
                      alt="site-logo"
                      className="h-auto w-full cursor-pointer"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <LookingForwardBanner />
    </div>
  )
}
