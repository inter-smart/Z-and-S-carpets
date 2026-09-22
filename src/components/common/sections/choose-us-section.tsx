import { OurIcon } from '@/components/ui/icon'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'

interface FeatureType {
  title: string
  description: string
}

const FeatureCard = ({
  feature,
  className,
}: {
  feature: FeatureType
  className?: string
}) => (
  <div className={cn('flex items-start gap-5 border-gray-200', className)}>
    <div className="mt-0.5">
      <OurIcon name="badge-check" className="text-our-purple size-6" />
    </div>
    <div className="">
      <h4 className="text-[1.2rem] font-semibold">{feature.title}</h4>
      <p className="pt-2 text-gray-500">{feature.description}</p>
    </div>
  </div>
)

export default function ChooseUsSection() {
  const t = useTranslations('Common.ChooseUsSection')
  const ctaTitle = t.raw('cta.title') as string[]
  const features = t.raw('features') as FeatureType[]

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
            <FeatureCard
              feature={features[0]}
              className="border-b py-7 sm:pe-6 ltr:sm:border-r rtl:sm:border-l"
            />
            <FeatureCard
              feature={features[1]}
              className="border-b py-7 sm:px-6 ltr:md:border-r rtl:md:border-l"
            />
            <FeatureCard
              feature={features[2]}
              className="border-b py-7 sm:pe-6 md:ps-6 ltr:sm:max-md:border-r rtl:sm:max-md:border-l"
            />
            <FeatureCard
              feature={features[3]}
              className="border-b py-7 sm:px-6 md:border-b-0 md:ps-0 ltr:md:border-r rtl:md:border-l"
            />
            <FeatureCard
              feature={features[4]}
              className="border-b py-7 sm:border-b-0 sm:pe-6 md:px-6 ltr:sm:border-r rtl:sm:border-l"
            />
            <FeatureCard feature={features[5]} className="py-7 sm:px-6" />
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
