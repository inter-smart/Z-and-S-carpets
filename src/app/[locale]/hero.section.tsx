import { MoveLeftIcon, MoveRightIcon } from '@/assets/icons'
import { FloorImg4 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { font } from '@/lib/utils'
import { cn } from 'cn'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { Fragment } from 'react/jsx-runtime'

import type { LocaleType } from '@/i18n/types'

const items = ['Residential', 'Commercial', 'Hospitality', 'Outdoor']

export default function HeroSection() {
  const locale = useLocale() as LocaleType

  return (
    <section>
      <div className="relative">
        <video
          className="w-full h-screen object-cover"
          // poster={hero_poster.src}
          playsInline
          autoPlay
          muted
          loop
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute top-0 w-full h-screen bg-linear-to-r from-black/80 to-black/0 text-white flex flex-col justify-end">
          {/* side options */}
          <div
            className={cn(
              'absolute top-0 h-full w-10 sm:w-20 flex flex-col justify-center items-center pt-40',
              locale === 'ar' ? 'right-0' : 'left-0',
            )}
          >
            <div
              className={cn(
                'flex flex-row items-center  gap-5',
                locale === 'ar' ? 'rotate-90' : '-rotate-90',
              )}
            >
              {items.map((label, i) => (
                <Fragment key={label}>
                  <p className="text-md font-light underline decoration-0 underline-offset-5 cursor-default">
                    {label}
                  </p>
                  {i < items.length - 1 && (
                    <div className="w-[0.1px] h-4.5 bg-white/20"></div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
          {/* hero text */}
          <div className="w-full h-1/2 flex flex-row px-14 sm:px-30 pb-20">
            <div className="flex flex-col justify-end gap-6 w-full lg:w-1/2">
              <h2
                className={cn(
                  font(locale as LocaleType, {
                    en: 'font-nobile',
                    ar: 'font-cairo',
                  }),
                  'text-4xl font-semibold',
                )}
              >
                Trusted Flooring Specialists in UAE & GCC
              </h2>
              <h3 className="text-xl">
                For Homes, Offices & Commercial Spaces
              </h3>
              <Button
                variant="outline"
                className={cn(
                  font(locale as LocaleType, {
                    en: 'font-manrope',
                    ar: 'font-cairo',
                  }),
                  'w-fit rounded-sm px-8 py-4.5 mt-6 hover:bg-white/10 hover:text-white',
                )}
              >
                Request Quote
              </Button>
            </div>
            <div className="w-1/2 hidden lg:flex justify-end items-end">
              <div className="w-96 h-35 bg-white text-black rounded-md flex flex-row justify-between gap-8 p-3">
                <div className="w-2/5 relative rounded-md overflow-hidden flex justify-center items-center">
                  <Image
                    src={FloorImg4}
                    alt="floor-image"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="w-3/5 flex flex-col">
                  <div className="flex flex-row justify-end">
                    <div className="p-1.5 border border-gray-200 rounded-l-sm cursor-pointer">
                      <Image
                        src={MoveLeftIcon}
                        alt="move-arrow-icon"
                        className="w-auto h-1.75"
                      />
                    </div>
                    <div className="p-1.5 border-y border-r border-gray-200 rounded-r-sm cursor-pointer">
                      <Image
                        src={MoveRightIcon}
                        alt="move-arrow-icon"
                        className="w-auto h-1.75"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-4xl">15k+</p>
                    <p className="font-semibold text-sm">Projects Completed</p>
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
