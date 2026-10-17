'use client'

import { SiteLogo } from '@/assets/logos'
import { OurIcon, type OurIconName } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import { localizedHref } from '@/lib/site-settings'
import type { SiteSettingsData } from '@/types/site-settings'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import FooterCarousel from './footer.carousel'

interface ContactsItemType {
  label: string
  link: string
  icon: OurIconName
  // the address comes from a rich-text field (sanitized inline HTML)
  html?: boolean
}

interface SocialItemType {
  link: string
  icon?: OurIconName
  image?: string
  alt?: string
}

interface FooterLinksItemsType {
  text: string
  link: string
}

export default function Footer({
  footer,
}: {
  // From the site settings; the translated content is the fallback when it is missing
  footer?: SiteSettingsData['footer']
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('Footer')

  const [openSection, setOpenSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setOpenSection((prev) => (prev === section ? null : section))
  }

  const half = (list: FooterLinksItemsType[]) => Math.ceil(list.length / 2)

  const footerLinks_quickLinks_items: FooterLinksItemsType[] = footer
    ? footer.pages.map((page) => ({
        text: page.title,
        link: localizedHref(locale, page.link),
      }))
    : (t.raw('footerLinks.quickLinks.items') as FooterLinksItemsType[])

  const footerLinks_services_items: FooterLinksItemsType[] = footer
    ? footer.services.map((service) => ({
        text: service.title,
        link: `/${locale}/services`,
      }))
    : (t.raw('footerLinks.services.items') as FooterLinksItemsType[])

  // products are laid out in two columns
  const apiProducts: FooterLinksItemsType[] | null = footer
    ? footer.products.map((product) => ({
        text: product.title,
        link: `/${locale}/products/${product.slug}`,
      }))
    : null
  const footerLinks_products_items: FooterLinksItemsType[][] = apiProducts
    ? [
        apiProducts.slice(0, half(apiProducts)),
        apiProducts.slice(half(apiProducts)),
      ]
    : (t.raw('footerLinks.products.items') as FooterLinksItemsType[][])

  // address, email, phone and WhatsApp from the site settings (empty ones are skipped)
  const apiContacts: ContactsItemType[] = []
  if (footer?.address)
    apiContacts.push({
      label: footer.address,
      link: '',
      icon: 'location',
      html: true,
    })
  if (footer?.email)
    apiContacts.push({
      label: footer.email,
      link: `mailto:${footer.email}`,
      icon: 'mail_2',
    })
  if (footer?.phone)
    apiContacts.push({
      label: footer.phone,
      link: `tel:${footer.phone.replaceAll(' ', '')}`,
      icon: 'phone_2',
    })
  if (footer?.whatsapp_number)
    apiContacts.push({
      label: footer.whatsapp_number,
      link: `https://wa.me/${footer.whatsapp_number.replace(/[^\d]/g, '')}`,
      icon: 'whatsapp_2',
    })
  const contacts = footer
    ? apiContacts
    : (t.raw('contacts') as ContactsItemType[])

  const social: SocialItemType[] = footer
    ? footer.social_media.flatMap((item) =>
        item.link && item.media.media_path
          ? [
              {
                link: item.link,
                image: item.media.media_path,
                alt: item.media.media_alt,
              },
            ]
          : [],
      )
    : (t.raw('social') as SocialItemType[])

  const images: string[] = footer
    ? footer.footer_media.flatMap((item) =>
        item.media.media_path ? [item.media.media_path] : [],
      )
    : (t.raw('images') as string[])

  return (
    <footer className="w-full bg-[#101010] pt-12 text-sm text-white lg:pt-20">
      <div className="container-wrapper">
        {/* top */}
        <div className="pb-10">
          {/* images carousel */}
          {images.length > 0 && <FooterCarousel images={images} />}

          {/* links */}
          <div className="mt-18 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10 lg:grid-cols-5">
            <div className="sm:space-y-7">
              <div
                className="flex flex-col space-y-2"
                onClick={() => toggleSection(t('footerLinks.quickLinks.title'))}
              >
                <p className="cursor-pointer text-lg font-bold tracking-widest uppercase sm:cursor-text">
                  {t('footerLinks.quickLinks.title')}
                </p>
                <div className="bg-our-blue h-0.75 w-12" />
              </div>
              <div
                className={cn(
                  'flex flex-col gap-4 overflow-hidden text-base transition-all duration-300',
                  openSection === t('footerLinks.quickLinks.title')
                    ? 'mt-7 max-h-100 opacity-100 sm:mt-0'
                    : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100',
                )}
              >
                {footerLinks_quickLinks_items.map((item) => (
                  <Link key={item.text} href={item.link}>
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
            <div className="sm:space-y-7">
              <div
                className="flex flex-col space-y-2"
                onClick={() => toggleSection(t('footerLinks.services.title'))}
              >
                <p className="cursor-pointer text-lg font-bold tracking-widest uppercase sm:cursor-text">
                  {t('footerLinks.services.title')}
                </p>
                <div className="bg-our-blue h-0.75 w-12" />
              </div>
              <div
                className={cn(
                  'flex flex-col gap-4 overflow-hidden text-base transition-all duration-300',
                  openSection === t('footerLinks.services.title')
                    ? 'mt-7 max-h-100 opacity-100 sm:mt-0'
                    : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100',
                )}
              >
                {footerLinks_services_items.map((item) => (
                  <Link key={item.text} href={item.link}>
                    {item.text}
                  </Link>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2 sm:space-y-7 md:col-span-1 lg:col-span-2">
              <div
                className="flex flex-col space-y-2"
                onClick={() => toggleSection(t('footerLinks.products.title'))}
              >
                <p className="cursor-pointer text-lg font-bold tracking-widest uppercase sm:cursor-text">
                  {t('footerLinks.products.title')}
                </p>
                <div className="bg-our-blue h-0.75 w-12" />
              </div>
              <div
                className={cn(
                  'flex flex-col space-y-4 space-x-10 overflow-hidden transition-all duration-300 sm:flex sm:flex-row',
                  openSection === t('footerLinks.products.title')
                    ? 'mt-7 max-h-150 opacity-100 sm:mt-0'
                    : 'max-h-0 opacity-0 sm:max-h-none sm:opacity-100',
                )}
              >
                <div className="flex flex-col gap-4 text-base">
                  {footerLinks_products_items[0].map((item) => (
                    <Link key={item.text} href={item.link}>
                      {item.text}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-4 text-base">
                  {footerLinks_products_items[1].map((item) => (
                    <Link key={item.text} href={item.link}>
                      {item.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* contacts */}
            <div className="mt-7 space-y-7 sm:col-span-2 sm:mt-0 md:col-span-1">
              {footer?.logo.path ? (
                <Image
                  src={footer.logo.path}
                  alt={footer.logo.alt || 'Z&S Carpets'}
                  width={200}
                  height={80}
                  className="h-20 w-auto"
                />
              ) : (
                <Image src={SiteLogo} alt="Z&S Carpets" className="h-20" />
              )}
              <div className="space-y-5 text-base">
                {contacts.map((item, i) => {
                  if (!item.link.length)
                    return (
                      <div
                        key={i}
                        className="flex flex-row items-start space-x-2"
                      >
                        <div className="mt-0.5">
                          <OurIcon
                            name={item.icon}
                            className="text-our-blue size-3.5"
                          />
                        </div>
                        {item.html ? (
                          <p dangerouslySetInnerHTML={{ __html: item.label }} />
                        ) : (
                          <p>{item.label}</p>
                        )}
                      </div>
                    )
                  return (
                    <a
                      key={i}
                      href={item.link.replaceAll(' ', '')}
                      className="flex flex-row items-start space-x-2"
                    >
                      <div className="mt-0.5">
                        <OurIcon
                          name={item.icon}
                          className="text-our-blue size-3.5"
                        />
                      </div>
                      <p dir="ltr">{item.label}</p>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}
        <hr className="border-white/10" />
        <div className="flex w-full flex-col items-center justify-between space-y-4 py-10 text-center text-base font-light lg:flex-row lg:space-y-0">
          <p className="hidden lg:block">{t('copyright')}</p>
          <div className="flex flex-row space-x-3 sm:space-x-8 xl:space-x-10">
            {social.map((logo, i) => (
              <Link
                key={i}
                href={logo.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {logo.image ? (
                  // <img> SVGs can't inherit CSS `color`, so `currentColor` fills render black;
                  // brightness-0 + invert forces any uploaded icon to white on the dark footer
                  <Image
                    src={logo.image}
                    alt={logo.alt || ''}
                    width={16}
                    height={16}
                    className="size-4 object-contain brightness-0 invert"
                  />
                ) : (
                  logo.icon && (
                    <OurIcon name={logo.icon} className="size-4 text-white" />
                  )
                )}
              </Link>
            ))}
          </div>
          <p className="lg:hidden">{t('copyright')}</p>
          <div className="flex items-center justify-between space-x-1 sm:flex-row sm:justify-center">
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
