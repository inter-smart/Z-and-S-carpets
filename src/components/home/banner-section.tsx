import { MoveLeftIcon, MoveRightIcon } from '@/assets/icons'
import { FloorImg4 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function BannerSection() {
  const t = useTranslations('BannerSection')
  const sideMenuItems = t.raw('sideMenu') as string[]

  return (
    <section className="relative">
      {/* video */}
      <video
        className="w-full h-200 object-cover"
        playsInline
        autoPlay
        muted
        loop
      >
        <source src="/videos/banner-1.mp4" type="video/mp4" />
      </video>
      {/* top layer (above video) */}
      <div className="absolute top-0 w-full h-200 bg-linear-to-r from-black/80 to-black/0 text-white flex flex-col justify-end">
        {/* category */}
        <div className="absolute h-full -ms-5 sm:-ms-1 w-20 flex flex-col justify-end pb-30 sm:pb-35">
          <div className="flex flex-row items-center ltr:-rotate-90 rtl:rotate-90">
            {sideMenuItems.map((label, i) => (
              <div key={i} className="flex items-center">
                <p
                  className={cn(
                    'text-[1rem] font-light whitespace-nowrap underline decoration-0 underline-offset-4 cursor-default',
                  )}
                >
                  {label}
                </p>
                {i < sideMenuItems.length - 1 && (
                  <div className="w-[0.1px] h-4.5 bg-white/20 mx-[1.6rem]" />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* heading & slider */}
        <div className="container-wrapper">
          <div className="ps-8 sm:ps-10 sm:pe-5 w-full h-full flex flex-col md:flex-row justify-end md:justify-between gap-6 pb-23 sm:pb-28">
            {/* heading */}
            <div className="w-full md:w-1/2 lg:3/5 flex flex-col justify-end gap-1 md:gap-6">
              <h1 className="text-4xl sm:text-[2.75rem] leading-12 sm:leading-14 font-medium ltr:font-nobile rtl:font-cairo">
                {t('mainTag')}
              </h1>
              <h2 className="text-xl">{t('description')}</h2>
              <Button
                variant="outline"
                className="w-fit rounded-sm px-8 py-4.5 mt-6 ltr:font-manrope rtl:font-cairo hover:bg-white/10 hover:text-white"
              >
                {t('btnLabel')}
              </Button>
            </div>
            {/* slider */}
            <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col md:flex-row justify-end items-start md:items-end">
              <div className="w-fit h-22 sm:h-24 md:h-30 lg:h-36 lg:w-100 p-3 bg-white text-black rounded-md flex flex-row justify-between gap-2 sm:gap-4 md:gap-2 lg:gap-6 xl:gap-8">
                <div className="hidden min-[360px]:flex h-full aspect-square relative rounded-md overflow-hidden justify-center items-center">
                  <Image
                    src={FloorImg4}
                    alt="floor-image"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex flex-row justify-end">
                    <div className="p-1.5 border border-gray-200 ltr:rounded-l-sm rtl:rounded-r-sm cursor-pointer">
                      <Image
                        src={MoveRightIcon}
                        alt="move-arrow-icon"
                        className="hidden rtl:block w-auto h-1 sm:h-1.75"
                      />
                      <Image
                        src={MoveLeftIcon}
                        alt="move-arrow-icon"
                        className="hidden ltr:block w-auto h-1 sm:h-1.75"
                      />
                    </div>
                    <div className="p-1.5 border-y border-gray-200 ltr:border-r ltr:rounded-r-sm rtl:border-l rtl:rounded-l-sm cursor-pointer">
                      <Image
                        src={MoveLeftIcon}
                        alt="move-arrow-icon"
                        className="hidden rtl:block w-auto h-1 sm:h-1.75"
                      />
                      <Image
                        src={MoveRightIcon}
                        alt="move-arrow-icon"
                        className="hidden ltr:block w-auto h-1 sm:h-1.75"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-1 md:justify-start md:gap-2">
                    <p className="font-bold text-xl sm:text-2xl md:text-4xl">
                      {t('card.itemValue')}
                    </p>
                    <p className="font-semibold text-sm">
                      {t('card.itemText')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
