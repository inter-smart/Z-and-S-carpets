import { ArrowIcon, FilePenIcon, MenuIcon, SearchIcon } from '@/assets/icons'
import { SiteLogo } from '@/assets/logos'
import LangDropdown from '@/components/navbar/lang-dropdown'
import { Button } from '@/components/ui/button'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

interface NavbarNavLinksType {
  text: string
  link: string
}

export default function Navbar() {
  const t = useTranslations('Navbar')

  const navLinks = t.raw('navLinks') as NavbarNavLinksType[][]
  const category = t.raw('category') as { title: string }[]

  return (
    <header className="fixed top-0 z-50 w-full text-sm shadow-md">
      {/* navigation */}
      <nav className="bg-white py-3">
        <div className="container-wrapper flex flex-row items-center justify-between">
          <div className="hidden flex-row items-center justify-start space-x-3 pe-10 lg:flex lg:w-5/12 2xl:space-x-10">
            {navLinks[0].map((item) => (
              <p key={item.text} className="cursor-pointer font-medium">
                {item.text}
              </p>
            ))}
          </div>

          {/* site logo */}
          <div className="flex w-1/2 flex-row items-center justify-start lg:w-2/12 lg:justify-center">
            {/* <Link href="/"> */}
            <Image
              src={SiteLogo}
              alt="Z&S Carpets"
              className="h-19 w-auto cursor-pointer"
            />
            {/* </Link> */}
          </div>

          <div className="flex w-1/2 flex-row items-center justify-end space-x-4 lg:w-5/12 2xl:space-x-8">
            <div className="hidden flex-row items-center space-x-3 xl:flex 2xl:space-x-10">
              {navLinks[1].map((item) => (
                <p key={item.text} className="cursor-pointer font-medium">
                  {item.text}
                </p>
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
      <div className="bg-[#0066B3] py-2.5 text-white">
        <div className="container-wrapper flex flex-row items-center justify-between space-x-4 lg:space-x-8 xl:space-x-12">
          {/* categories */}
          <div
            className={cn(
              'hidden flex-row items-center justify-between space-x-1 overflow-hidden sm:flex sm:w-4/6 md:w-5/6',
              'lg:max-xl:[&>*:nth-last-child(-n+2)]:hidden md:max-lg:[&>*:nth-last-child(-n+3)]:hidden sm:max-md:[&>*:nth-last-child(-n+5)]:hidden',
            )}
          >
            {category.map((item) => (
              <div
                key={item.title}
                className="flex cursor-pointer flex-row items-baseline justify-start space-x-1.5"
              >
                <p className="font-medium">{item.title}</p>
                <Image
                  src={ArrowIcon}
                  alt="arrow-down-icon"
                  className="h-1.5 w-auto"
                />
              </div>
            ))}
          </div>

          <div className="flex w-full flex-row items-center justify-between sm:w-2/6 md:w-1/6">
            {/* more category */}
            <div className="flex flex-1 cursor-pointer flex-row items-baseline justify-start space-x-1.5 sm:flex-none">
              <p className="font-medium">{t('categoryMoreBtnLable')}</p>
              <Image
                src={ArrowIcon}
                alt="arrow-down-icon"
                className="h-1.5 w-auto"
              />
            </div>
            {/* language change dropdown */}
            <LangDropdown />
            {/* search */}
            <div className="cursor-pointer ps-4 sm:pl-0">
              <Image
                src={SearchIcon}
                alt="serach-icon"
                className="h-4 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
