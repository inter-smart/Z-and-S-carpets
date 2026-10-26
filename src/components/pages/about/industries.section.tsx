import type { LocaleType } from '@/i18n/types'
import type { AboutData } from '@/types/about'
import { useLocale } from 'next-intl'
import Image from 'next/image'

interface IndustriesSectionProps {
  data: AboutData['industry_section']
}

export default function IndustriesSection({ data }: IndustriesSectionProps) {
  const locale = useLocale() as LocaleType
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  const industries = data.list.map((item) => ({
    id: item.id,
    title: pick(item.title, item.title_ar),
    description: pick(item.description, item.description_ar),
    icon: item.media.path,
    alt: pick(item.media.alt, item.media.alt_ar),
  }))

  return (
    <section className="bg-[#EFF9FE]" aria-labelledby="industries-title">
      <div className="container-wrapper our-section-gap grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 xl:gap-26">
        <div className="flex flex-col">
          <h2 id="industries-title" className="our-heading">
            {pick(data.title, data.title_ar)}
          </h2>
          <div
            className="mt-5 text-lg"
            dangerouslySetInnerHTML={{
              __html: pick(data.description, data.description_ar),
            }}
          />
          <div className="relative mt-10 h-64 w-full overflow-hidden rounded-md lg:h-48">
            {data.media.path && (
              <Image
                src={data.media.path}
                alt={
                  pick(data.media.alt, data.media.alt_ar) ||
                  pick(data.title, data.title_ar)
                }
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-0 py-2 pe-5">
          {industries.map((item, index) => (
            <article
              key={item.id}
              // className={`py-1 ${index > 0 ? 'border-t border-[#d7e0e4] pt-6' : ''} ${index < industries.length - 1 ? 'pb-7' : ''}`}
              className="flex-col"
            >
              {index > 0 && <hr className="my-5 border" />}
              <div className="flex items-center gap-5 text-xl font-semibold">
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={24}
                    height={24}
                    className="size-6 object-contain"
                  />
                )}
                <h3 className="">{item.title}</h3>
              </div>
              <div
                className="mt-3 text-lg text-[#636465]"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
