'use client'

import { SiteLogo } from '@/assets/logos'
import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import { useDownloadRequest } from '@/context/download-request.context'
import { useGetASample } from '@/context/get-a-sample.context'
import { useQuoteCart } from '@/context/quote-cart.context'
import { useSearch } from '@/context/search.context'
import type { LocaleType } from '@/i18n/types'
import { localizedHref, toNavLinks } from '@/lib/site-settings'
import type { SiteSettingsData } from '@/types/site-settings'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import MobileNavSheet from './mobile-nav.sheet'
import NavbarCategoryDropdown from './navbar-category.dropdown'

// Both dialogs pull in the lead forms (react-hook-form, zod, reCAPTCHA), so their
// code is only fetched the first time one of them is opened
const GetASampleDialog = dynamic(() => import('../common/get-a-sample.dialog'))
const DownloadRequestDialog = dynamic(
  () => import('../common/download-request.dialog'),
)
// The search panel (and its fetching) is only loaded the first time the icon is clicked
const SearchOverlay = dynamic(() => import('./search-overlay'))

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

  // Stays mounted after the first open so the close animation and state survive
  const { open: sampleOpen } = useGetASample()
  const { open: downloadOpen } = useDownloadRequest()
  const [sampleMounted, setSampleMounted] = useState(false)
  const [downloadMounted, setDownloadMounted] = useState(false)
  if (sampleOpen && !sampleMounted) setSampleMounted(true)
  if (downloadOpen && !downloadMounted) setDownloadMounted(true)
  const { open: searchOpen } = useSearch()
  const [searchMounted, setSearchMounted] = useState(false)
  if (searchOpen && !searchMounted) setSearchMounted(true)

  // Publish the fixed header's height so layouts can compensate for it (see BannerHiddenSpacer)
  const headerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const header = headerRef.current
    if (!header) return
    const publish = () =>
      document.documentElement.style.setProperty(
        '--header-h',
        `${header.offsetHeight}px`,
      )
    publish()
    const observer = new ResizeObserver(publish)
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  // Nav links are split around the logo: the first 4 go left, everything else goes right
  const LEFT_LINKS_COUNT = 4
  const apiLinks = nav?.pages.length ? toNavLinks(nav.pages) : null
  const flatLinks =
    apiLinks ?? (t.raw('navLinks') as NavbarNavLinksType[][]).flat()
  const navLinks: NavbarNavLinksType[][] = [
    flatLinks.slice(0, LEFT_LINKS_COUNT),
    flatLinks.slice(LEFT_LINKS_COUNT),
  ]

  const { setOpen: setGetASampleOpen } = useGetASample()
  const { count: quoteCartCount } = useQuoteCart()

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 z-50 w-full text-sm shadow-md"
      >
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
                    style={{ width: 'auto', height: '100%' }}
                    className="h-16 cursor-pointer"
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
                  {t('getASampleLabel')}
                </button>
              </div>

              <div className="flex flex-row items-center space-x-2">
                {/* writeTo btn */}
                {/* <Button
                  size="icon"
                  className="size-8 translate-y-0! rounded-full bg-[#0066B3] hover:bg-[#0066B3]/90"
                >
                  <OurIcon name="file-pen" className="size-3.5" />
                </Button> */}
                {/* quote cart btn */}
                <Button
                  size="icon"
                  nativeButton={false}
                  render={<Link href={localizedHref(locale, '/quotes')} />}
                  aria-label={t('quoteCart')}
                  className="relative size-8 translate-y-0! rounded-full bg-[#0066B3] hover:bg-[#0066B3]/90"
                >
                  <OurIcon name="file-pen" className="size-3.5" />
                  {quoteCartCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 flex size-4.5 items-center justify-center rounded-full bg-[#FF0009] text-[10px] font-semibold text-white">
                      {quoteCartCount > 99 ? '99+' : quoteCartCount}
                    </span>
                  )}
                </Button>
                {/* menu btn */}
                <MobileNavSheet
                  links={apiLinks ?? undefined}
                  categories={nav?.categories}
                />
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
      {sampleMounted && <GetASampleDialog />}
      {/* Download request dialog component */}
      {downloadMounted && <DownloadRequestDialog />}
      {/* Search overlay */}
      {searchMounted && <SearchOverlay categories={nav?.categories} />}
    </>
  )
}
