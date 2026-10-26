import type { LocaleType } from '@/i18n/types'
import type { AboutData } from '@/types/about'
import { useLocale } from 'next-intl'
import Image from 'next/image'

interface ValuesSectionProps {
  data: AboutData['core_value_section']
}

export default function ValuesSection({ data }: ValuesSectionProps) {
  const locale = useLocale() as LocaleType
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  const values = data.list.map((item) => ({
    id: item.id,
    label: pick(item.title, item.title_ar),
    icon: item.media.path,
    alt: pick(item.media.alt, item.media.alt_ar),
  }))

  return (
    <section className="bg-[#EFF9FE]" aria-labelledby="values-title">
      <div className="container-wrapper our-section-gap grid items-center gap-15 lg:gap-20 xl:grid-cols-[1.1fr_0.9fr] xl:gap-10">
        <div>
          <h2 id="values-title" className="our-heading">
            {pick(data.title, data.title_ar)}
          </h2>
          <div
            className="mt-4 text-lg"
            dangerouslySetInnerHTML={{
              __html: pick(data.description, data.description_ar),
            }}
          />
          <div className="mt-8 flex flex-col gap-2 min-[500px]:flex-row min-[500px]:max-md:flex-wrap lg:max-2xl:flex-wrap">
            {values.map((value) => (
              <div
                key={value.id}
                className="group ltr:font-nobile rtl:font-cairo flex h-fit w-full cursor-default items-end justify-center rounded-md border border-[#D7D7D7] bg-white px-5 py-2 text-base font-medium text-black transition-colors duration-300 hover:bg-[#0066B3] hover:text-white sm:w-41"
              >
                {value.icon && (
                  <Image
                    src={value.icon}
                    alt={value.alt}
                    width={24}
                    height={24}
                    className="size-6 object-contain pe-1"
                  />
                )}
                {value.label}
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-60 w-full overflow-hidden rounded-md">
          {data.media.path && (
            <Image
              src={data.media.path}
              alt={
                pick(data.media.alt, data.media.alt_ar) ||
                pick(data.title, data.title_ar)
              }
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className=""
            />
          )}
        </div>
      </div>
    </section>
  )
}
