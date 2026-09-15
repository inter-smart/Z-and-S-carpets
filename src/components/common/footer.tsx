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
import { FloorImg1, FloorImg2, FloorImg3 } from '@/assets/images'
import { SiteLogo } from '@/assets/logos'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'
import FooterCarousel from './footer-carousel'

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
  const contacts = t.raw('contacts') as { id: string; text: string }[]
  const social = t.raw('social') as { id: string; link: string }[]

  return (
    <footer className="w-full text-sm bg-[#101010] text-white pt-18">
      <div className="container-wrapper">
        {/* top */}
        <div className="pb-10">
          {/* images carousel */}
          <FooterCarousel images={[FloorImg1, FloorImg2, FloorImg3]} />

          {/* links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-10 mt-18">
            <div className="sm:space-y-7">
              <div
                className="flex flex-col space-y-2"
                onClick={() => toggleSection(t('footerLinks.quickLinks.title'))}
              >
                <p className="uppercase font-bold text-lg">
                  {t('footerLinks.quickLinks.title')}
                </p>
                <div className="h-0.75 w-12 bg-[#0066B3]"></div>
              </div>
              <div
                className={cn(
                  'space-y-4 overflow-hidden transition-all duration-300 sm:block',
                  openSection === t('footerLinks.quickLinks.title')
                    ? 'max-h-100 opacity-100 mt-7 sm:mt-0'
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
                <p className="uppercase font-bold text-lg">
                  {t('footerLinks.services.title')}
                </p>
                <div className="h-0.75 w-12 bg-[#0066B3]"></div>
              </div>
              <div
                className={cn(
                  'space-y-4 overflow-hidden transition-all duration-300 sm:block',
                  openSection === t('footerLinks.services.title')
                    ? 'max-h-100 opacity-100 mt-7 sm:mt-0'
                    : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100',
                )}
              >
                {footerLinks_services_items.map((item) => (
                  <p key={item.text}>{item.text}</p>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2 md:col-span-1 lg:col-span-2 sm:space-y-7">
              <div
                className="flex flex-col space-y-2"
                onClick={() => toggleSection(t('footerLinks.products.title'))}
              >
                <p className="uppercase font-bold text-lg">
                  {t('footerLinks.products.title')}
                </p>
                <div className="h-0.75 w-12 bg-[#0066B3]"></div>
              </div>
              <div
                className={cn(
                  'flex flex-col sm:flex-row space-y-4 space-x-10 overflow-hidden transition-all duration-300 sm:flex',
                  openSection === t('footerLinks.products.title')
                    ? 'max-h-150 opacity-100 mt-7 sm:mt-0'
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
            <div className="sm:col-span-2 md:col-span-1 space-y-7 mt-7 sm:mt-0">
              <Image src={SiteLogo} alt="Z&S Carpets" />
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
          <p className="hidden lg:block">{t('copyright')}</p>
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
          <p className="lg:hidden">{t('copyright')}</p>
          <div className="flex flex-col sm:flex-row space-x-1 justify-between items-center">
            <p>{t('designedByLabel')}:</p>
            <div className="flex flex-row space-x-1">
              <Image
                src={InterSmartIcon}
                alt="Intersmart"
                className="w-min h-min"
              />
              <p className="font-zalando-sans">iNTERSMART</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
