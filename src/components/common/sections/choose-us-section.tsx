import { BadgeCheckIcon } from '@/assets/icons'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function ChooseUsSection() {
  const t = useTranslations('ChooseUs')
  const ctaTitle = t.raw('cta.title') as string[]
  const features = t.raw('features') as {
    title: string
    description: string
  }[]

  return (
    <section className="container-wrapper py-16 lg:py-24">
      {/* title */}
      <div className="mx-auto">
        <h2 className="section-title text-center">{t('title')}</h2>
      </div>
      {/* our features */}
      <div className="mt-12 flex flex-col lg:flex-row">
        {/* Features */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {/* 1 */}
            <div className="flex items-start gap-5 border-b border-gray-200 py-7 sm:pe-7 ltr:sm:border-r rtl:sm:border-l">
              <Image
                src={BadgeCheckIcon}
                alt="badge check icon"
                className="mt-1.5 h-5.5 w-auto"
              />
              <div className="">
                <h4 className="text-[1.2rem] font-semibold">
                  {features[0].title}
                </h4>
                <p className="pt-2 text-gray-500">{features[0].description}</p>
              </div>
            </div>
            {/* 2 */}
            <div className="flex items-start gap-5 border-b border-gray-200 py-7 sm:px-7 ltr:md:border-r rtl:md:border-l">
              <Image
                src={BadgeCheckIcon}
                alt="badge check icon"
                className="mt-1.5 h-5.5 w-auto"
              />
              <div className="">
                <h4 className="text-[1.2rem] font-semibold">
                  {features[1].title}
                </h4>
                <p className="pt-2 text-gray-500">{features[1].description}</p>
              </div>
            </div>
            {/* 3 */}
            <div className="flex items-start gap-5 border-b border-gray-200 py-7 sm:pe-7 md:ps-7 ltr:sm:max-md:border-r rtl:sm:max-md:border-l">
              <Image
                src={BadgeCheckIcon}
                alt="badge check icon"
                className="mt-1.5 h-5.5 w-auto"
              />
              <div className="">
                <h4 className="text-[1.2rem] font-semibold">
                  {features[2].title}
                </h4>
                <p className="pt-2 text-gray-500">{features[2].description}</p>
              </div>
            </div>
            {/* 4 */}
            <div className="flex items-start gap-5 border-b border-gray-200 py-7 sm:px-7 md:border-b-0 md:ps-0 ltr:md:border-r rtl:md:border-l">
              <Image
                src={BadgeCheckIcon}
                alt="badge check icon"
                className="mt-1.5 h-5.5 w-auto"
              />
              <div className="">
                <h4 className="text-[1.2rem] font-semibold">
                  {features[3].title}
                </h4>
                <p className="pt-2 text-gray-500">{features[3].description}</p>
              </div>
            </div>
            {/* 5 */}
            <div className="flex items-start gap-5 border-b border-gray-200 py-7 sm:border-b-0 sm:pe-7 md:px-7 ltr:sm:border-r rtl:sm:border-l">
              <Image
                src={BadgeCheckIcon}
                alt="badge check icon"
                className="mt-1.5 h-5.5 w-auto"
              />
              <div className="">
                <h4 className="text-[1.2rem] font-semibold">
                  {features[4].title}
                </h4>
                <p className="pt-2 text-gray-500">{features[4].description}</p>
              </div>
            </div>
            {/* 6 */}
            <div className="flex items-start gap-5 py-7 sm:px-7">
              <Image
                src={BadgeCheckIcon}
                alt="badge check icon"
                className="mt-1.5 h-5.5 w-auto"
              />
              <div className="">
                <h4 className="text-[1.2rem] font-semibold">
                  {features[5].title}
                </h4>
                <p className="pt-2 text-gray-500">{features[5].description}</p>
              </div>
            </div>
          </div>
        </div>
        {/* CTA */}
        <div className="w-full lg:w-1/4 ltr:lg:border-l rtl:lg:border-r">
          <div className="flex h-full flex-col items-start gap-4 py-7 lg:gap-7 lg:ps-7">
            <h2 className="ltr:font-nobile rtl:font-cairo text-3xl font-medium">
              {ctaTitle[0]} <br /> {ctaTitle[1]}
            </h2>
            <p className="mt-0 text-gray-500">{t('cta.description')}</p>
            <button
              type="button"
              className="mt-4 rounded-sm bg-[#0066B3] px-5 py-3 text-xs font-semibold text-white"
            >
              {t('cta.btnLabel')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
