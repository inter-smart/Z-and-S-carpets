import type { LocaleType } from '@/i18n/types'
import type { BlogAd } from '@/types/blog'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

// An ad banner from the Ads Banner master: the image (the offer text is part of the picture) that
// leads to the banner's link. Site paths get the visitor's language; full URLs open as they are.
export default function AdBanner({ ad }: { ad: BlogAd }) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('BlogsPage.BlogListSection')

  if (!ad.media.path) return null

  const alt =
    (locale === 'ar' ? ad.media.alt_ar || ad.media.alt : ad.media.alt) ||
    'Advertisement'

  const link = ad.link.trim()
  const buttonText =
    (locale === 'ar' ? ad.button_text_ar || ad.button_text : ad.button_text) ||
    t('shopNow')

  const image = (
    <div className="relative h-60 w-full overflow-hidden sm:h-80 lg:h-100">
      <Image
        src={ad.media.path}
        alt={alt}
        fill
        sizes="(max-width: 1280px) 100vw, 1200px"
        className="object-cover"
      />
      {link && (
        <span className="our-btn hover:bg-input/50 hover:text-foreground absolute bottom-[10%] left-[79.5%] inline-flex h-7 w-fit items-center justify-center rounded-md border border-white bg-transparent text-xs font-medium whitespace-nowrap text-white transition-all">
          {buttonText}
        </span>
      )}
    </div>
  )

  if (!link) return <div className="my-5 lg:my-10">{image}</div>

  const external = /^https?:\/\//i.test(link)
  const href =
    external || /^\/(en|ar)(\/|$)/.test(link) || !link.startsWith('/')
      ? link
      : `/${locale}${link}`

  return (
    <div className="my-5 lg:my-10">
      {external || ad.new_tab ? (
        <a
          href={href}
          target={ad.new_tab ? '_blank' : undefined}
          rel="noopener noreferrer"
          className="block"
        >
          {image}
        </a>
      ) : (
        <Link href={href} className="block">
          {image}
        </Link>
      )}
    </div>
  )
}
