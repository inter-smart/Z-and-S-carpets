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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { LocaleType } from '@/i18n/types'
import { cn } from 'cn'
import { ChevronDownIcon, ChevronRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import NavbarLangDropdown from './navbar-lang.dropdown'

interface VinylProduct {
  id: string
  name: string
  products: {
    name: string
    image: string
    badge?: string
    href: string
  }[]
  href: string
}

const dummySubCategory: VinylProduct[] = [
  {
    id: '0',
    name: 'Granite Vinyl',
    href: '#',
    products: [
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
    ],
  },
  {
    id: '1',
    name: 'Wood Pattern Vinyl',
    href: '#',
    products: [
      {
        name: 'Landscaping Grass',
        image: '/images/floor-img-12.webp',
        badge: 'BEST SELLER',
        href: '#',
      },
      {
        name: 'Wood Pattern Vinyl',
        image: '/images/floor-img-15.webp',
        href: '#',
      },
    ],
  },
  {
    id: '2',
    name: 'Coin Vinyl Flooring',
    href: '#',
    products: [
      {
        name: 'Landscaping Grass',
        image: '/images/floor-img-23.webp',
        href: '#',
      },
      {
        name: 'Wood Pattern Vinyl',
        image: '/images/floor-img-25.webp',
        badge: 'BEST SELLER',
        href: '#',
      },
    ],
  },
  {
    id: '3',
    name: 'Linoleum Vinyl Flooring',
    href: '#',
    products: [
      {
        name: 'Landscaping Grass',
        image: '/images/floor-img-31.webp',
        badge: 'BEST SELLER',
        href: '#',
      },
      {
        name: 'Wood Pattern Vinyl',
        image: '/images/floor-img-38.webp',
        href: '#',
      },
    ],
  },
  {
    id: '4',
    name: 'Homogeneous Medical Vinyl Flooring',
    href: '#',
    products: [
      {
        name: 'Landscaping Grass',
        image: '/images/floor-img-46.webp',
        href: '#',
      },
      {
        name: 'Wood Pattern Vinyl',
        image: '/images/floor-img-13.webp',
        badge: 'BEST SELLER',
        href: '#',
      },
    ],
  },
  {
    id: '5',
    name: 'Sigma Medical Vinyl Flooring',
    href: '#',
    products: [
      {
        name: 'Landscaping Grass',
        image: '/images/floor-img-51.webp',
        badge: 'BEST SELLER',
        href: '#',
      },
      {
        name: 'Wood Pattern Vinyl',
        image: '/images/floor-img-11.webp',
        href: '#',
      },
    ],
  },
  {
    id: '6',
    name: 'Heterogeneous Vinyl Flooring',
    href: '#',
    products: [
      {
        name: 'Landscaping Grass',
        image: '/images/floor-img-37.webp',
        badge: 'BEST SELLER',
        href: '#',
      },
      {
        name: 'Wood Pattern Vinyl',
        image: '/images/floor-img-49.webp',
        href: '#',
      },
    ],
  },
  {
    id: '7',
    name: 'Plain Color Vinyl Flooring',
    href: '#',
    products: [
      {
        name: 'Landscaping Grass',
        image: '/images/floor-img-26.webp',
        badge: 'BEST SELLER',
        href: '#',
      },
      {
        name: 'Wood Pattern Vinyl',
        image: '/images/floor-img-28.webp',
        href: '#',
      },
    ],
  },
  {
    id: '8',
    name: 'Cresto Vinyl Flooring',
    href: '#',
    products: [
      {
        name: 'Landscaping Grass',
        image: '/images/floor-img-33.webp',
        href: '#',
      },
      {
        name: 'Wood Pattern Vinyl',
        image: '/images/floor-img-37.webp',
        badge: 'BEST SELLER',
        href: '#',
      },
    ],
  },
  {
    id: '9',
    name: 'Vinyl Flooring Accessories',
    href: '#',
    products: [
      {
        name: 'Landscaping Grass',
        image: '/images/floor-img-44.webp',
        badge: 'BEST SELLER',
        href: '#',
      },
      {
        name: 'Wood Pattern Vinyl',
        image: '/images/floor-img-37.webp',
        href: '#',
      },
    ],
  },
]

interface NavProduct {
  id: number
  slug: string
  title: string
  badge: string | null
  image: { path: string | null; alt: string }
}

export interface NavCategory {
  id?: number
  slug?: string
  title: string
  // from the site settings; undefined for the translated fallback list
  products?: NavProduct[]
  children?: NavCategory[]
}

interface MenuCard {
  key: string
  name: string
  image: string | null
  alt: string
  badge?: string | null
  href: string
}

interface MenuSub {
  id: string
  title: string
  viewAllHref: string
  cards: MenuCard[]
}

// Product cards shown per category / sub-category
const MAX_CARDS = 2

function DropdownContent({
  category,
  whatsapp,
}: {
  category: NavCategory
  whatsapp?: string
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('Navbar')
  // wa.me wants digits only
  const whatsappDigits = (whatsapp ?? '').replace(/\D/g, '')

  const toCard = (product: NavProduct): MenuCard => ({
    key: String(product.id),
    name: product.title,
    image: product.image.path,
    alt: product.image.alt || product.title,
    badge: product.badge,
    href: `/${locale}/products/${product.slug}`,
  })

  const categoryHref = category.slug
    ? `/${locale}/products?category=${category.slug}`
    : `/${locale}/products`

  // Sub-categories, each with its own cards. Real data when the category comes from the site
  // settings (one level of children); the dummy list while the translated fallback is used.
  const subs: MenuSub[] = category.children
    ? category.children.map((child) => ({
        id: String(child.id),
        title: child.title,
        viewAllHref: child.slug
          ? `/${locale}/products?category=${child.slug}`
          : categoryHref,
        cards: (child.products ?? []).map(toCard),
      }))
    : dummySubCategory.map((sub) => ({
        id: sub.id,
        title: sub.name,
        viewAllHref: `/${locale}/${sub.href}`,
        cards: sub.products.map((product) => ({
          key: product.name,
          name: product.name,
          image: product.image,
          alt: product.name,
          badge: product.badge,
          href: `/${locale}/${product.href}`,
        })),
      }))

  // A category with sub-categories shows the list and the selected one's cards; a category
  // without shows just its own products. Each category decides for itself.
  const hasSubCategories = subs.length > 0
  const [selectedId, setSelectedId] = useState(subs[0]?.id)
  const selected = subs.find((sub) => sub.id === selectedId) ?? subs[0]

  const cards = (
    hasSubCategories ? selected.cards : (category.products ?? []).map(toCard)
  ).slice(0, MAX_CARDS)
  const viewAllHref = hasSubCategories ? selected.viewAllHref : categoryHref

  return (
    <div className="p-7">
      {/* Header */}
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <h2 className="ltr:font-nobile rtl:font-cairo text-2xl font-medium text-black">
          {category.title}
        </h2>

        <Link
          href={viewAllHref}
          className="group text-our-purple flex items-start gap-2 text-sm font-medium"
        >
          <span>{t('viewAllLabel')}</span>
          <OurIcon
            name="arrow-right"
            className="text-our-purple size-3 rtl:rotate-180"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="mt-2 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr_1.8fr]">
        {/* Sub-category links */}
        <div className="lg:col-span-2">
          {hasSubCategories && (
            <div className="grid gap-x-8 md:grid-cols-2">
              {subs.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => setSelectedId(sub.id)}
                  className={cn(
                    'group hover:border-our-blue hover:text-our-blue flex items-center justify-between border-b-2 border-black/15 py-2 text-sm text-black transition-colors',
                    sub.id === selected.id && 'border-our-blue',
                  )}
                >
                  <span className="pe-2 whitespace-nowrap">{sub.title}</span>
                  <ChevronRight
                    size={16}
                    className={cn(
                      'invisible shrink-0 stroke-1 rtl:rotate-180',
                      sub.id === selected.id && 'visible',
                    )}
                  />
                </button>
              ))}
            </div>
          )}

          {/* WhatsApp: only when the site settings have a number */}
          {whatsappDigits && (
            <Button
              nativeButton={false}
              render={
                <a
                  href={`https://wa.me/${whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                />
              }
              className={cn(
                'our-btn bg-our-green hover:bg-our-green w-fit px-3! text-xs! text-white',
                hasSubCategories && 'mt-7',
              )}
            >
              <OurIcon name="whatsapp" className="size-3" />
              <span>{t('chatOnWhatsappLabel')}</span>
            </Button>
          )}
        </div>

        {/* Featured products */}
        <div className="hidden grid-cols-2 gap-3 md:grid">
          {cards.map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="group border-our-blue h-fit overflow-hidden rounded-md border"
            >
              <div className="relative h-35 overflow-hidden">
                {card.image && (
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="200px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}

                {card.badge && (
                  <span className="absolute top-2 left-2 rounded-xs bg-white px-1.5 py-0.5 text-xs">
                    {card.badge}
                  </span>
                )}
              </div>

              <div className="flex h-12 items-center px-4">
                <h3 className="text-sm font-medium text-black">{card.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mirrors the bar's responsive hiding (the last N categories are hidden below a breakpoint),
// so "More" lists exactly the ones that are not visible in the bar at the current width.
// Full class names are written out so Tailwind can see them.
const SHOW_IN_MORE_WHEN_HIDDEN = [
  'max-xl:flex', // last
  'max-xl:flex', // 2nd last
  'max-lg:flex',
  'max-md:flex',
  'max-sm:flex',
  'max-[449px]:flex',
  'max-[299px]:flex',
]

function MoreCategories({
  categories,
  label,
}: {
  categories: NavCategory[]
  label: string
}) {
  const locale = useLocale() as LocaleType
  const [open, setOpen] = useState(false)

  const hrefFor = (item: NavCategory) =>
    item.slug
      ? `/${locale}/products?category=${item.slug}`
      : `/${locale}/products`

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* nothing is hidden from the bar from xl up, so "More" is only needed below it */}
      <DropdownMenuTrigger className="py-2.25 focus:ring-0 focus:outline-none xl:hidden">
        <span className="flex cursor-pointer flex-row items-center space-x-0.5 text-base sm:space-x-1.5">
          <span className="first-letter:uppercase">{label}</span>
          <ChevronDownIcon
            size={12}
            className={cn(
              'transition-transform duration-300',
              open ? 'rotate-180' : 'rotate-0',
            )}
          />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={6}
        align="end"
        className="min-w-44! rounded-md! p-1"
      >
        {categories.map((item, i) => {
          const fromEnd = categories.length - i - 1
          const showWhen = SHOW_IN_MORE_WHEN_HIDDEN[fromEnd]
          if (!showWhen) return null
          return (
            <div key={item.id ?? i} className={cn('hidden flex-col', showWhen)}>
              <Link
                href={hrefFor(item)}
                onClick={() => setOpen(false)}
                className="hover:bg-accent rounded-sm px-3 py-2 text-sm font-medium"
              >
                {item.title}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.id}
                  href={hrefFor(child)}
                  onClick={() => setOpen(false)}
                  className="hover:bg-accent text-muted-foreground rounded-sm py-1.5 ps-6 pe-3 text-sm"
                >
                  {child.title}
                </Link>
              ))}
            </div>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default function NavbarCategoryDropdown({
  categories,
  whatsapp,
}: {
  // footer.whatsapp_number from the site settings; the chat button is hidden without it
  whatsapp?: string
  // from the site settings (show_in_navbar categories); the translated list is the fallback
  categories?: NavCategory[]
}) {
  const t = useTranslations('Navbar')
  const category =
    categories ?? (t.raw('category') as { id?: number; title: string }[])

  const [openMenu, setOpenMenu] = useState('')

  useEffect(() => {
    if (openMenu) {
      document.documentElement.style.overflow = 'hidden'
      document.documentElement.style.scrollbarGutter = 'stable'
    } else {
      document.documentElement.style.overflow = ''
      document.documentElement.style.scrollbarGutter = ''
    }

    return () => {
      document.documentElement.style.overflow = ''
      document.documentElement.style.scrollbarGutter = ''
    }
  }, [openMenu])

  return (
    <NavigationMenu
      className="max-w-none!"
      value={openMenu}
      onValueChange={setOpenMenu}
    >
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
            <NavigationMenuItem
              key={item.id ?? i}
              className="hover:bg-transparent!"
            >
              <NavigationMenuTrigger className="navigation-menu-trigger-style-change h-fit! px-0! py-1.75! text-base font-normal">
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="z-50 overflow-y-auto">
                <DropdownContent category={item} whatsapp={whatsapp} />
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </div>
        {/* more category btn: lists the categories the bar hides at the current width */}
        {category.length > 0 && (
          <MoreCategories
            categories={category}
            label={t('categoryMoreBtnLabel')}
          />
        )}
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
