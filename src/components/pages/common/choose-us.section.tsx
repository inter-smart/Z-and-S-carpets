import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import type { HomeData } from '@/types/home'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

interface FeatureType {
  title: string
  description: string
}

// Border/padding classes per grid cell. The first 6 cells keep the original design;
// with more than 6 features the classes are derived from the cell's row/column.
const SIX_FEATURE_CLASSES = [
  'border-b py-7 sm:border-e sm:pe-4',
  'border-b py-7 sm:px-4 md:border-e',
  'border-b py-7 sm:pe-4 sm:max-md:border-e md:ps-4',
  'border-b py-7 sm:px-4 md:border-e md:border-b-0 md:ps-0',
  'border-b py-7 sm:border-e sm:border-b-0 sm:pe-4 md:px-4',
  'py-7 sm:px-4',
]

function featureClasses(index: number, total: number) {
  if (total <= SIX_FEATURE_CLASSES.length) return SIX_FEATURE_CLASSES[index]

  const lastRowSm = index >= total - (total % 2 || 2)
  const lastRowMd = index >= total - (total % 3 || 3)
  const colMd = index % 3

  return cn(
    'border-b py-7',
    lastRowSm && 'sm:border-b-0',
    lastRowMd ? 'md:border-b-0' : lastRowSm && 'md:border-b',
    index % 2 === 0 ? 'sm:border-e sm:pe-4' : 'sm:px-4',
    colMd === 0 && 'md:border-e md:ps-0 md:pe-4',
    colMd === 1 && 'md:border-e md:px-4',
    colMd === 2 && 'md:border-e-0 md:ps-4',
  )
}

const FeatureCard = ({
  feature,
  className,
}: {
  feature: FeatureType
  className?: string
}) => (
  <div className={cn('flex items-start gap-3 border-gray-200', className)}>
    <div className="mt-0.5">
      <OurIcon name="badge-check" className="text-our-purple size-5" />
    </div>
    <div className="">
      <h4 className="text-2xl font-semibold">{feature.title}</h4>
      <p className="pt-2 text-lg text-gray-500">{feature.description}</p>
    </div>
  </div>
)

interface ChooseUsSectionProps {
  // When omitted (e.g. the About page) the translated content is used
  features?: HomeData['features_section']
  side?: HomeData['side_section']
}

export default function ChooseUsSection({
  features: featuresData,
  side,
}: ChooseUsSectionProps) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('Common.ChooseUsSection')
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  const features: FeatureType[] = featuresData
    ? featuresData.list.map((item) => ({
        title: pick(item.title, item.title_ar),
        description: pick(item.description, item.description_ar),
      }))
    : (t.raw('features') as FeatureType[])

  const title = featuresData
    ? pick(featuresData.title, featuresData.title_ar)
    : t('title')

  // `side` given but empty/hidden on the API -> no CTA column; omitted -> translated CTA
  const showCta = !side || side.is_visible

  const ctaTitleParts = t.raw('cta.title') as string[]
  const cta = side
    ? {
        title: <>{pick(side.title, side.title_ar)}</>,
        description: pick(side.description, side.description_ar),
        btnLabel: pick(side.button.text, side.button.text_ar),
        // relative links get the locale prefix, external ones are kept as is
        href: side.button.link.startsWith('/')
          ? `/${locale}${side.button.link}`
          : side.button.link,
      }
    : {
        title: (
          <>
            {ctaTitleParts[0]} <br /> {ctaTitleParts[1]}
          </>
        ),
        description: t('cta.description'),
        btnLabel: t('cta.btnLabel'),
        href: null,
      }

  return (
    <section className="container-wrapper py-16 lg:py-24">
      {/* title */}
      <div className="mx-auto">
        <h2 className="our-heading text-center">{title}</h2>
      </div>
      {/* our features */}
      <div className="mt-12 flex flex-col lg:flex-row">
        {/* Features */}
        <div className={showCta ? 'lg:w-3/4' : 'lg:w-full'}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
                className={featureClasses(index, features.length)}
              />
            ))}
          </div>
        </div>
        {/* CTA */}
        {showCta && (
          <div className="w-full lg:w-1/4 lg:border-s">
            <div className="flex h-full flex-col items-start gap-4 py-7 lg:gap-7 lg:ps-6">
              <h2 className="ltr:font-nobile rtl:font-cairo text-6xl font-medium">
                {cta.title}
              </h2>
              <p className="mt-0 text-lg text-gray-500">{cta.description}</p>
              <Button
                type="button"
                className="bg-our-blue our-btn mt-4 px-3.5!"
                {...(cta.href
                  ? { nativeButton: false, render: <Link href={cta.href} /> }
                  : {})}
              >
                {cta.btnLabel}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
