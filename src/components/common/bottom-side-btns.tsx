import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import { toContactLink } from '@/lib/site-settings'
import type { SiteSettingsData } from '@/types/site-settings'
import { useLocale } from 'next-intl'
import Image from 'next/image'

const defaultContacts = {
  mail: 'info@zandscarpets.com',
  whatsapp: '+971 XX XXX XXXX',
  phone: '+971 5270 044 20',
}

export default function BottomSideBtns({
  buttons,
  email,
  phone,
  whatsapp,
}: {
  // floating buttons added in the admin; when there are none, the three default buttons
  // (built from the contact values below, or the constants above) are shown
  buttons?: SiteSettingsData['floating_buttons']
  email?: string
  phone?: string
  whatsapp?: string
}) {
  const locale = useLocale() as LocaleType

  const contacts = {
    mail: email || defaultContacts.mail,
    whatsapp: whatsapp || defaultContacts.whatsapp,
    phone: phone || defaultContacts.phone,
  }

  const apiButtons = (buttons ?? []).filter(
    (item) => item.icon.path && item.link,
  )

  if (apiButtons.length > 0) {
    return (
      <div className="fixed bottom-14 z-40 flex flex-col-reverse gap-1.25 ltr:right-2 ltr:sm:right-5 rtl:left-2 rtl:sm:left-5">
        {apiButtons.map((item, index) => {
          const { href, external, color } = toContactLink(locale, item.link)
          return (
            <a
              key={index}
              className={`flex h-9.5 w-9.5 items-center justify-center rounded-sm p-2.5 ${color}`}
              href={href}
              aria-label={item.icon.alt || href}
              {...(external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {/* uploaded glyphs are single-colour; shown white like the default buttons */}
              <Image
                src={item.icon.path as string}
                alt=""
                width={20}
                height={20}
                className="size-5 object-contain brightness-0 invert"
              />
            </a>
          )
        })}
      </div>
    )
  }

  return (
    <div className="fixed bottom-14 z-40 flex flex-col-reverse gap-1.25 ltr:right-2 ltr:sm:right-5 rtl:left-2 rtl:sm:left-5">
      <a
        className="flex h-9.5 w-9.5 items-center justify-center rounded-sm bg-[#812990] p-2.5"
        href={`mailto:${contacts.mail}`}
        aria-label="Send us an email"
      >
        <OurIcon name="mail" className="size-5 text-white" />
      </a>
      <a
        className="flex h-9.5 w-9.5 items-center justify-center rounded-sm bg-[#72BF44] p-2.5"
        href={`https://wa.me/${contacts.whatsapp.replaceAll(' ', '')}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <OurIcon name="whatsapp" className="size-5 text-white" />
      </a>
      <a
        className="flex h-9.5 w-9.5 items-center justify-center rounded-sm bg-[#0066B3] p-2.5"
        href={`tel:${contacts.phone.replaceAll(' ', '')}`}
        aria-label="Call us"
      >
        <OurIcon name="phone" className="size-5 text-white" />
      </a>
    </div>
  )
}
