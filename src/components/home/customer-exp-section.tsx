'use client'

import type { LocaleType } from '@/i18n/types'
import AutoScroll from 'embla-carousel-auto-scroll'
import useEmblaCarousel from 'embla-carousel-react'
import { useLocale, useTranslations } from 'next-intl'
import { useCallback } from 'react'
import { Button } from '../ui/button'
import { OurIcon } from '../ui/icon'

interface CustomerReviewType {
  quote: string
  name: string
  role: string
  avatar: string
}

function ReviewCard({ review }: { review: CustomerReviewType }) {
  return (
    // <article className="group border-border bg-background flex min-h-64 w-[min(86vw,396px)] shrink-0 flex-col justify-between rounded-lg border p-7 hover:border-[#0066B3] sm:w-full">
    <article className="group border-border bg-background flex h-full shrink-0 flex-col justify-between rounded-lg border p-7 hover:border-[#0066B3]">
      <div>
        <div
          aria-hidden="true"
          className="group-hover:text-our-purple font-serif text-3xl leading-8 text-[#B3B3B3] transition-colors"
        >
          {/* &ldquo; */}
          <OurIcon name="quote" />
        </div>
        <p className="text-foreground/80 mt-5 text-sm leading-6">
          {review.quote}
        </p>
      </div>
      <div className="mt-7 flex items-center gap-3">
        <img
          src={review.avatar}
          alt=""
          className="size-14 rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{review.name}</p>
          <p className="text-muted-foreground text-sm">{review.role}</p>
        </div>
      </div>
    </article>
  )
}

export default function CustomerExpSection() {
  const locale = useLocale() as LocaleType

  const t = useTranslations('HomePage.CustomerExpSection')
  const reviews = t.raw('reviews') as CustomerReviewType[]

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: 'start',
      direction: locale === 'ar' ? 'rtl' : 'ltr',
    },
    [
      AutoScroll({
        speed: 1,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      }),
    ],
  )

  // hover effects
  const handleMouseEnter = useCallback(() => {
    emblaApi?.plugins().autoScroll?.stop()
  }, [emblaApi])

  const handleMouseLeave = useCallback(() => {
    emblaApi?.plugins().autoScroll?.play()
  }, [emblaApi])

  // button effects
  const scrollPrev = useCallback(() => {
    if (!emblaApi) return

    const autoScroll = emblaApi.plugins().autoScroll

    autoScroll?.stop()

    const onSettle = () => {
      autoScroll?.play()
      emblaApi.off('settle', onSettle)
    }

    emblaApi.on('settle', onSettle)
    emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (!emblaApi) return

    const autoScroll = emblaApi.plugins().autoScroll

    autoScroll?.stop()

    const onSettle = () => {
      autoScroll?.play()
      emblaApi.off('settle', onSettle)
    }

    emblaApi.on('settle', onSettle)
    emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section
      className="py-16 sm:py-24"
      aria-labelledby="customer-experiences-title"
    >
      {/* header */}
      <div className="container-wrapper flex flex-col items-start gap-3 pb-10 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <h2 id="customer-experiences-title" className="section-title">
          {t('title')}
        </h2>
        <div
          className="flex shrink-0 items-center gap-3"
          aria-label={`${t('rating')} on Google`}
        >
          {/* <Image src={GoogleIcon} alt="google icon" className="h-auto w-9" /> */}
          <OurIcon name="google" className="size-9" />
          <div>
            <p className="text-muted-foreground text-xs">{t('rating')}</p>
            <p
              className="tracking-[0.22em] text-orange-500"
              aria-label="5 out of 5 stars"
            >
              ★★★★★
            </p>
          </div>
        </div>
      </div>

      {/* main content */}
      <div className="relative">
        {/* carousal container */}
        <div className="container mx-auto">
          <div
            ref={emblaRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="overflow-hidden"
          >
            <div className="-ms-2.5 flex">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="min-w-0 shrink-0 grow-0 basis-full ps-2.5 sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* over layer with btns-desktop */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-full">
          <div className="container-wrapper relative h-full">
            <div className="relative h-full">
              {/* w-5 sm:w-10 md:w-15 lg:w-20 */}
              <div className="pointer-events-auto absolute top-0 right-full h-full w-5 bg-linear-to-r from-white to-white/0 sm:w-10 md:w-15 lg:w-20"></div>
              <div className="pointer-events-auto absolute top-0 left-full h-full w-5 bg-linear-to-l from-white to-white/0 sm:w-10 md:w-15 lg:w-20"></div>
              {/* Desktop Previous */}
              <div className="absolute top-1/2 -left-8 hidden -translate-y-1/2 sm:block md:-left-10 rtl:-right-8 rtl:left-auto rtl:md:-right-10">
                <Button
                  type="button"
                  variant="ghost"
                  aria-label="Previous collection"
                  onClick={scrollPrev}
                  className="text-our-purple hover:text-our-purple pointer-events-auto cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
                >
                  {/* LTR */}
                  <OurIcon name="arrow-left" className="ltr:block rtl:hidden" />
                  {/* RTL */}
                  <OurIcon
                    name="arrow-right"
                    className="ltr:hidden rtl:block"
                  />
                </Button>
              </div>
              {/* Desktop Next */}
              <div className="absolute top-1/2 -right-8 hidden -translate-y-1/2 sm:block md:-right-10 rtl:right-auto rtl:-left-8 rtl:md:-left-10">
                <Button
                  type="button"
                  variant="ghost"
                  aria-label="Next collection"
                  onClick={scrollNext}
                  className="text-our-purple hover:text-our-purple pointer-events-auto cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
                >
                  {/* LTR */}
                  <OurIcon
                    name="arrow-right"
                    className="ltr:block rtl:hidden"
                  />
                  {/* RTL */}
                  <OurIcon name="arrow-left" className="ltr:hidden rtl:block" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* btn - mobile */}
      <div className="mt-2 flex justify-center gap-2 sm:hidden">
        <Button
          aria-label="Previous products"
          variant="ghost"
          size="icon"
          onClick={scrollPrev}
          className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
        >
          {/* LTR */}
          <OurIcon name="arrow-left" className="ltr:block rtl:hidden" />
          {/* RTL */}
          <OurIcon name="arrow-right" className="ltr:hidden rtl:block" />
        </Button>
        <Button
          aria-label="Next products"
          variant="ghost"
          size="icon"
          onClick={scrollNext}
          className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
        >
          {/* LTR */}
          <OurIcon name="arrow-left" className="ltr:hidden rtl:block" />
          {/* RTL */}
          <OurIcon name="arrow-right" className="ltr:block rtl:hidden" />
        </Button>
      </div>
    </section>
  )
}
