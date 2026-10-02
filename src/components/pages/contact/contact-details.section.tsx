import { type OurIconName, OurIcon } from '@/components/ui/icon'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function ContactDetailsSection() {
  const t = useTranslations('ContactPage.contactDetails')
  const t2 = useTranslations('Footer')

  const items = t.raw('items') as {
    title: string
    description: string
    value: string
    icon: OurIconName
  }[]

  const social = t2.raw('social') as {
    link: string
    icon: OurIconName
  }[]

  return (
    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="our-heading">
        {t('title')}
      </h2>
      <p className="text-lg text-[#222222]">{t('description')}</p>
      <div className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-1 lg:gap-3 xl:grid-cols-2 xl:gap-5">
        <article className="group overflow-hidden rounded-sm border">
          <div className="flex flex-col gap-5 px-5 py-7">
            <OurIcon name="phone_2" className="text-our-purple size-10" />
            <h3 className="text-2xl">{t('items.phone.title')}</h3>
            <p className="text-sm">{t('items.phone.description')}</p>
            <a
              href={`tel:${t('items.phone.value').replaceAll(' ', '')}`}
              className="mt-2 text-xl font-medium"
            >
              {t('items.phone.value')}
            </a>
          </div>
          <div className="group-hover:bg-our-purple h-1" />
        </article>
        <article className="group overflow-hidden rounded-sm border">
          <div className="flex flex-col gap-5 px-5 py-7">
            <OurIcon name="mail_3" className="text-our-purple size-10" />
            <h3 className="text-2xl">{t('items.email.title')}</h3>
            <p className="text-sm">{t('items.email.description')}</p>
            <a
              href={`mailto:${t('items.email.value')}`}
              className="mt-2 text-xl font-medium"
            >
              {t('items.email.value')}
            </a>
          </div>
          <div className="group-hover:bg-our-purple h-1" />
        </article>
      </div>
      <div className="mt-3 flex flex-col items-start gap-2 rounded-sm border border-[#dedede] px-5 py-6 min-[450px]:flex-row min-[450px]:items-center min-[450px]:gap-7">
        <span className="text-2xl">{t('socialTitle')}</span>
        <div
          className="flex items-center gap-7"
          aria-label="Social media links"
        >
          {social.map((logo, i) => (
            <Link
              key={i}
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <OurIcon
                key={i}
                name={logo.icon}
                className="size-4.5 text-black"
              />
            </Link>
          ))}
        </div>
      </div>
      <article className="mt-3 rounded-sm border border-[#dedede] px-5 py-7">
        <div className="text-our-purple text-[28px]" aria-hidden="true">
          <OurIcon name="location_2" />
        </div>
        <h3 className="mt-4 text-2xl font-medium">{t('office.title')}</h3>
        <p className="mt-4 text-xl">{t('office.address')}</p>
      </article>
    </section>
  )
}
