import { type OurIconName, OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import type { ContactData } from '@/types/contact'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

interface ContactDetailsSectionProps {
  // When omitted (no CMS content yet) the translated content is used
  details?: ContactData['contact_detail_section']
  social?: ContactData['social_section']
}

type DetailCard = {
  key: string
  title: string
  description: string
  // phone / email: plain text; office: sanitized inline HTML
  value: string
  icon: { path: string | null; alt: string; fallback: OurIconName }
}

const ICON_FALLBACK: Record<string, OurIconName> = {
  phone: 'phone_2',
  email: 'mail_3',
  office: 'location_2',
}

export default function ContactDetailsSection({
  details,
  social,
}: ContactDetailsSectionProps) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('ContactPage.contactDetails')
  const t2 = useTranslations('Footer')
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  // cards from the CMS, or the translated ones
  const cards: DetailCard[] = details?.items.length
    ? details.items.map((item) => ({
        key: item.key,
        title: pick(item.title, item.title_ar),
        description: pick(item.description, item.description_ar),
        value: pick(item.value, item.value_ar),
        icon: {
          path: item.media.path,
          alt: pick(item.media.alt, item.media.alt_ar),
          fallback: ICON_FALLBACK[item.key],
        },
      }))
    : [
        ...(['phone', 'email'] as const).map((key) => ({
          key,
          title: t(`items.${key}.title`),
          description: t(`items.${key}.description`),
          value: t(`items.${key}.value`),
          icon: { path: null, alt: '', fallback: ICON_FALLBACK[key] },
        })),
        {
          key: 'office',
          title: t('office.title'),
          description: '',
          value: t('office.address'),
          icon: { path: null, alt: '', fallback: ICON_FALLBACK.office },
        },
      ]

  const contactCards = cards.filter((card) => card.key !== 'office')
  const office = cards.find((card) => card.key === 'office')

  const socialLinks = social?.list.length
    ? social.list.map((item) => ({
        key: item.id,
        link: item.link,
        path: item.media.path,
        alt: pick(item.media.alt, item.media.alt_ar),
        icon: null as OurIconName | null,
      }))
    : (t2.raw('social') as { link: string; icon: OurIconName }[]).map(
        (item, index) => ({
          key: index,
          link: item.link,
          path: null,
          alt: '',
          icon: item.icon as OurIconName | null,
        }),
      )
  const socialTitle = (social && pick(social.title, social.title_ar)) || ''

  const renderIcon = (icon: DetailCard['icon'], className: string) =>
    icon.path ? (
      <Image
        src={icon.path}
        alt={icon.alt}
        width={40}
        height={40}
        className={className}
      />
    ) : (
      <OurIcon name={icon.fallback} className={className} />
    )

  const hrefFor = (card: DetailCard) =>
    card.key === 'phone'
      ? `tel:${card.value.replace(/[^\d+]/g, '')}`
      : card.key === 'email'
        ? `mailto:${card.value}`
        : undefined

  return (
    <section id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="our-heading">
        {(details && pick(details.title, details.title_ar)) || t('title')}
      </h2>
      {details && pick(details.description, details.description_ar) ? (
        <div
          className="text-lg text-[#222222]"
          dangerouslySetInnerHTML={{
            __html: pick(details.description, details.description_ar),
          }}
        />
      ) : (
        <p className="text-lg text-[#222222]">{t('description')}</p>
      )}
      <div className="mt-9 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-1 lg:gap-3 xl:grid-cols-2 xl:gap-5">
        {contactCards.map((card) => (
          <article
            key={card.key}
            className="group overflow-hidden rounded-sm border"
          >
            <div className="flex flex-col gap-5 px-5 py-7">
              {renderIcon(card.icon, 'text-our-purple size-10 object-contain')}
              <h3 className="text-2xl">{card.title}</h3>
              {card.description && (
                <div
                  className="text-sm"
                  dangerouslySetInnerHTML={{ __html: card.description }}
                />
              )}
              <a href={hrefFor(card)} className="mt-2 text-xl font-medium">
                {card.value}
              </a>
            </div>
            <div className="group-hover:bg-our-purple h-1" />
          </article>
        ))}
      </div>
      <div className="mt-3 flex flex-col items-start gap-2 rounded-sm border border-[#dedede] px-5 py-6 min-[450px]:flex-row min-[450px]:items-center min-[450px]:gap-7">
        <span className="text-2xl">{socialTitle || t('socialTitle')}</span>
        <div
          className="flex items-center gap-7"
          aria-label="Social media links"
        >
          {socialLinks.map((logo) => (
            <Link
              key={logo.key}
              href={logo.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {logo.path ? (
                <Image
                  src={logo.path}
                  alt={logo.alt}
                  width={18}
                  height={18}
                  className="size-4.5 object-contain"
                />
              ) : (
                logo.icon && (
                  <OurIcon name={logo.icon} className="size-4.5 text-black" />
                )
              )}
            </Link>
          ))}
        </div>
      </div>
      {office && (
        <article className="mt-3 rounded-sm border border-[#dedede] px-5 py-7">
          <div className="text-our-purple text-[28px]">
            {renderIcon(office.icon, 'text-our-purple size-7 object-contain')}
          </div>
          <h3 className="mt-4 text-2xl font-medium">{office.title}</h3>
          {office.description && (
            <div
              className="mt-2 text-sm"
              dangerouslySetInnerHTML={{ __html: office.description }}
            />
          )}
          <div
            className="mt-4 text-xl"
            dangerouslySetInnerHTML={{ __html: office.value }}
          />
        </article>
      )}
    </section>
  )
}
