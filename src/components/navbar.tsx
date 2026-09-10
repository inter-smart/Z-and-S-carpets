import { ArrowIcon, FilePenIcon, MenuIcon, SearchIcon } from '@/assets/icons'
import { SiteLogo } from '@/assets/logos'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

import type { LocaleType } from '@/i18n/types'

interface NavbarNavLinksType {
  text: string
  link: string
}

export default function Navbar() {
  const locale = useLocale() as LocaleType
  const t = useTranslations('Navbar')

  const navLinks = t.raw('navLinks') as NavbarNavLinksType[][]
  const category = t.raw('category') as { title: string }[]

  return (
    <header>
      <nav className="fixed top-0 w-full bg-white shadow-md z-50 text-sm">
        {/* navigation */}
        <div className="flex flex-row justify-between items-center px-8 sm:px-22 py-3">
          <div className="lg:w-5/12 hidden lg:flex flex-row justify-start items-center space-x-3 2xl:space-x-10 pe-10">
            {navLinks[0].map((item) => (
              <p key={item.text} className="cursor-pointer font-semibold">
                {item.text}
              </p>
            ))}
          </div>

          {/* site logo */}
          <div className="w-1/2 lg:w-2/12 flex flex-row justify-start lg:justify-center items-center">
            {/* <Link href="/"> */}
            <Image
              src={SiteLogo}
              alt="site-logo"
              className="h-19 w-auto cursor-pointer"
            />
            {/* </Link> */}
          </div>

          <div className="w-1/2 lg:w-5/12 flex flex-row justify-end items-center space-x-4 2xl:space-x-8">
            <div className="hidden xl:flex flex-row items-center space-x-3 2xl:space-x-10">
              {navLinks[1].map((item) => (
                <p key={item.text} className="cursor-pointer font-semibold">
                  {item.text}
                </p>
              ))}
            </div>

            <div className="flex flex-row items-center space-x-3">
              <Button
                size="icon"
                className="bg-[#0066B3] hover:bg-[#0066B3]/80 rounded-full w-10 h-10 p-2 translate-y-0!"
              >
                <Image
                  src={FilePenIcon}
                  alt="file-pen-icon"
                  className="w-auto h-4.5"
                />
              </Button>
              <Button
                variant="outline"
                className="text-sm px-3 py-4.5 flex flex-row justify-center items-center space-x-2 rounded-sm border-[#0066B3] translate-y-0!"
              >
                <p className="hidden sm:block">Menu</p>
                <Image src={MenuIcon} alt="menu-icon" className="w-auto h-6" />
              </Button>
            </div>
          </div>
        </div>
        {/* category */}
        <div className="flex flex-row justify-between items-center bg-[#0066B3] text-white px-8 sm:px-22 py-2.5 space-x-4 lg:space-x-8 xl:space-x-12">
          {/* categories */}
          <div
            className={cn(
              'hidden sm:flex flex-row justify-between items-center overflow-hidden space-x-1 sm:w-4/6 md:w-5/6',
              'sm:max-md:[&>*:nth-last-child(-n+5)]:hidden md:max-lg:[&>*:nth-last-child(-n+3)]:hidden lg:max-xl:[&>*:nth-last-child(-n+2)]:hidden',
            )}
          >
            {category.map((item) => (
              <div
                key={item.title}
                className="flex flex-row justify-start items-baseline space-x-1.5 cursor-pointer"
              >
                <p className="">{item.title}</p>
                <Image
                  src={ArrowIcon}
                  alt="arrow-down-icon"
                  className="w-auto h-1.5"
                />
              </div>
            ))}
          </div>

          <div className="flex flex-row justify-between items-center w-full sm:w-2/6 md:w-1/6">
            {/* more category */}
            <div className="flex flex-row flex-1 sm:flex-none justify-start items-baseline space-x-1.5 cursor-pointer">
              <p className="">More</p>
              <Image
                src={ArrowIcon}
                alt="arrow-down-icon"
                className="w-auto h-1.5"
              />
            </div>
            {/* language change */}
            <DropdownMenu>
              <DropdownMenuTrigger
                nativeButton={false}
                render={
                  <div className="flex flex-row justify-start items-baseline space-x-1.5 cursor-pointer">
                    <p className="first-letter:uppercase">{locale}</p>
                    <Image
                      src={ArrowIcon}
                      alt="arrow-down-icon"
                      className="w-auto h-1.5"
                    />
                  </div>
                }
              ></DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-20! rounded-md!">
                <Link href="/en">
                  <DropdownMenuItem>English</DropdownMenuItem>
                </Link>
                <Link href="/ar">
                  <DropdownMenuItem>Arabic</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* search */}
            <div className="cursor-pointer ps-4 sm:pl-0">
              <Image
                src={SearchIcon}
                alt="serach-icon"
                className="w-auto h-4"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
