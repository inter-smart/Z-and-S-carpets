import { GoogleIcon } from '@/assets/icons'
import type { LocaleType } from '@/i18n/types'
import { font } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

interface TestimonialReviewType {
  quote: string
  name: string
  role: string
  avatar: string
}

function ReviewCard({ review }: { review: TestimonialReviewType }) {
  return (
    <article className="flex min-h-64 w-[min(86vw,396px)] shrink-0 flex-col justify-between rounded-lg border border-border bg-background p-7 sm:w-99 hover:border-[#0066B3]">
      <div>
        <div
          aria-hidden="true"
          className="font-serif text-6xl leading-8 text-primary/30"
        >
          &ldquo;
        </div>
        <p className="mt-5 text-sm leading-6 text-foreground/80">
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
          <p className="text-sm text-muted-foreground">{review.role}</p>
        </div>
      </div>
    </article>
  )
}

export default function TestimonialsSection() {
  const locale = useLocale() as LocaleType

  const t = useTranslations('testimonials')

  const reviews = t.raw('reviews') as TestimonialReviewType[]

  const loopedReviews = [...reviews, ...reviews]

  return (
    <section
      className="overflow-hidden bg-background py-16 sm:py-20"
      aria-labelledby="customer-experiences-title"
    >
      <div className="mx-auto flex max-w-7xl items-start justify-between gap-6 px-6 lg:px-8">
        <h2
          id="customer-experiences-title"
          className={cn(
            'text-balance text-4xl font-medium tracking-tight sm:text-5xl',
            font(locale as LocaleType, {
              en: 'font-nobile',
              ar: 'font-cairo',
            }),
          )}
        >
          {t('title')}
        </h2>
        <div
          className="hidden shrink-0 items-center gap-3 sm:flex"
          aria-label={`${t('rating')} on Google`}
        >
          <Image src={GoogleIcon} alt="google icon" className="w-9 h-auto" />
          <div>
            <p className="text-xs text-muted-foreground">{t('rating')}</p>
            <p
              className="tracking-[0.22em] text-orange-500"
              aria-label="5 out of 5 stars"
            >
              ★★★★★
            </p>
          </div>
        </div>
      </div>
      <div
        className="mt-10 overflow-hidden focus-within:[&>div]:paused hover:[&>div]:paused"
        tabIndex={0}
        aria-label="Customer testimonials"
      >
        <div
          className={cn(
            'flex w-max gap-2.5 motion-reduce:animate-none',
            locale === 'ar'
              ? 'motion-safe:animate-testimonial-scroll-rtl'
              : 'motion-safe:animate-testimonial-scroll-ltr',
          )}
        >
          {loopedReviews.map((review, index) => (
            <ReviewCard key={`${review.name}-${index}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
