'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetASample } from '@/context/get-a-sample.context'
import type { LocaleType } from '@/i18n/types'
import { cn } from 'cn'
import { ChevronRightIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import { dummyProdCategoryData } from './dummyProdCategory.data'

interface NavbarNavLinksType {
  text: string
  link: string
}

export default function MobileNavSheet() {
  const locale = useLocale() as LocaleType
  const t = useTranslations('Navbar')

  const navLinks = t.raw('navLinks') as NavbarNavLinksType[][]

  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('menu')
  const [openCategory, setOpenFilter] = useState<string | null>(null)

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
            <p className="hidden text-base sm:block">{t('menuBtnLabel')}</p>

            <OurIcon name="menu" className="size-5" />
          </Button>
        }
      />

      <SheetContent
        side="left"
        className="ltr:font-nobile rtl:font-cairo inset-y-4! top-4! bottom-4! h-auto! w-[94%]! max-w-80! rounded-e-md bg-white px-6 pt-12 pb-6 rtl:right-0! rtl:left-auto!"
      >
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value)
            setOpenFilter(null)
          }}
          className="relative flex h-full flex-col"
        >
          {/* Tabs */}
          <TabsList className="w-full shrink-0 rounded-md *:rounded-sm *:text-sm *:font-normal *:tracking-wider *:uppercase">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="quick_info">Quick Info</TabsTrigger>
          </TabsList>

          <div className="absolute inset-0 top-15">
            {/* MENU TAB */}
            <TabsContent
              value="menu"
              keepMounted
              className={cn(
                'flex h-full min-h-0 scrollbar-none flex-col overflow-hidden overflow-y-auto',
                'transition-opacity duration-300 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0',
              )}
            >
              {dummyProdCategoryData.map((category, i) => (
                <div
                  key={category.id}
                  className="border-b-2 border-[#787878]/30"
                >
                  {/* Category button */}
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFilter((prev) =>
                        prev === category.id ? null : category.id,
                      )
                    }
                    aria-expanded={openCategory === category.id}
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between py-3 text-left text-sm font-normal tracking-wider uppercase focus:ring-0 focus:outline-none',
                      i === 0 && 'pt-0',
                    )}
                  >
                    <span>{category.name}</span>
                    <ChevronRightIcon
                      size={15}
                      className={cn(
                        'stroke-1 transition-transform duration-300',
                        openCategory === category.id ? 'rotate-90' : 'rotate-0',
                      )}
                    />
                  </button>

                  {/* Subcategories */}
                  <div
                    className={cn(
                      'grid font-normal tracking-wider uppercase transition-[grid-template-rows] duration-300 ease-in-out',
                      openCategory === category.id
                        ? 'grid-rows-[1fr]'
                        : 'grid-rows-[0fr]',
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="flex flex-col bg-gray-50">
                        {category.subCategory.map((subCategory) => (
                          <Link
                            key={subCategory.id}
                            href={subCategory.href}
                            onClick={() => setOpen(false)}
                            className="border-t border-black/15 px-4 py-3 text-sm transition-colors hover:bg-gray-100"
                          >
                            {subCategory.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            {/* QUICK INFO TAB */}
            <TabsContent
              value="quick_info"
              keepMounted
              className={cn(
                'flex h-full min-h-0 scrollbar-none flex-col overflow-hidden overflow-y-auto *:first:pt-0',
                'transition-opacity duration-300 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0',
              )}
            >
              {[...navLinks[0], ...navLinks[1]].map((item, i) => (
                <Link
                  key={i}
                  href={`/${locale}${item.link}`}
                  onClick={() => setOpen(false)}
                  className="ltr:font-nobile rtl:font-cairo border-b-2 border-[#787878]/30 py-3 text-sm font-normal tracking-wider uppercase focus:ring-0 focus:outline-none"
                >
                  {item.text}
                </Link>
              ))}
              <div className="border-b-2 border-[#787878]/30 py-4">
                <button
                  type="button"
                  onClick={handleGetASample}
                  className="ltr:font-nobile rtl:font-cairo cursor-pointer text-sm font-normal tracking-wider uppercase focus:ring-0 focus:outline-none"
                >
                  Get a sample
                </button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
