import { ArrowIcon, FilePenIcon, MenuIcon, SearchIcon } from '@/assets/icons'
import { SiteLogo } from '@/assets/logos'
import LangDropdown from '@/components/navbar/lang-dropdown'
import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

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
    <header className="fixed top-0 z-50 w-full text-sm shadow-md">
      {/* navigation */}
      <nav className="bg-white py-3">
        <div className="container-wrapper flex flex-row items-center justify-between">
          <div className="hidden flex-row items-center justify-between space-x-3 pe-25 lg:w-5/12 xl:flex 2xl:space-x-10">
            {navLinks[0].map((item, i) => (
              <Link
                key={i}
                href={`/${locale}${item.link}`}
                className="font-medium"
              >
                {item.text}
              </Link>
            ))}
          </div>

          {/* site logo */}
          <div className="flex w-1/2 flex-row items-center justify-start lg:w-2/12 lg:justify-center">
            <Link href={`/${locale}`}>
              <Image
                src={SiteLogo}
                alt="Z&S Carpets"
                className="h-19 w-auto cursor-pointer"
              />
            </Link>
          </div>

          <div className="flex w-1/2 flex-row items-center justify-end space-x-4 lg:w-5/12 2xl:space-x-8">
            <div className="hidden flex-row items-center space-x-3 xl:flex 2xl:space-x-10">
              {navLinks[1].map((item, i) => (
                <Link
                  key={i}
                  href={`${locale}/${item.link}`}
                  className="font-medium"
                >
                  {item.text}
                </Link>
              ))}
            </div>

            <div className="flex flex-row items-center space-x-3">
              <Button
                size="icon"
                className="h-10 w-10 translate-y-0! rounded-full bg-[#0066B3] p-2 hover:bg-[#0066B3]/90"
              >
                <Image
                  src={FilePenIcon}
                  alt="file-pen-icon"
                  className="h-4.5 w-auto"
                />
              </Button>
              <Button
                variant="outline"
                className="flex translate-y-0! flex-row items-center justify-center space-x-2 rounded-sm border-[#0066B3] px-3 py-4.5 text-sm font-medium"
              >
                <p className="hidden sm:block">{t('menuBtnLable')}</p>
                <Image src={MenuIcon} alt="menu-icon" className="h-6 w-auto" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* category menu */}
      <div className="bg-[#0066B3] py-2.25 text-white">
        <div className="container-wrapper flex w-full items-center justify-between">
          {/* categories */}
          <div
            className={cn(
              'contents overflow-hidden',
              'max-[299px]:[&>*:nth-last-child(-n+7)]:hidden',
              'max-[449px]:[&>*:nth-last-child(-n+6)]:hidden',
              'max-sm:[&>*:nth-last-child(-n+5)]:hidden',
              'max-md:[&>*:nth-last-child(-n+4)]:hidden',
              'max-lg:[&>*:nth-last-child(-n+3)]:hidden',
              'max-xl:[&>*:nth-last-child(-n+2)]:hidden',
            )}
          >
            {/* categories */}
            {category.map((item) => (
              <div
                key={item.title}
                className="flex cursor-pointer flex-row items-baseline space-x-0.5 sm:space-x-1.5"
              >
                <p>{item.title}</p>
                <Image
                  src={ArrowIcon}
                  alt="arrow-down-icon"
                  className="h-1.5 w-auto"
                />
              </div>
            ))}
          </div>
          {/* more category btn */}
          <div className="flex cursor-pointer flex-row items-baseline space-x-0.5 sm:space-x-1.5">
            <p>{t('categoryMoreBtnLable')}</p>
            <Image
              src={ArrowIcon}
              alt="arrow-down-icon"
              className="h-1.5 w-auto"
            />
          </div>
          {/* language change dropdown */}
          <LangDropdown />
          {/* search */}
          <div className="cursor-pointer">
            <Image src={SearchIcon} alt="serach-icon" className="h-4 w-auto" />
          </div>
        </div>
      </div>
    </header>
  )
}
