'use client'

import LookingForwardCard from '@/components/common/looking-forward.card'
import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import type { HomeData } from '@/types/home'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useState, type CSSProperties } from 'react'

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

interface TrustedPartnerSectionProps {
  brands?: HomeData['brands_section']
  cta?: HomeData['cta_section']
}

export default function TrustedPartnerSection({
  brands,
  cta,
}: TrustedPartnerSectionProps) {
  const locale = useLocale() as LocaleType
  const tAlt = useTranslations('Common.ImageAlt')
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  const showBrands = !!brands?.is_visible
  const showCta = !!cta?.is_visible

  const trustedPartners: PartnerType[] = (brands?.list ?? []).flatMap((item) =>
    item.media.path
      ? [
          {
            name: pick(item.media.alt, item.media.alt_ar),
            image: item.media.path,
          },
        ]
      : [],
  )
  const trustedPartnersPaired = chunkPairs(trustedPartners)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      direction: locale === 'ar' ? 'rtl' : 'ltr',
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
      }),
    ],
  )

  // The arrows only show when the carousel can actually scroll. The number of visible slides
  // changes with the breakpoint, so this is re-evaluated on reInit/resize instead of counting items.
  const [canScroll, setCanScroll] = useState(false)

  useEffect(() => {
    if (!emblaApi) return

    const update = () =>
      setCanScroll(emblaApi.canScrollPrev() || emblaApi.canScrollNext())

    update()
    emblaApi.on('reInit', update)
    emblaApi.on('resize', update)
    emblaApi.on('select', update)

    return () => {
      emblaApi.off('reInit', update)
      emblaApi.off('resize', update)
      emblaApi.off('select', update)
    }
  }, [emblaApi])

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  return (
    <div className="container-wrapper section-plain py-16 lg:py-22">
      {showBrands && (
        <>
          {/* heading */}
          <div className="">
            <h2 className="our-heading">
              {pick(brands?.title, brands?.title_ar)}
            </h2>
          </div>

          {/* btns (only when there is something to scroll) */}
          {canScroll && (
            <div className="relative flex justify-end">
              <div className="absolute flex md:-top-5">
                {/* prev btn */}
                <Button
                  aria-label="Previous products"
                  variant="ghost"
                  size="icon"
                  onClick={scrollPrev}
                  className="text-our-blue hover:text-our-blue cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
                >
                  <OurIcon
                    name="arrow-right"
                    className="hidden size-3.5! rtl:block"
                  />
                  <OurIcon
                    name="arrow-left"
                    className="hidden size-3.5! ltr:block"
                  />
                </Button>

                {/* next btn */}
                <Button
                  aria-label="Next products"
                  variant="ghost"
                  size="icon"
                  onClick={scrollNext}
                  className="text-our-blue hover:text-our-blue cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
                >
                  <OurIcon
                    name="arrow-left"
                    className="hidden size-3.5! rtl:block"
                  />
                  <OurIcon
                    name="arrow-right"
                    className="hidden size-3.5! ltr:block"
                  />
                </Button>
              </div>
            </div>
          )}

          {/* main content */}
          {/* --cap = columns visible per breakpoint (2 logos stacked per column, so 7 cols = 14 logos
              at xl). The box is cols/cap of the width, so it hugs few logos with no blank space and
              only spans the full width (and scrolls) once the columns fill it. */}
          {trustedPartnersPaired.length > 0 && (
            <div
              className="mt-8 [--cap:2] min-[400px]:[--cap:3] md:[--cap:4] lg:[--cap:5] xl:[--cap:7]"
              style={
                { '--cols': trustedPartnersPaired.length } as CSSProperties
              }
            >
              <div
                className="w-[min(100%,calc(var(--cols)*100%/var(--cap)))] overflow-hidden rounded-md border border-[#0066B3]/40 bg-[#EFF9FE]/40"
                ref={emblaRef}
              >
                {/* negative end margin hides the last column's divider behind the box border */}
                <div className="flex ltr:-mr-px rtl:-ml-px">
                  {trustedPartnersPaired.map((partner, i) => (
                    <div
                      key={i}
                      className="flex min-w-0 shrink-0 grow-0 basis-[calc(100%/min(var(--cols),var(--cap)))] cursor-grabbing flex-col justify-start border-[#0066B3]/40 ltr:border-r rtl:border-l"
                    >
                      {/* an odd last logo takes the whole column (no empty half-cell, no divider) */}
                      <div
                        className={
                          partner.length > 1
                            ? 'flex h-1/2 w-full items-center justify-center border-b border-[#0066B3]/40'
                            : 'flex w-full flex-1 items-center justify-center'
                        }
                      >
                        {/* <div className="h-auto w-30 xl:w-35"> */}
                        <div className="flex h-30 w-auto items-center justify-center">
                          <Image
                            src={partner[0].image}
                            width={250}
                            height={200}
                            alt={partner[0].name || tAlt('partner')}
                            className="h-auto w-full"
                          />
                        </div>
                      </div>
                      {partner.length > 1 && (
                        <div className="flex h-1/2 w-full items-center justify-center border-[#0066B3]/40">
                          {/* <div className="h-auto w-30 xl:w-35"> */}
                          <div className="flex h-30 w-auto items-center justify-center">
                            <Image
                              src={partner[1].image}
                              width={250}
                              height={200}
                              alt={partner[1].name || tAlt('partner')}
                              className="h-auto w-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {showCta && <LookingForwardCard data={cta} />}
    </div>
  )
}
