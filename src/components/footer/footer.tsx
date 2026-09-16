'use client'

import {
  FacebookIcon,
  InstagramIcon,
  InterSmartIcon,
  LinkedInIcon,
  LocationBlueIcon,
  MailBlueIcon,
  PhoneBlueIcon,
  WhatsAppIcon,
  XTwitterIcon,
  YouTubeIcon,
} from '@/assets/icons'
import { SiteLogo } from '@/assets/logos'
import FooterCarousel from '@/components/footer/footer-carousel'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

interface ContactsItemType {
  label: string
  link: string
}

interface FooterLinksItemsType {
  text: string
  link: string
}

const contactsIcons = {
  location: LocationBlueIcon,
  mail: MailBlueIcon,
  phone: PhoneBlueIcon,
  whatsapp: WhatsAppIcon,
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

  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section))
  }

  const footerLinks_quickLinks_items = t.raw(
    'footerLinks.quickLinks.items',
  ) as FooterLinksItemsType[]
  const footerLinks_services_items = t.raw(
    'footerLinks.services.items',
  ) as FooterLinksItemsType[]
  const footerLinks_products_items = t.raw(
    'footerLinks.products.items',
  ) as FooterLinksItemsType[][]

  const contacts = t.raw('contacts') as {
    location: ContactsItemType
    mail: ContactsItemType
    phone: ContactsItemType
    whatsapp: ContactsItemType
  }

  const social = t.raw('social') as { id: string; link: string }[]
  const images = t.raw('images') as string[]

  return (
    <footer className="w-full bg-[#101010] pt-18 text-sm text-white">
      <div className="container-wrapper">
        {/* top */}
        <div className="pb-10">
          {/* images carousel */}
          <FooterCarousel images={images} />

          {/* links */}
          <div className="mt-18 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10 lg:grid-cols-5">
            <div className="sm:space-y-7">
              <div
                className="flex flex-col space-y-2"
                onClick={() => toggleSection(t('footerLinks.quickLinks.title'))}
              >
                <p className="text-lg font-bold uppercase">
                  {t('footerLinks.quickLinks.title')}
                </p>
                <div className="h-0.75 w-12 bg-[#0066B3]"></div>
              </div>
              <div
                className={cn(
                  'space-y-4 overflow-hidden transition-all duration-300 sm:block',
                  openSection === t('footerLinks.quickLinks.title')
                    ? 'mt-7 max-h-100 opacity-100 sm:mt-0'
                    : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100',
                )}
              >
                {footerLinks_quickLinks_items.map((item) => (
                  <p key={item.text}>{item.text}</p>
                ))}
              </div>
            </div>
            <div className="sm:space-y-7">
              <div
                className="flex flex-col space-y-2"
                onClick={() => toggleSection(t('footerLinks.services.title'))}
              >
                <p className="text-lg font-bold uppercase">
                  {t('footerLinks.services.title')}
                </p>
                <div className="h-0.75 w-12 bg-[#0066B3]"></div>
              </div>
              <div
                className={cn(
                  'space-y-4 overflow-hidden transition-all duration-300 sm:block',
                  openSection === t('footerLinks.services.title')
                    ? 'mt-7 max-h-100 opacity-100 sm:mt-0'
                    : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100',
                )}
              >
                {footerLinks_services_items.map((item) => (
                  <p key={item.text}>{item.text}</p>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2 sm:space-y-7 md:col-span-1 lg:col-span-2">
              <div
                className="flex flex-col space-y-2"
                onClick={() => toggleSection(t('footerLinks.products.title'))}
              >
                <p className="text-lg font-bold uppercase">
                  {t('footerLinks.products.title')}
                </p>
                <div className="h-0.75 w-12 bg-[#0066B3]"></div>
              </div>
              <div
                className={cn(
                  'flex flex-col space-y-4 space-x-10 overflow-hidden transition-all duration-300 sm:flex sm:flex-row',
                  openSection === t('footerLinks.products.title')
                    ? 'mt-7 max-h-150 opacity-100 sm:mt-0'
                    : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100',
                )}
              >
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
            <div className="mt-7 space-y-7 sm:col-span-2 sm:mt-0 md:col-span-1">
              <Image src={SiteLogo} alt="Z&S Carpets" />
              <div className="space-y-5">
                {/* location */}
                <div className="flex flex-row items-start space-x-2">
                  <Image
                    src={contactsIcons['location']}
                    alt="location icon"
                    className="h-auto w-4"
                  />
                  <p className="leading-4">{contacts.location.label}</p>
                </div>
                {/* mail */}
                <a
                  href={`mailto:${contacts.mail.link}`}
                  className="flex flex-row items-start space-x-2"
                >
                  <Image
                    src={contactsIcons['mail']}
                    alt="location icon"
                    className="h-auto w-4"
                  />
                  <p className="leading-4">{contacts.mail.label}</p>
                </a>
                {/* phone */}
                <a
                  href={`tel:${contacts.phone.link.replaceAll(' ', '')}`}
                  className="flex flex-row items-start space-x-2"
                >
                  <Image
                    src={contactsIcons['phone']}
                    alt="location icon"
                    className="h-auto w-4"
                  />
                  <p className="leading-4">{contacts.phone.label}</p>
                </a>
                {/* whatsapp */}
                <a
                  href={`https://wa.me/${contacts.whatsapp.link.replaceAll(' ', '')}`}
                  className="flex flex-row items-start space-x-2"
                >
                  <Image
                    src={contactsIcons['whatsapp']}
                    alt="location icon"
                    className="h-auto w-4"
                  />
                  <p className="leading-4">{contacts.whatsapp.label}</p>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}
        <hr className="border-white/10" />
        <div className="flex w-full flex-col items-center justify-between space-y-4 py-10 text-center lg:flex-row lg:space-y-0">
          <p className="hidden lg:block">{t('copyright')}</p>
          <div className="flex flex-row space-x-3 sm:space-x-8 xl:space-x-10">
            {social.map((logo) => (
              <Image
                key={logo.id}
                src={socialIcons[logo.id as keyof typeof socialIcons]}
                alt={logo.id}
                className="h-3.5 w-auto"
              />
            ))}
          </div>
          <p className="lg:hidden">{t('copyright')}</p>
          <div className="flex flex-col items-center justify-between space-x-1 sm:flex-row">
            <p>{t('designedByLabel')}:</p>
            <div className="flex flex-row space-x-1">
              <Image
                src={InterSmartIcon}
                alt="Intersmart"
                className="h-min w-min"
              />
              <p className="font-zalando-sans">iNTERSMART</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
