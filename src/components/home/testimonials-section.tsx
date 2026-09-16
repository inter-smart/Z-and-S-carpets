import { GoogleIcon } from '@/assets/icons'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface TestimonialReviewType {
  quote: string
  name: string
  role: string
  avatar: string
}

function ReviewCard({ review }: { review: TestimonialReviewType }) {
  return (
    <article className="group border-border bg-background flex min-h-64 w-[min(86vw,396px)] shrink-0 flex-col justify-between rounded-lg border p-7 hover:border-[#0066B3] sm:w-99">
      <div>
        <div
          aria-hidden="true"
          className="text-primary/30 font-serif text-8xl leading-8 transition-colors group-hover:text-[#812990]"
        >
          &ldquo;
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

export default function TestimonialsSection() {
  const t = useTranslations('testimonials')

  const reviews = t.raw('reviews') as TestimonialReviewType[]

  const loopedReviews = [...reviews, ...reviews]

  return (
    <section
      className="bg-background overflow-hidden py-16 sm:py-24"
      aria-labelledby="customer-experiences-title"
    >
      <div className="container-wrapper flex flex-col items-start gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
        <h2 id="customer-experiences-title" className="section-title">
          {t('title')}
        </h2>
        <div
          className="flex shrink-0 items-center gap-3"
          aria-label={`${t('rating')} on Google`}
        >
          <Image src={GoogleIcon} alt="google icon" className="h-auto w-9" />
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
      <div
        className="focus-within:[&>div]:paused hover:[&>div]:paused mt-10 overflow-hidden"
        tabIndex={0}
        aria-label="Customer testimonials"
      >
        <div className="ltr:motion-safe:animate-testimonial-scroll-ltr rtl:motion-safe:animate-testimonial-scroll-rtl flex w-max gap-2.5 motion-reduce:animate-none">
          {loopedReviews.map((review, index) => (
            <ReviewCard key={`${review.name}-${index}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
