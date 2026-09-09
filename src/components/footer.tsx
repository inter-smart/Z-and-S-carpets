import Image from 'next/image'
import { FooterImage } from '@/assets/images'
import {
  FacebookIcon,
  YouTubeIcon,
  InstagramIcon,
  LinkedInIcon,
  XTwitterIcon,
  LocationBlueIcon,
  MailBlueIcon,
  PhoneBlueIcon,
  WhatsAppIcon,
  InterSmartIcon,
} from '@/assets/icons'
import { SiteLogo } from '@/assets/logos'
import { useLocale, useTranslations } from 'next-intl'
import { LocaleType } from '@/i18n/types'

interface FooterLinksItemsType {
  text: string
  link: string
}

const contactsIcons = {
  'location-icon': LocationBlueIcon,
  'mail-icon': MailBlueIcon,
  'phone-icon': PhoneBlueIcon,
  'whatsapp-icon': WhatsAppIcon,
}

const socialIcons = {
  'facebook-icon': FacebookIcon,
  'youtube-icon': YouTubeIcon,
  'instagram-icon': InstagramIcon,
  'linkedin-icon': LinkedInIcon,
  'xtwitter-icon': XTwitterIcon,
}

export default function Footer() {
  const t = useTranslations('Footer')
  const locale = useLocale() as LocaleType

  const footerLinks_quickLinks_items = t.raw(
    'footerLinks.quickLinks.items',
  ) as FooterLinksItemsType[]
  const footerLinks_services_items = t.raw(
    'footerLinks.services.items',
  ) as FooterLinksItemsType[]
  const footerLinks_products_items = t.raw(
    'footerLinks.products.items',
  ) as FooterLinksItemsType[][]
  const contacts = t.raw('contacts') as { id: string; text: string }[]
  const social = t.raw('social') as { id: string; link: string }[]

  return (
    <footer className="w-full text-sm bg-[#101010] text-white px-8 sm:px-22 pt-18">
      {/* top */}
      <div className="pb-10">
        {/* image */}
        <div className="w-auto h-64 relative">
          <Image
            className="rounded-md object-cover"
            src={FooterImage}
            alt="Next.js logo"
            fill
          />
        </div>
        {/* links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pt-18">
          <div className="space-y-7">
            <div className="flex flex-col space-y-2">
              <p className="uppercase font-bold text-lg">
                {t('footerLinks.quickLinks.title')}
              </p>
              <div className="h-0.75 w-12 bg-[#0066B3]"></div>
            </div>
            <div className="space-y-4">
              {footerLinks_quickLinks_items.map((item) => (
                <p key={item.text}>{item.text}</p>
              ))}
            </div>
          </div>
          <div className="space-y-7">
            <div className="flex flex-col space-y-2">
              <p className="uppercase font-bold text-lg">
                {t('footerLinks.services.title')}
              </p>
              <div className="h-0.75 w-12 bg-[#0066B3]"></div>
            </div>
            <div className="space-y-4">
              {footerLinks_services_items.map((item) => (
                <p key={item.text}>{item.text}</p>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2 md:col-span-1 lg:col-span-2 space-y-7">
            <div className="flex flex-col space-y-2">
              <p className="uppercase font-bold text-lg">
                {t('footerLinks.products.title')}
              </p>
              <div className="h-0.75 w-12 bg-[#0066B3]"></div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-4 space-x-10">
              <div className="space-y-4">
                {footerLinks_products_items[0].map((item) => (
                  <p key={item.text}>{item.text}</p>
                ))}
              </div>
              <div className="space-y-4">
                {footerLinks_products_items[1].map((item) => (
                  <p key={item.text}>{item.text}</p>
                ))}
              </div>
            </div>
          </div>
          {/* contacts */}
          <div className="space-y-7">
            <Image src={SiteLogo} alt="site-logo" />
            <div className="space-y-5">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex flex-row items-start space-x-2"
                >
                  <Image
                    src={
                      contactsIcons[contact.id as keyof typeof contactsIcons]
                    }
                    alt={contact.id}
                    className="w-4 h-auto"
                  />
                  <p className="leading-4">{contact.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* bottom */}
      <hr className="border-white/10" />
      <div className="w-full flex flex-col lg:flex-row justify-between items-center py-10 text-center space-y-4 lg:space-y-0">
        <p>Copyright © Z&S Carpets Trading L.L.C. All Rights Reserved</p>
        <div className="flex flex-row space-x-3 sm:space-x-8 xl:space-x-10">
          {social.map((logo) => (
            <Image
              key={logo.id}
              src={socialIcons[logo.id as keyof typeof socialIcons]}
              alt={logo.id}
              className="w-auto h-3.5"
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row space-x-1 justify-between items-center">
          <p>Designed By:</p>
          <div className="flex flex-row space-x-1">
            <Image
              src={InterSmartIcon}
              alt="intersmart-icon"
              className="w-min h-min"
            />
            <p className="font-zalando-sans">iNTERSMART</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
