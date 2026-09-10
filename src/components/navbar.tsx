import { FilePenIcon, MenuIcon } from '@/assets/icons'
import { SiteLogo } from '@/assets/logos'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from './ui/button'

interface NavbarNavLinksType {
  text: string
  link: string
}

export default function Navbar() {
  const t = useTranslations('Navbar')

  const navLinks = t.raw('navLinks') as NavbarNavLinksType[][]

  return (
    <nav className="w-full px-8 sm:px-22 text-sm">
      {/* navigation */}
      <div className="flex flex-row justify-between items-center py-3">
        <div className="lg:w-5/12 hidden lg:flex flex-row justify-start items-center space-x-3 2xl:space-x-10 pe-10">
          {navLinks[0].map((item) => (
            <p key={item.text} className="">
              {item.text}
            </p>
          ))}
        </div>

        {/* site logo */}
        <div className="w-1/2 lg:w-2/12 flex flex-row justify-start lg:justify-center items-center">
          <Image src={SiteLogo} alt="site-logo" className="h-19 w-auto" />
        </div>

        <div className="w-1/2 lg:w-5/12 flex flex-row justify-end items-center space-x-4 2xl:space-x-8">
          <div className="hidden xl:flex flex-row items-center space-x-3 2xl:space-x-10">
            {navLinks[1].map((item) => (
              <p key={item.text} className="">
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
              className="text-sm px-3 py-4.5 flex flex-row justify-center items-center space-x-2 border-[#0066B3] translate-y-0!"
            >
              <p className="hidden sm:block">Menu</p>
              <Image src={MenuIcon} alt="menu-icon" className="w-auto h-6" />
            </Button>
          </div>
        </div>
      </div>
      {/* category */}
      <div></div>
    </nav>
  )
}
