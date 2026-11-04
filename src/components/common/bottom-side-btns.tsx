import type { LocaleType } from '@/i18n/types'
import { toContactLink } from '@/lib/site-settings'
import type { SiteSettingsData } from '@/types/site-settings'
import { useLocale } from 'next-intl'
import Image from 'next/image'

export default function BottomSideBtns({
  buttons,
}: {
  // floating buttons added in the admin (the API returns active ones only);
  // nothing is rendered when there are none
  buttons?: SiteSettingsData['floating_buttons']
}) {
  const locale = useLocale() as LocaleType

  const apiButtons = (buttons ?? []).filter(
    (item) => item.icon.path && item.link,
  )

  if (apiButtons.length === 0) return null

  return (
    <div className="fixed bottom-14 z-40 flex flex-col-reverse gap-1.25 ltr:right-2 ltr:sm:right-5 rtl:left-2 rtl:sm:left-5">
      {apiButtons.map((item, index) => {
        const { href, external, color } = toContactLink(locale, item.link)
        return (
          <a
            key={index}
            className={`flex h-9.5 w-9.5 items-center justify-center rounded-sm p-2.5 ${color}`}
            href={href}
            aria-label={item.icon.alt || href}
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
          >
            {/* uploaded glyphs are single-colour; shown white */}
            <Image
              src={item.icon.path as string}
              alt=""
              width={20}
              height={20}
              className="size-5 object-contain brightness-0 invert"
            />
          </a>
        )
      })}
    </div>
  )
}
