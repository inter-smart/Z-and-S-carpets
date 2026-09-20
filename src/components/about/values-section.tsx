import { OurIcon, type OurIconName } from '@/components/ui/icon'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function ValuesSection() {
  const t = useTranslations('AboutPage.ValuesSection')
  const values = t.raw('items') as {
    label: string
    icon: OurIconName
  }[]

  return (
    <section className="bg-[#EFF9FE]" aria-labelledby="values-title">
      <div className="container-wrapper our-section-gap grid items-center gap-15 lg:grid-cols-[1fr_1fr] lg:gap-20 xl:gap-25">
        <div>
          <h2 id="values-title" className="our-heading">
            {t('title')}
          </h2>
          <p className="our-text mt-4">{t('body')}</p>
          <div className="mt-8 flex flex-col gap-4 min-[500px]:flex-row min-[500px]:max-md:flex-wrap lg:max-2xl:flex-wrap">
            {values.map((value, index) => (
              <div
                key={index}
                className="group flex w-full cursor-default items-center justify-center rounded-md border border-[#D7D7D7] bg-white px-3 py-3 text-black transition-colors duration-300 hover:bg-[#0066B3] hover:text-white min-[500px]:max-md:w-50 lg:max-2xl:w-45"
              >
                <OurIcon
                  name={value.icon}
                  className="text-our-purple size-6 pe-1 group-hover:text-white"
                />
                {value.label}
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-68 w-full overflow-hidden rounded-md">
          <Image
            src={t('image')}
            alt="Warm wood flooring in a contemporary showroom"
            fill
            className=""
          />
        </div>
      </div>
    </section>
  )
}
