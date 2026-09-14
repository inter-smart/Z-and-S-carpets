import { MoveLeftIcon, MoveRightIcon } from '@/assets/icons'
import { FloorImg4 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Fragment } from 'react/jsx-runtime'

export default function HeroSection() {
  const t = useTranslations('HeroSection')
  const sideMenuItems = t.raw('sideMenu') as string[]

  return (
    <section>
      <div className="relative">
        <video
          className="w-full h-screen object-cover"
          playsInline
          autoPlay
          muted
          loop
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 w-full h-screen bg-linear-to-r from-black/80 to-black/0 text-white flex flex-col justify-end">
          {/* side options */}
          <div className="absolute top-0 h-full w-10 sm:w-20 flex flex-col justify-center items-center pt-40">
            <div className="flex flex-row items-center gap-5 ltr:-rotate-90 rtl:rotate-90">
              {sideMenuItems.map((label, i) => (
                <Fragment key={label}>
                  <p className="text-md font-light whitespace-nowrap underline decoration-0 underline-offset-5 cursor-default">
                    {label}
                  </p>
                  {i < sideMenuItems.length - 1 && (
                    <div className="w-[0.1px] h-4.5 bg-white/20"></div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
          {/* hero text */}
          <div className="container-wrapper px-14! sm:px-20! xl:px-30! w-full h-full flex flex-col md:flex-row justify-end md:justify-between gap-2 pb-10 md:pb-15">
            <div className="w-full md:w-1/2 lg:2/3 flex flex-col justify-end gap-1 md:gap-6">
              <h1 className="text-4xl leading-11 font-medium ltr:font-nobile rtl:font-cairo">
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
            <div className="w-full md:w-1/2 lg:w-1/3 flex flex-col md:flex-row justify-end items-start md:items-end">
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
