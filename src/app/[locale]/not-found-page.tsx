import GoBackBtn from '@/components/common/go-back.btn'
import { Button } from '@/components/ui/button'
import { OurIcon, type OurIconName } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export default function NotFoundPage() {
  const locale = useLocale() as LocaleType

  const t = useTranslations('NotFoundPage')
  const t2 = useTranslations('Footer')

  const social = t2.raw('social') as {
    link: string
    icon: OurIconName
  }[]

  return (
    <div className="flex justify-center px-5 pt-16 pb-24">
      <div className="flex w-full flex-col items-center gap-6 sm:w-2/3 lg:w-2/5 xl:w-1/3 2xl:w-1/2">
        <div className="">
          <h1 className='bg-[url("/images/floor-img-16.webp")] bg-cover bg-clip-text bg-center text-[8rem] leading-none font-bold text-transparent sm:text-[10rem] md:text-[14rem] lg:text-[17rem]'>
            404
          </h1>
        </div>
        <h2 className="our-heading text-center">{t('title')}</h2>
        <p className="our-text text-center text-sm leading-5">
          {t('description')}
        </p>
        <div className="flex gap-2">
          <GoBackBtn
            variant={'outline'}
            className="our-btn border-our-purple cursor-pointer px-10! hover:bg-transparent"
          />
          <Button
            nativeButton={false}
            render={<Link href={`/${locale}${t('buttons.contactUs.link')}`} />}
            className="bg-our-purple our-btn hover:bg-our-purple px-10!"
          >
            {t('buttons.contactUs.label')}
          </Button>
        </div>
        <div className="our-text flex flex-col items-center gap-4">
          <p>{t('social.title')}</p>
          <div className="flex gap-10">
            {social.map((logo, i) => (
              <Link key={i} href={logo.link}>
                <OurIcon name={logo.icon} className="size-4 text-black" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
