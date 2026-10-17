import type { LocaleType } from '@/i18n/types'
import type { ServicesData } from '@/types/services'
import { cn } from 'cn'
import { useLocale } from 'next-intl'

interface ServiceType {
  number: string
  title: string
  description: string
}

const ServiceCard = ({
  service,
  className,
}: {
  service: ServiceType
  className?: string
}) => (
  <article className={cn('space-y-5 border-[#002C4D]/20 py-10', className)}>
    <p className="text-our-blue/20 text-9xl leading-none font-bold">
      {service.number}
    </p>
    <h3
      className="our-heading text-3xl!"
      dangerouslySetInnerHTML={{ __html: service.title }}
    />
    {/* the description is rich text; its bullet points show as check icons */}
    <div
      className="our-text check-list text-base leading-5"
      dangerouslySetInnerHTML={{ __html: service.description }}
    />
  </article>
)

// Two columns on desktop: a divider between the columns and above every row after the first.
const cardClasses = (index: number, total: number) => {
  const row = Math.floor(index / 2)
  const isLeft = index % 2 === 0
  const isFirstRow = row === 0
  const isLastRow = row === Math.ceil(total / 2) - 1

  return cn(
    index > 0 && 'border-t',
    isFirstRow && 'md:border-t-0',
    isLeft ? 'md:border-e md:ps-6 md:pe-12' : 'md:ps-12 md:pe-6',
    isFirstRow ? 'md:pt-6' : 'md:pt-12',
    isLastRow ? 'md:pb-6' : 'md:pb-12',
  )
}

interface ServicesGridSectionProps {
  data: ServicesData['service_section']
}

export default function ServicesGridSection({
  data,
}: ServicesGridSectionProps) {
  const locale = useLocale() as LocaleType
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  const services: ServiceType[] = data.list.map((item, index) => ({
    number: String(index + 1).padStart(2, '0'),
    title: pick(item.title, item.title_ar),
    description: pick(item.description, item.description_ar),
  }))

  return (
    <section
      className="container-wrapper py-16 lg:py-20"
      aria-labelledby="services-title"
    >
      <h2
        id="services-title"
        className="our-heading text-center"
        dangerouslySetInnerHTML={{ __html: pick(data.title, data.title_ar) }}
      />
      <div className="mt-10 grid md:grid-cols-2">
        {services.map((service, index) => (
          <ServiceCard
            key={data.list[index].id}
            service={service}
            className={cardClasses(index, services.length)}
          />
        ))}
      </div>
    </section>
  )
}
