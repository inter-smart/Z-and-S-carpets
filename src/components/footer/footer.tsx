'use client'

import { SiteLogo } from '@/assets/logos'
import { OurIcon, type OurIconName } from '@/components/ui/icon'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import FooterCarousel from './footer-carousel'

interface ContactsItemType {
  label: string
  link: string
  icon: OurIconName
}

interface FooterLinksItemsType {
  text: string
  link: string
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

  const contacts = t.raw('contacts') as ContactsItemType[]

  const social = t.raw('social') as {
    link: string
    icon: OurIconName
  }[]
  const images = t.raw('images') as string[]

  return (
    <footer className="w-full bg-[#101010] pt-12 text-sm text-white lg:pt-20">
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
                <p className="text-[1rem] font-bold tracking-widest uppercase">
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
                <p className="text-[1rem] font-bold tracking-widest uppercase">
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
                <p className="text-[1rem] font-bold tracking-widest uppercase">
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
                {contacts.map((item, i) => {
                  if (!item.link.length)
                    return (
                      <div
                        key={i}
                        className="flex flex-row items-start space-x-2"
                      >
                        <OurIcon
                          name={item.icon}
                          className="text-our-blue size-6"
                        />
                        <p>{item.label}</p>
                      </div>
                    )
                  return (
                    <a
                      key={i}
                      href={item.link.replaceAll(' ', '')}
                      className="flex flex-row items-start space-x-2"
                    >
                      <OurIcon
                        name={item.icon}
                        className="text-our-blue size-4"
                      />
                      <p>{item.label}</p>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}
        <hr className="border-white/10" />
        <div className="flex w-full flex-col items-center justify-between space-y-4 py-10 text-center font-light lg:flex-row lg:space-y-0">
          <p className="hidden lg:block">{t('copyright')}</p>
          <div className="flex flex-row space-x-3 sm:space-x-8 xl:space-x-10">
            {social.map((logo, i) => (
              <Link key={i} href={logo.link}>
                <OurIcon name={logo.icon} className="size-4 text-white" />
              </Link>
            ))}
          </div>
          <p className="lg:hidden">{t('copyright')}</p>
          <div className="flex items-center justify-between space-x-1 text-sm sm:flex-row sm:justify-center">
            <p>{t('designedByLabel')}:</p>
            <div className="flex flex-row items-center space-x-px">
              <OurIcon name="intersmart" className="size-2.75" />
              <p className="text-[0.7rem]">iNTERSMART</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
