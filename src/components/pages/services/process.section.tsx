import type { LocaleType } from '@/i18n/types'
import type { ServicesData } from '@/types/services'
import { useLocale } from 'next-intl'
import Image from 'next/image'

interface ProcessSectionProps {
  data: ServicesData['process_steps_section']
}

export default function ProcessSection({ data }: ProcessSectionProps) {
  const locale = useLocale() as LocaleType
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  const title = pick(data.title, data.title_ar)
  // faint text behind the heading; the heading itself when none is set
  const eyebrow = pick(data.bg_title, data.bg_title_ar) || title

  return (
    <section
      className="bg-[#023260] pt-6 pb-20 text-white lg:pt-8 lg:pb-25"
      aria-labelledby="process-title"
    >
      <div className="container-wrapper">
        <p className="font-cairo text-center text-[4rem] leading-14 font-bold tracking-widest text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.03)] sm:text-[5rem] sm:leading-18">
          {eyebrow}
        </p>
        <h2
          id="process-title"
          className="our-heading -mt-7 text-center sm:-mt-8"
        >
          {title}
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:gap-10 xl:grid-cols-4 xl:gap-5 2xl:gap-10">
          {data.list.map((item) => (
            <article
              key={item.id}
              className="rounded-sm border border-white/10 bg-white/8 p-5 pb-10 shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
            >
              {item.media.path && (
                <Image
                  src={item.media.path}
                  alt={pick(item.media.alt, item.media.alt_ar) || title}
                  width={40}
                  height={40}
                  className="size-10 object-contain brightness-0 invert"
                />
              )}
              <h3 className="mt-12 text-2xl font-medium">
                {pick(item.title, item.title_ar)}
              </h3>
              <div
                className="mt-3 text-lg leading-6 text-[#E3E3E3]"
                dangerouslySetInnerHTML={{
                  __html: pick(item.description, item.description_ar),
                }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
