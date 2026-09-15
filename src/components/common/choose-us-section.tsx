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
      <div className="flex flex-col lg:flex-row mt-8">
        {/* Features */}
        <div className="lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {/* 1 */}
            <div className="py-7 sm:pe-7 border-b border-gray-200 ltr:sm:border-r rtl:sm:border-l flex items-start gap-5">
              <Image
                src={BadgeCheckIcon}
                alt="badge check icon"
                className="w-auto h-5.5 mt-1.5"
              />
              <div className="">
                <h4 className="text-lg font-medium">{features[0].title}</h4>
                <p className="text-sm text-gray-500">
                  {features[0].description}
                </p>
              </div>
            </div>
            {/* 2 */}
            <div className="py-7 sm:px-7 border-b border-gray-200 ltr:md:border-r rtl:md:border-l flex items-start gap-5">
              <Image
                src={BadgeCheckIcon}
                alt="badge check icon"
                className="w-auto h-5.5 mt-1.5"
              />
              <div className="">
                <h4 className="text-lg font-medium">{features[1].title}</h4>
                <p className="text-sm text-gray-500">
                  {features[1].description}
                </p>
              </div>
            </div>
            {/* 3 */}
            <div className="py-7 sm:pe-7 md:ps-7 border-b border-gray-200 ltr:sm:max-md:border-r rtl:sm:max-md:border-l flex items-start gap-5">
              <Image
                src={BadgeCheckIcon}
                alt="badge check icon"
                className="w-auto h-5.5 mt-1.5"
              />
              <div className="">
                <h4 className="text-lg font-medium">{features[2].title}</h4>
                <p className="text-sm text-gray-500">
                  {features[2].description}
                </p>
              </div>
            </div>
            {/* 4 */}
            <div className="py-7 sm:px-7 md:ps-0 border-b border-gray-200 ltr:md:border-r rtl:md:border-l md:border-b-0 flex items-start gap-5">
              <Image
                src={BadgeCheckIcon}
                alt="badge check icon"
                className="w-auto h-5.5 mt-1.5"
              />
              <div className="">
                <h4 className="text-lg font-medium">{features[3].title}</h4>
                <p className="text-sm text-gray-500">
                  {features[3].description}
                </p>
              </div>
            </div>
            {/* 5 */}
            <div className="py-7 sm:pe-7 md:px-7 border-b border-gray-200 ltr:sm:border-r rtl:sm:border-l sm:border-b-0 flex items-start gap-5">
              <Image
                src={BadgeCheckIcon}
                alt="badge check icon"
                className="w-auto h-5.5 mt-1.5"
              />
              <div className="">
                <h4 className="text-lg font-medium">{features[4].title}</h4>
                <p className="text-sm text-gray-500">
                  {features[4].description}
                </p>
              </div>
            </div>
            {/* 6 */}
            <div className="py-7 sm:px-7 flex items-start gap-5">
              <Image
                src={BadgeCheckIcon}
                alt="badge check icon"
                className="w-auto h-5.5 mt-1.5"
              />
              <div className="">
                <h4 className="text-lg font-medium">{features[5].title}</h4>
                <p className="text-sm text-gray-500">
                  {features[5].description}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* CTA */}
        <div className="w-full lg:w-1/4 ltr:lg:border-l rtl:lg:border-r">
          <div className="py-7 ltr:lg:pl-7 rtl:lg:pr-7">
            <h2 className="text-3xl font-medium ltr:font-nobile rtl:font-cairo">
              {ctaTitle[0]} <br /> {ctaTitle[1]}
            </h2>
            <p className="mt-2 text-sm text-gray-500">{t('cta.description')}</p>
            <button
              type="button"
              className="mt-6 rounded-sm bg-[#0066B3] px-5 py-2.5 text-xs font-medium text-white"
            >
              {t('cta.btnLabel')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
