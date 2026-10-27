'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetASample } from '@/context/get-a-sample.context'
import { useSearch } from '@/context/search.context'
import type { LocaleType } from '@/i18n/types'
import { localizedHref } from '@/lib/site-settings'
import { cn } from 'cn'
import { ChevronRightIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import type { NavCategory } from './navbar-category.dropdown'

interface NavbarNavLinksType {
  text: string
  link: string
}

export default function MobileNavSheet({
  links,
  categories,
}: {
  // flat page links from the site settings; the translated links are the fallback
  links?: NavbarNavLinksType[]
  // site-settings categories; the translated list is the fallback (same as the category bar)
  categories?: NavCategory[]
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('Navbar')

  const navLinks = links ?? (t.raw('navLinks') as NavbarNavLinksType[][]).flat()

  const categoryList =
    categories ?? (t.raw('category') as { id?: number; title: string }[])
  const hrefFor = (item: NavCategory) =>
    item.slug
      ? `/${locale}/products?category=${item.slug}`
      : `/${locale}/products`

  const renderProducts = (products: NavCategory['products'] = []) =>
    products.map((product) => (
      <Link
        key={product.id}
        href={`/${locale}/products/${product.slug}`}
        onClick={() => setOpen(false)}
        className="flex items-center justify-between border-t border-black/10 bg-white py-2.5 ps-8 pe-4 text-xs normal-case transition-colors hover:bg-gray-100"
      >
        <span>{product.title}</span>
        {product.badge && (
          <span className="rounded-xs bg-gray-100 px-1.5 py-0.5 text-[10px] uppercase">
            {product.badge}
          </span>
        )}
      </Link>
    ))

  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('menu')
  const [openCategory, setOpenFilter] = useState<string | null>(null)

  const { setOpen: setGetASampleOpen } = useGetASample()
  const { setOpen: setSearchOpen } = useSearch()

  const handleSearch = () => {
    setOpen(false)
    setSearchOpen(true)
  }

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
            <TabsTrigger value="menu">{t('menuBtnLabel')}</TabsTrigger>
            <TabsTrigger value="quick_info">{t('quickInfoLabel')}</TabsTrigger>
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
              <button
                type="button"
                onClick={handleSearch}
                className="mb-3 flex w-full items-center gap-2 rounded-md border border-black/15 px-3 py-2.5 text-start text-sm text-black/60 focus:ring-0 focus:outline-none"
              >
                <OurIcon name="search" className="size-4" />
                {t('searchLabel')}
              </button>
              {categoryList.map((category, i) => {
                const key = String(category.id ?? i)
                const children = (category as NavCategory).children ?? []
                const ownProducts = (category as NavCategory).products ?? []
                const expandable = children.length > 0 || ownProducts.length > 0
                const rowClass = cn(
                  'flex w-full items-center justify-between py-3 text-start text-sm font-normal tracking-wider uppercase focus:ring-0 focus:outline-none',
                  i === 0 && 'pt-0',
                )
                return (
                  <div key={key} className="border-b-2 border-[#787878]/30">
                    {!expandable ? (
                      <Link
                        href={hrefFor(category as NavCategory)}
                        onClick={() => setOpen(false)}
                        className={rowClass}
                      >
                        <span>{category.title}</span>
                      </Link>
                    ) : (
                      <>
                        {/* Category button */}
                        <button
                          type="button"
                          onClick={() =>
                            setOpenFilter((prev) => (prev === key ? null : key))
                          }
                          aria-expanded={openCategory === key}
                          className={cn(rowClass, 'cursor-pointer')}
                        >
                          <span>{category.title}</span>
                          <ChevronRightIcon
                            size={15}
                            className={cn(
                              'stroke-1 transition-transform duration-300 rtl:-scale-x-100',
                              openCategory === key ? 'rotate-90' : 'rotate-0',
                            )}
                          />
                        </button>

                        {/* Subcategories */}
                        <div
                          className={cn(
                            'grid font-normal tracking-wider uppercase transition-[grid-template-rows] duration-300 ease-in-out',
                            openCategory === key
                              ? 'grid-rows-[1fr]'
                              : 'grid-rows-[0fr]',
                          )}
                        >
                          <div className="min-h-0 overflow-hidden">
                            <div className="flex flex-col bg-gray-50">
                              <Link
                                href={hrefFor(category as NavCategory)}
                                onClick={() => setOpen(false)}
                                className="border-t border-black/15 px-4 py-3 text-sm transition-colors hover:bg-gray-100"
                              >
                                {t('viewAllLabel')}
                              </Link>
                              {children.map((child, j) => (
                                <div key={child.id ?? j}>
                                  <Link
                                    href={hrefFor(child)}
                                    onClick={() => setOpen(false)}
                                    className="block border-t border-black/15 px-4 py-3 text-sm transition-colors hover:bg-gray-100"
                                  >
                                    {child.title}
                                  </Link>
                                  {renderProducts(child.products)}
                                </div>
                              ))}
                              {children.length === 0 &&
                                renderProducts(ownProducts)}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
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
              {navLinks.map((item, i) => (
                <Link
                  key={i}
                  href={localizedHref(locale, item.link)}
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
                  {t('getASampleLabel')}
                </button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </SheetContent>
    </Sheet>
  )
}
