import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { OurIcon } from '../ui/icon'

export default function ManagementSection() {
  const t = useTranslations('AboutPage.ManagementSection')
  const leaders = t.raw('leaders') as {
    role: string
    name: string
    message: string
    company: string
    image: string
  }[]

  return (
    <section className="bg-[#EFF9FE]" aria-labelledby="management-title">
      <div className="container-wrapper our-section-gap">
        <div className="text-center">
          <h2 id="management-title" className="our-heading">
            {t('title')}
          </h2>
          <p className="our-text">{t('subtitle')}</p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {leaders.map((leader, index) => (
            <article
              key={index}
              className="relative overflow-hidden rounded-md bg-[#f7edf8] p-7 max-[500px]:pb-0! sm:p-8"
            >
              <div className="flex flex-col justify-start sm:h-full sm:justify-between">
                <div className="w-full rounded-md bg-white px-7 py-7 min-[500px]:max-w-[80%] sm:max-w-[75%] lg:max-w-full xl:max-w-[80%] 2xl:max-w-[67%]">
                  <p className="our-text">{leader.message}</p>
                  <OurIcon name="quote_2" className="size-10 pt-4" />
                </div>
                <div className="mt-5 lg:max-xl:max-w-[60%]">
                  <p className="our-text">{leader.role}</p>
                  <h3 className="text-2xl font-semibold text-[#023260]">
                    {leader.name}
                  </h3>
                  <p className="our-text">{leader.company}</p>
                </div>
              </div>
              <div className="relative z-10 mt-3 h-70 w-full overflow-hidden min-[500px]:absolute min-[500px]:right-0 min-[500px]:bottom-0 min-[500px]:h-[45%] min-[560px]:h-[60%] sm:h-[70%] md:h-[80%] lg:h-[50%] xl:h-[65%] 2xl:right-2 2xl:h-[85%]">
                <Image
                  src={leader.image}
                  alt={`${leader.name}, ${leader.role}, ${leader.company}`}
                  fill
                  className="object-contain object-center min-[500px]:object-right rtl:min-[500px]:object-left"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
