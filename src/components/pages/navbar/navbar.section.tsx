'use client'

import { SiteLogo } from '@/assets/logos'
import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import { useGetASample } from '@/context/get-a-sample.context'
import type { LocaleType } from '@/i18n/types'
import { localizedHref, toNavLinks } from '@/lib/site-settings'
import type { SiteSettingsData } from '@/types/site-settings'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import GetASampleDialog from '../common/get-a-sample.dialog'
import MobileNavSheet from './mobile-nav.sheet'
import NavbarCategoryDropdown from './navbar-category.dropdown'

interface NavbarNavLinksType {
  text: string
  link: string
}

interface NavbarProps {
  // From the site settings; the translated content is the fallback when it is missing
  nav?: SiteSettingsData['nav']
  whatsapp?: string
}

export default function Navbar({ nav, whatsapp }: NavbarProps) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('Navbar')

  // API pages are split around the logo: first half on the left, the rest on the right
  const apiLinks = nav?.pages.length ? toNavLinks(nav.pages) : null
  const navLinks: NavbarNavLinksType[][] = apiLinks
    ? [
        apiLinks.slice(0, Math.ceil(apiLinks.length / 2)),
        apiLinks.slice(Math.ceil(apiLinks.length / 2)),
      ]
    : (t.raw('navLinks') as NavbarNavLinksType[][])

  const { setOpen: setGetASampleOpen } = useGetASample()

  return (
    <>
      <header className="fixed top-0 z-50 w-full text-sm shadow-md">
        {/* navigation */}
        <nav className="bg-white py-2">
          <div className="container-wrapper flex flex-row items-center justify-between">
            <div className="hidden flex-row items-center justify-between space-x-3 pe-25 lg:w-5/12 xl:flex 2xl:space-x-10">
              {navLinks[0].map((item, i) => (
                <Link
                  key={i}
                  href={localizedHref(locale, item.link)}
                  className="text-base font-medium focus:ring-0 focus:outline-none"
                >
                  {item.text}
                </Link>
              ))}
            </div>

            {/* site logo */}
            <div className="flex w-1/2 flex-row items-center justify-start lg:w-2/12 lg:justify-center">
              <Link
                href={`/${locale}`}
                className="focus:ring-0 focus:outline-none"
              >
                {nav?.logo.path ? (
                  <Image
                    src={nav.logo.path}
                    alt={nav.logo.alt || 'Z&S Carpets'}
                    width={200}
                    height={64}
                    priority
                    className="h-16 w-auto cursor-pointer"
                  />
                ) : (
                  <Image
                    src={SiteLogo}
                    alt="Z&S Carpets"
                    className="h-16 w-auto cursor-pointer"
                  />
                )}
              </Link>
            </div>

            <div className="flex w-1/2 flex-row items-center justify-end space-x-4 lg:w-5/12 2xl:space-x-8">
              <div className="hidden flex-1 flex-row items-center justify-between space-x-3 ps-7 xl:flex 2xl:space-x-10 2xl:ps-12">
                {navLinks[1].map((item, i) => (
                  <Link
                    key={i}
                    href={localizedHref(locale, item.link)}
                    className="text-base font-medium focus:ring-0 focus:outline-none"
                  >
                    {item.text}
                  </Link>
                ))}
                {/* Get a sample trigger btn */}
                <button
                  onClick={() => setGetASampleOpen(true)}
                  className="cursor-pointer text-base font-medium focus:ring-0 focus:outline-none"
                >
                  Get a sample
                </button>
              </div>

              <div className="flex flex-row items-center space-x-2">
                {/* writeTo btn */}
                <Button
                  size="icon"
                  className="size-8 translate-y-0! rounded-full bg-[#0066B3] hover:bg-[#0066B3]/90"
                >
                  <OurIcon name="file-pen" className="size-3.5" />
                </Button>
                {/* menu btn */}
                <MobileNavSheet links={apiLinks ?? undefined} />
              </div>
            </div>
          </div>
        </nav>
        {/* category menu */}
        <div className="bg-our-blue">
          <div className="container-wrapper text-white">
            <NavbarCategoryDropdown
              categories={nav?.categories}
              whatsapp={whatsapp}
            />
          </div>
        </div>
      </header>
      {/* Get a sample dialog component */}
      <GetASampleDialog />
    </>
  )
}
