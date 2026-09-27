'use client'

import { SiteLogo } from '@/assets/logos'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { OurIcon } from '@/components/ui/icon'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { LocaleType } from '@/i18n/types'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useState, type SubmitEvent } from 'react'
import NavbarLangDropdown from './navbar-lang.dropdown'

interface NavbarNavLinksType {
  text: string
  link: string
}

const categories = [
  { label: 'Product Category', value: null },
  { label: 'Artificial Grass', value: 'artificial-grass' },
  { label: 'Vinyl Flooring', value: 'vinyl-flooring' },
  { label: 'Deck Flooring', value: 'deck-flooring' },
  { label: 'Carpet Flooring', value: 'carpet-flooring' },
  { label: 'Wood Flooring', value: 'wood-flooring' },
]
const products = [
  { label: 'Product', value: null },
  { label: 'Landscaping Grass', value: 'landscaping-grass' },
  {
    label: 'Heterogeneous Vinyl Flooring',
    value: 'heterogeneous-vinyl-flooring',
  },
  { label: 'Plain Color Vinyl Flooring', value: 'plain-color-vinyl-flooring' },
  { label: 'Cresto Vinyl Flooring', value: 'cresto-vinyl-flooring' },
  { label: 'Wood Pattern Vinyl', value: 'wood-pattern-vinyl' },
]
const formField = ['Name', 'Phone Number', 'Email', 'Company Name']

export default function Navbar() {
  const locale = useLocale() as LocaleType
  const t = useTranslations('Navbar')

  const navLinks = t.raw('navLinks') as NavbarNavLinksType[][]
  const category = t.raw('category') as { title: string }[]

  const [openGetASampleFormDialog, setOpenGetASampleFormDialog] =
    useState(false)

  const handleForm = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log('Form submitted.')
    setOpenGetASampleFormDialog(false)
  }

  return (
    <>
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
              <Link
                href={`/${locale}`}
                className="focus:ring-0 focus:outline-none"
              >
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
                    href={`/${locale}${item.link}`}
                    className="font-medium"
                  >
                    {item.text}
                  </Link>
                ))}
                <button
                  onClick={() => setOpenGetASampleFormDialog(true)}
                  className="cursor-pointer font-medium"
                >
                  Get a sample
                </button>
              </div>

              <div className="flex flex-row items-center space-x-3">
                {/* writeTo btn */}
                <Button
                  size="icon"
                  className="h-9.5 w-9.5 translate-y-0! rounded-full bg-[#0066B3] hover:bg-[#0066B3]/90"
                >
                  <OurIcon name="file-pen" className="size-4.5" />
                </Button>
                {/* menu btn */}
                <Button
                  variant="outline"
                  className="ltr:font-manrope rtl:font-cairo flex translate-y-0! flex-row items-center justify-center space-x-2 rounded-sm border-[#0066B3] px-3 py-4.25 text-sm font-medium"
                >
                  <p className="hidden sm:block">{t('menuBtnLabel')}</p>
                  <OurIcon name="menu" className="size-7" />
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
              {category.map((item, i) => (
                <p
                  key={i}
                  className="flex cursor-pointer flex-row items-center space-x-0.5 sm:space-x-1.5"
                >
                  <span className="first-letter:uppercase">{item.title}</span>
                  <OurIcon name="chevron-down" className="size-2.5" />
                </p>
              ))}
            </div>
            {/* more category btn */}
            <p className="flex cursor-pointer flex-row items-center space-x-0.5 sm:space-x-1.5">
              <span className="first-letter:uppercase">
                {t('categoryMoreBtnLabel')}
              </span>
              <OurIcon name="chevron-down" className="size-2.5" />
            </p>
            {/* language change dropdown */}
            <NavbarLangDropdown />
            {/* search */}
            <p className="cursor-pointer space-x-0.5 sm:space-x-1.5">
              <OurIcon name="search" className="size-4" />
            </p>
          </div>
        </div>
      </header>

      {/* GetASample Form Dialog */}
      <Dialog
        open={openGetASampleFormDialog}
        onOpenChange={setOpenGetASampleFormDialog}
      >
        <DialogContent className="flex min-h-100 flex-row items-center justify-center rounded-sm bg-[#023260] p-5 text-white sm:min-w-120 md:p-10 lg:p-12">
          <form
            className="flex w-full flex-col items-start"
            onSubmit={handleForm}
          >
            <span className="our-heading mt-5">Get a Sample</span>
            <span className="our-text mt-1 font-normal">
              Request a sample before you choose.
            </span>
            <div className="mt-8 grid w-full grid-cols-1 gap-3">
              <input
                key={formField[0]}
                aria-label={formField[0]}
                placeholder={`${formField[0]}*`}
                required={true}
                className="w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20"
              />
              <input
                key={formField[1]}
                aria-label={formField[1]}
                placeholder={`${formField[1]}*`}
                required={true}
                type="tel"
                dir="ltr"
                pattern="[0-9\s\-\(\)\+]{7,20}"
                title="Allowed: digits, +, spaces, hyphens, parentheses"
                className="w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20"
              />
              <input
                key={formField[2]}
                aria-label={formField[2]}
                placeholder={`${formField[2]}*`}
                required={true}
                type="email"
                dir="ltr"
                className="w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20"
              />
              {/* Product Categories */}
              <Select items={categories} required>
                <SelectTrigger className="h-12! w-full rounded-sm border-white/20 bg-transparent px-5 text-sm data-placeholder:text-white/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-sm px-2">
                  <SelectGroup>
                    {categories.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className={cn(
                          'rounded-sm text-sm',
                          !item.value && 'text-black/40',
                        )}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* Products */}
              <Select items={products} required>
                <SelectTrigger className="h-12! w-full rounded-sm border-white/20 bg-transparent px-5 text-sm data-placeholder:text-white/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-sm px-2">
                  <SelectGroup>
                    {products.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        className={cn(
                          'rounded-sm text-sm',
                          !item.value && 'text-black/40',
                        )}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="bg-our-purple our-btn hover:bg-our-purple ms-auto mt-10 w-fit rounded-sm border p-2 px-10 text-white"
              type="submit"
            >
              <span className="font-medium">Submit</span>
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
