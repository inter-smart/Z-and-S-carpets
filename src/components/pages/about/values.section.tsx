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
      <div className="container-wrapper our-section-gap grid items-center gap-15 lg:gap-20 xl:grid-cols-[1.1fr_0.9fr] xl:gap-10">
        <div>
          <h2 id="values-title" className="our-heading">
            {t('title')}
          </h2>
          <p className="mt-4 text-lg">{t('body')}</p>
          <div className="mt-8 flex flex-col gap-2 min-[500px]:flex-row min-[500px]:max-md:flex-wrap lg:max-2xl:flex-wrap">
            {values.map((value, index) => (
              <div
                key={index}
                className="group ltr:font-nobile rtl:font-cairo flex h-fit w-full cursor-default items-end justify-center rounded-md border border-[#D7D7D7] bg-white px-5 py-2 text-base font-medium text-black transition-colors duration-300 hover:bg-[#0066B3] hover:text-white sm:w-41"
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
        <div className="relative h-60 w-full overflow-hidden rounded-md">
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
