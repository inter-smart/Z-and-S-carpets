import { cn } from 'cn'
import { CircleCheckIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ServiceType {
  number: string
  title: string
  description: string
  features: string[]
}

const ServiceCard = ({
  service,
  className,
}: {
  service: ServiceType
  className?: string
}) => (
  <article
    key={service.number}
    className={cn('space-y-5 border-[#002C4D]/20 py-10', className)}
  >
    <p className="text-our-blue/20 text-9xl leading-none font-bold">
      {service.number}
    </p>
    <h3 className="our-heading text-3xl!">{service.title}</h3>
    <p className="our-text text-base leading-5">{service.description}</p>
    <ul className="space-y-3">
      {service.features.map((feature) => (
        <li
          key={feature}
          className="our-text flex items-center gap-3 text-base leading-5"
        >
          <CircleCheckIcon size={16} className="text-our-blue stroke-1" />
          {feature}
        </li>
      ))}
    </ul>
  </article>
)

export default function ServicesGridSection() {
  const t = useTranslations('ServicesPage.ServicesSection')

  const service = t.raw('service') as ServiceType[]

  return (
    <section
      className="container-wrapper py-16 lg:py-20"
      aria-labelledby="services-title"
    >
      <h2 id="services-title" className="our-heading text-center">
        {t('title.lineOne')},
        <br />
        {t('title.lineTwo')}
      </h2>
      <div className="mt-10 grid md:grid-cols-2">
        <ServiceCard
          service={service[0]}
          className="md:border-e md:ps-6 md:pe-12 md:pt-6 md:pb-12"
        />
        <ServiceCard
          service={service[1]}
          className="border-t md:border-none md:ps-12 md:pe-6 md:pt-6 md:pb-12"
        />
        <ServiceCard
          service={service[2]}
          className="border-t md:border-e md:ps-6 md:pe-12 md:pt-12 md:pb-6"
        />
        <ServiceCard
          service={service[3]}
          className="border-t md:ps-12 md:pe-6 md:pt-12 md:pb-6"
        />
      </div>
    </section>
  )
}
