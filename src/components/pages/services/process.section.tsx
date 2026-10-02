import { OurIcon, type OurIconName } from '@/components/ui/icon'
import { useTranslations } from 'next-intl'

export default function ProcessSection() {
  const t = useTranslations('ServicesPage.ProcessSection')

  const items = t.raw('items') as {
    title: string
    description: string
    icon: OurIconName
  }[]

  return (
    <section
      className="bg-[#023260] pt-6 pb-20 text-white lg:pt-8 lg:pb-25"
      aria-labelledby="process-title"
    >
      <div className="container-wrapper">
        <p className="font-cairo text-center text-[4rem] leading-14 font-bold tracking-widest text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.03)] sm:text-[5rem] sm:leading-18">
          {t('eyebrow')}
        </p>
        <h2
          id="process-title"
          className="our-heading -mt-7 text-center sm:-mt-8"
        >
          {t('title')}
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 md:gap-10 xl:grid-cols-4 xl:gap-5 2xl:gap-10">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-sm border border-white/10 bg-white/8 p-5 pb-10 shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
            >
              <div>
                <OurIcon name={item.icon} className="size-10" />
              </div>
              <h3 className="mt-12 text-2xl font-medium">{item.title}</h3>
              <p className="mt-3 text-lg leading-6 text-[#E3E3E3]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
