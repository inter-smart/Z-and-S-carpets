'use client'

import BlogItemCard from '@/components/common/blog-item.card'
import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import { pickLocalized } from '@/lib/blogs'
import type { BlogCard } from '@/types/blog'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { useLocale } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'

interface RelatedBlogsSectionProps {
  blogs: BlogCard[]
  heading: { title: string; title_ar: string }
}

export default function RelatedBlogsSection({
  blogs,
  heading,
}: RelatedBlogsSectionProps) {
  const locale = useLocale() as LocaleType

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      direction: locale === 'ar' ? 'rtl' : 'ltr',
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  )

  // #Prev/Next
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const updateButtons = () => {
      setCanPrev(emblaApi.canScrollPrev())
      setCanNext(emblaApi.canScrollNext())
    }

    updateButtons()

    emblaApi.on('select', updateButtons)
    emblaApi.on('reInit', updateButtons)

    return () => {
      emblaApi.off('select', updateButtons)
      emblaApi.off('reInit', updateButtons)
    }
  }, [emblaApi])

  return (
    <section className="bg-[#EFF9FE] py-12 lg:py-20">
      <div className="container-wrapper">
        {/* header */}
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6 xl:items-center">
          <h2 className="our-heading">
            {pickLocalized(locale, heading.title, heading.title_ar)}
          </h2>
        </div>
        <div className="relative mt-10">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="-ms-4 flex">
              {blogs.map((blog) => {
                return (
                  <div
                    key={blog.slug}
                    className="min-w-0 shrink-0 grow-0 basis-full ps-4 md:basis-1/2"
                  >
                    <BlogItemCard article={blog} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* btns */}
          {/* Desktop Previous */}
          <div className="absolute top-1/2 -left-10 hidden -translate-y-1/2 lg:block rtl:-right-10 rtl:left-auto">
            <Button
              type="button"
              variant="ghost"
              aria-label="Previous collection"
              onClick={scrollPrev}
              disabled={!canPrev}
              className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
            >
              {/* LTR */}
              <OurIcon name="arrow-left" className="ltr:block rtl:hidden" />
              {/* RTL */}
              <OurIcon name="arrow-right" className="ltr:hidden rtl:block" />
            </Button>
          </div>

          {/* Desktop Next */}
          <div className="absolute top-1/2 -right-10 hidden -translate-y-1/2 lg:block rtl:right-auto rtl:-left-10">
            <Button
              type="button"
              variant="ghost"
              aria-label="Next collection"
              onClick={scrollNext}
              disabled={!canNext}
              className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
            >
              {/* LTR */}
              <OurIcon name="arrow-right" className="ltr:block rtl:hidden" />
              {/* RTL */}
              <OurIcon name="arrow-left" className="ltr:hidden rtl:block" />
            </Button>
          </div>
        </div>

        {/* btn mobile */}
        <div className="mt-2 flex justify-center gap-2 lg:hidden">
          <Button
            aria-label="Previous products"
            variant="ghost"
            size="icon"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
          >
            {/* LTR */}
            <OurIcon name="arrow-left" className="hidden ltr:block" />
            {/* RTL */}
            <OurIcon name="arrow-right" className="hidden rtl:block" />
          </Button>
          <Button
            aria-label="Next products"
            variant="ghost"
            size="icon"
            onClick={scrollNext}
            disabled={!canNext}
            className="text-our-purple hover:text-our-purple cursor-pointer hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!"
          >
            {/* LTR */}
            <OurIcon name="arrow-right" className="hidden ltr:block" />
            {/* RTL */}
            <OurIcon name="arrow-left" className="hidden rtl:block" />
          </Button>
        </div>
      </div>
    </section>
  )
}
