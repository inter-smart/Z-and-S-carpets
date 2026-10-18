'use client'

import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import { formatBlogDate, pickLocalized } from '@/lib/blogs'
import type { BlogDetailData } from '@/types/blog'
import { cn } from 'cn'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import BlogImgCarousal from './blog-img.carousal'

function splitByCharLength(tags: string[]): [string[], string[]] {
  const totalLen = tags.reduce((sum, t) => sum + t.length, 0)
  const target = totalLen / 2

  let currentLen = 0
  let splitIdx = tags.length

  for (let i = 0; i < tags.length; i++) {
    currentLen += tags[i].length
    if (currentLen >= target) {
      splitIdx = i + 1
      break
    }
  }

  return [tags.slice(0, splitIdx), tags.slice(splitIdx)]
}

interface BlogDetailsSectionProps {
  article: BlogDetailData
  // the article body, already in the visitor's language and split at the `[gallery]` marker
  contentBefore: string
  contentAfter: string
}

export function BlogDetailsSection({
  article,
  contentBefore,
  contentAfter,
}: BlogDetailsSectionProps) {
  const locale = useLocale() as LocaleType

  // #TAG ROW SCROLL
  const tagRowRef = useRef<HTMLDivElement>(null)
  const [isTagRowScrollable, setIsTagRowScrollable] = useState(false)

  const scrollTagRow = (direction: 'left' | 'right') => {
    tagRowRef.current?.scrollBy({
      left: direction === 'left' ? -200 : 200,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const container = tagRowRef.current
    if (!container) return

    const canScrollX = container.scrollWidth > container.clientWidth
    const canScrollY = container.scrollHeight > container.clientHeight

    setIsTagRowScrollable(canScrollX || canScrollY)
  }, [])

  const title = pickLocalized(locale, article.title, article.title_ar)
  const author = pickLocalized(locale, article.author, article.author_ar)
  const tags = article.tags.map((tag) =>
    pickLocalized(locale, tag.title, tag.title_ar),
  )
  const articleTags = splitByCharLength(tags)

  return (
    <section className="container-wrapper pt-10">
      <article className="rounded-md border border-[#BABABA] px-5 py-7 lg:px-8 lg:py-10">
        {article.media.path && (
          <Image
            src={article.media.path}
            alt={
              pickLocalized(locale, article.media.alt, article.media.alt_ar) ||
              title
            }
            width={880}
            height={580}
            priority
            className="mb-5 h-70 w-full rounded-sm object-cover md:float-right md:ms-10 md:h-60 md:w-3/7 xl:ms-20 xl:mb-10 xl:h-80 rtl:md:float-left"
          />
        )}
        <p className="text-our-purple text-sm">
          • {formatBlogDate(article.published_at, locale)}
          {author && ` | ${author}`}
        </p>

        <div className="xl:w-110 2xl:w-130">
          <h1 className="mt-3 text-5xl leading-7 font-semibold">{title}</h1>
        </div>

        {tags.length > 0 && (
          <div className="relative md:w-75 lg:w-95 xl:w-110 2xl:w-130">
            <div
              ref={tagRowRef}
              className="mt-4 flex scrollbar-none flex-col gap-1 overflow-x-auto scroll-smooth ltr:pb-1 rtl:gap-2 rtl:py-1"
            >
              {articleTags.map(
                (row, rowIndex) =>
                  row.length > 0 && (
                    <p key={rowIndex} className="space-x-1">
                      {row.map((tag, i) => (
                        <span
                          key={i}
                          className="rounded border border-[#CCCCCC] px-2 py-1 text-sm whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </p>
                  ),
              )}
            </div>
            {/* LEFT ARROW */}
            <div className="absolute top-0 -left-4 h-full lg:-left-5">
              <Button
                aria-label="Scroll left"
                variant="ghost"
                onClick={() => scrollTagRow('left')}
                className={cn(
                  'text-our-purple hover:text-our-purple flex h-full cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!',
                  !isTagRowScrollable && 'hidden',
                )}
              >
                <ChevronLeftIcon className="size-2.5" />
              </Button>
            </div>
            {/* RIGHT ARROW */}
            <div className="absolute top-0 -right-4 h-full lg:-right-5">
              <Button
                aria-label="Scroll right"
                variant="ghost"
                onClick={() => scrollTagRow('right')}
                className={cn(
                  'text-our-purple hover:text-our-purple flex h-full cursor-pointer p-0! hover:bg-transparent focus-visible:border-transparent! focus-visible:ring-0!',
                  !isTagRowScrollable && 'hidden',
                )}
              >
                <ChevronRightIcon className="size-2.5" />
              </Button>
            </div>
          </div>
        )}

        {/* the article (rich text from the admin): its bullet lists show with check icons */}
        <div
          className="blog-body blog-body-start check-list mt-9"
          dangerouslySetInnerHTML={{ __html: contentBefore }}
        />
        {article.images.length > 0 && (
          <BlogImgCarousal images={article.images} title={title} />
        )}
        {contentAfter && (
          <div
            className="blog-body check-list"
            dangerouslySetInnerHTML={{ __html: contentAfter }}
          />
        )}
      </article>
    </section>
  )
}
