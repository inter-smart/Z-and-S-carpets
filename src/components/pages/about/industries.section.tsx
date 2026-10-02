import { type OurIconName, OurIcon } from '@/components/ui/icon'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function IndustriesSection() {
  const t = useTranslations('AboutPage.IndustriesSection')
  const industries = t.raw('items') as {
    title: string
    description: string
    icon: OurIconName
  }[]

  return (
    <section className="bg-[#EFF9FE]" aria-labelledby="industries-title">
      <div className="container-wrapper our-section-gap grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20 xl:gap-26">
        <div className="flex flex-col">
          <h2 id="industries-title" className="our-heading">
            {t('title')}
          </h2>
          <p className="mt-5 text-lg">{t('body')}</p>
          <div className="relative mt-10 h-64 w-full overflow-hidden rounded-md lg:h-48">
            <Image
              src={t('image')}
              alt="Bright modern interior with wood flooring and plants"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-0 py-2 pe-5">
          {industries.map((item, index) => (
            <article
              key={item.title}
              // className={`py-1 ${index > 0 ? 'border-t border-[#d7e0e4] pt-6' : ''} ${index < industries.length - 1 ? 'pb-7' : ''}`}
              className="flex-col"
            >
              {index > 0 && <hr className="my-5 border" />}
              <div className="flex items-center gap-5 text-xl font-semibold">
                <OurIcon name={item.icon} className="text-our-purple size-6" />
                <h3 className="">{item.title}</h3>
              </div>
              <p className="mt-3 text-lg text-[#636465]">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
