import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useGetASample } from '@/context/get-a-sample.context'
import type { LocaleType } from '@/i18n/types'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'

interface NavbarNavLinksType {
  text: string
  link: string
}

export default function MobileNavSheet() {
  const locale = useLocale() as LocaleType
  const t = useTranslations('Navbar')

  const navLinks = t.raw('navLinks') as NavbarNavLinksType[][]

  const [open, setOpen] = useState(false)
  const { setOpen: setGetASampleOpen } = useGetASample()

  const handleGetASample = () => {
    setOpen(false)
    setGetASampleOpen(true)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            className="ltr:font-manrope rtl:font-cairo flex flex-row items-center justify-center rounded-sm border-[#0066B3] px-2.5 py-3.75 text-sm font-medium hover:bg-transparent"
          >
            <p className="hidden text-sm sm:block">{t('menuBtnLabel')}</p>
            <OurIcon name="menu" className="size-5" />
          </Button>
        }
      />
      <SheetContent
        side="left"
        className="inset-y-4! top-4! bottom-4! h-auto! w-[94%]! max-w-80! scrollbar-none overflow-y-scroll rounded-e-md bg-white pt-5 rtl:right-0! rtl:left-auto!"
      >
        <SheetHeader>
          <SheetTitle>
            <p className="our-heading text-lg uppercase">Menu</p>
          </SheetTitle>
        </SheetHeader>
        <div className="mx-6 -mt-7 flex flex-col">
          {[...navLinks[0], ...navLinks[1]].map((item, i) => (
            <div key={i} className="border-b-2 border-[#787878]/30 py-4">
              <Link
                href={`/${locale}${item.link}`}
                onClick={() => setOpen(false)}
                className="ltr:font-nobile rtl:font-cairo w-fit text-sm font-normal tracking-wider uppercase focus:ring-0 focus:outline-none"
              >
                {item.text}
              </Link>
            </div>
          ))}
          <div className="border-b-2 border-[#787878]/30 py-4">
            <button
              onClick={handleGetASample}
              className="ltr:font-nobile rtl:font-cairo cursor-pointer text-sm font-normal tracking-wider uppercase focus:ring-0 focus:outline-none"
            >
              Get a sample
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
