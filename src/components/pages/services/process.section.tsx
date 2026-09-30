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
        <p className="font-cairo text-center text-[3.6rem] leading-14 font-bold tracking-widest text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.03)] sm:text-[5.5rem] sm:leading-20 lg:text-[6.5rem] lg:leading-none">
          {t('eyebrow')}
        </p>
        <h2
          id="process-title"
          className="section-title -mt-6 text-center sm:-mt-7 md:-mt-8 lg:-mt-11"
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
              <h3 className="mt-12 text-xl font-medium">{item.title}</h3>
              <p className="our-text mt-3 leading-6 text-white/80">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
