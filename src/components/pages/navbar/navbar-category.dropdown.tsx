'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import type { LocaleType } from '@/i18n/types'
import { cn } from 'cn'
import { ChevronDownIcon, ChevronRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import NavbarLangDropdown from './navbar-lang.dropdown'

const vinylProducts = [
  {
    name: 'Granite Vinyl',
    href: '#',
  },
  {
    name: 'Wood Pattern Vinyl',
    href: '#',
  },
  {
    name: 'Coin Vinyl Flooring',
    href: '#',
  },
  {
    name: 'Linoleum Vinyl Flooring',
    href: '#',
  },
  {
    name: 'Homogeneous Medical Vinyl Flooring',
    href: '#',
  },
  {
    name: 'Sigma Medical Vinyl Flooring',
    href: '#',
  },
  {
    name: 'Heterogeneous Vinyl Flooring',
    href: '#',
  },
  {
    name: 'Plain Color Vinyl Flooring',
    href: '#',
  },
  {
    name: 'Cresto Vinyl Flooring',
    href: '#',
  },
  {
    name: 'Vinyl Flooring Accessories',
    href: '#',
  },
]

const featuredProducts = [
  {
    name: 'Landscaping Grass',
    image: '/images/floor-img-35.webp',
    badge: 'BEST SELLER',
    href: '#',
  },
  {
    name: 'Wood Pattern Vinyl',
    image: '/images/floor-img-30.webp',
    href: '#',
  },
]

function DropdownContent({ category }: { category: { title: string } }) {
  const locale = useLocale() as LocaleType

  return (
    <div className="p-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="ltr:font-nobile rtl:font-cairo text-lg font-medium text-black">
          {category.title}
        </h2>

        <Link
          href={`/${locale}/category`}
          className="group text-our-purple flex items-center gap-2 text-sm font-medium"
        >
          <span>View All</span>
          <OurIcon
            name="arrow-right"
            className="text-our-purple size-3.5 rtl:rotate-180"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="mt-2 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr_1.5fr]">
        {/* Product links */}
        <div className="lg:col-span-2">
          <div className="grid gap-x-14 md:grid-cols-2">
            {vinylProducts.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                className="group hover:border-our-blue hover:text-our-blue flex items-center justify-between border-b-2 border-black/15 py-2 text-sm font-light text-black transition-colors"
              >
                <span className="pe-2">{product.name}</span>
                <ChevronRight
                  size={16}
                  className="invisible shrink-0 stroke-1 group-hover:visible rtl:rotate-180"
                />
              </Link>
            ))}
          </div>

          {/* WhatsApp */}
          <Button
            nativeButton={false}
            render={
              <a
                href={`https://wa.me/${'+971 XX XXX XXXX'}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
              />
            }
            className="our-btn bg-our-green hover:bg-our-green mt-7 w-fit px-3! text-xs! text-white"
          >
            <OurIcon name="whatsapp" />
            <span>Chat on Whatsapp</span>
          </Button>
        </div>

        {/* Featured products */}
        <div className="hidden grid-cols-2 gap-5 md:grid">
          {featuredProducts.map((product) => (
            <Link
              key={product.name}
              href={product.href}
              className="group border-our-blue h-fit overflow-hidden rounded-md border"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {product.badge && (
                  <span className="absolute top-3 left-3 rounded bg-white px-2 py-0.5 text-[9px]">
                    {product.badge}
                  </span>
                )}
              </div>

              <div className="flex h-15 items-center px-4">
                <h3 className="text-sm font-medium text-black">
                  {product.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function NavbarCategoryDropdown() {
  const t = useTranslations('Navbar')
  const category = t.raw('category') as { title: string }[]

  return (
    <NavigationMenu className="max-w-none!">
      <NavigationMenuList className="flex w-full! items-center justify-between">
        {/* category */}
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
          {category.map((item, i) => (
            <NavigationMenuItem key={i} className="hover:bg-transparent!">
              <NavigationMenuTrigger className="navigation-menu-trigger-style-change p-0 text-sm font-normal">
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="rounded-md bg-white">
                <DropdownContent category={item} />
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </div>
        {/* more category btn */}
        <p className="flex cursor-pointer flex-row items-center space-x-0.5 py-2.25 sm:space-x-1.5">
          <span className="first-letter:uppercase">
            {t('categoryMoreBtnLabel')}
          </span>
          <ChevronDownIcon size={12} />
        </p>
        {/* language change dropdown */}
        <NavbarLangDropdown />
        {/* search */}
        <p className="cursor-pointer space-x-0.5 sm:space-x-1.5">
          <OurIcon name="search" className="size-4" />
        </p>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
