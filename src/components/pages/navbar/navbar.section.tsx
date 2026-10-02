'use client'

import { SiteLogo } from '@/assets/logos'
import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import { useGetASample } from '@/context/get-a-sample.context'
import type { LocaleType } from '@/i18n/types'
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

export default function Navbar() {
  const locale = useLocale() as LocaleType
  const t = useTranslations('Navbar')

  const navLinks = t.raw('navLinks') as NavbarNavLinksType[][]

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
                  href={`/${locale}${item.link}`}
                  className="text-sm font-medium focus:ring-0 focus:outline-none"
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
                <Image
                  src={SiteLogo}
                  alt="Z&S Carpets"
                  className="h-16 w-auto cursor-pointer"
                />
              </Link>
            </div>

            <div className="flex w-1/2 flex-row items-center justify-end space-x-4 lg:w-5/12 2xl:space-x-8">
              <div className="hidden flex-1 flex-row items-center justify-between space-x-3 ps-7 xl:flex 2xl:space-x-10 2xl:ps-12">
                {navLinks[1].map((item, i) => (
                  <Link
                    key={i}
                    href={`/${locale}${item.link}`}
                    className="text-sm font-medium focus:ring-0 focus:outline-none"
                  >
                    {item.text}
                  </Link>
                ))}
                {/* Get a sample trigger btn */}
                <button
                  onClick={() => setGetASampleOpen(true)}
                  className="cursor-pointer text-sm font-medium focus:ring-0 focus:outline-none"
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
                <MobileNavSheet />
              </div>
            </div>
          </div>
        </nav>
        {/* category menu */}
        <div className="bg-our-blue">
          <div className="container-wrapper text-white">
            <NavbarCategoryDropdown />
          </div>
        </div>
      </header>
      {/* Get a sample dialog component */}
      <GetASampleDialog />
    </>
  )
}
