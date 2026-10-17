import type { LocaleType } from '@/i18n/types'
import type { ServicesData } from '@/types/services'
import { useLocale } from 'next-intl'
import Link from 'next/link'

interface IntroSectionProps {
  data: ServicesData['introduction_section']
}

export default function IntroSection({ data }: IntroSectionProps) {
  const locale = useLocale() as LocaleType
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  return (
    <section className="bg-[#EFF9FE]">
      <div className="container-wrapper grid gap-10 py-15 lg:grid-cols-[0.80fr_1.20fr] lg:gap-20 xl:gap-24">
        <h1
          className="our-heading"
          dangerouslySetInnerHTML={{
            __html: pick(data.title, data.title_ar),
          }}
        />
        <div className="text-[12px] leading-[1.55] text-[#252525] sm:text-[13px]">
          <div
            className="text-base [&_p]:mb-5"
            dangerouslySetInnerHTML={{
              __html: pick(data.description, data.description_ar),
            }}
          />
          {data.items.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
              {data.items.map((item) => (
                <Link
                  key={item.id}
                  href={`/${locale}/works?industry=${item.slug}`}
                  className="pb-1 text-lg font-normal underline decoration-1 underline-offset-4 hover:text-[#037EDA]"
                >
                  {pick(item.title, item.title_ar)}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
