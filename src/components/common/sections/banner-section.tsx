import { useTranslations } from 'next-intl'

export default function BannerSection({ pageName }: { pageName: string }) {
  const t = useTranslations(`${pageName}.BannerSection`)

  return (
    <div
      className="relative h-56 w-full text-white lg:h-64 xl:h-86"
      style={{
        backgroundImage: `url(${t('image')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute top-0 h-full w-full from-black/80 to-black/0 ltr:bg-linear-to-r rtl:bg-linear-to-l">
        <div className="container-wrapper flex h-full items-end justify-start pb-8 lg:pb-16">
          <div>
            <h1 className="our-heading">{t('title')}</h1>
            <h1 className="our-text leading-5!">{t('description')}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
