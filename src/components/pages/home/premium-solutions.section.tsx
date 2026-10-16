import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import type { HomeData } from '@/types/home'
import { useLocale, useTranslations } from 'next-intl'

interface PremiumSolutionsSectionProps {
  premium: HomeData['premium_section']
}

export default function PremiumSolutionsSection({
  premium,
}: PremiumSolutionsSectionProps) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('HomePage.PremiumSolutionsSection')
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  return (
    <section
      className="bg-[#EFF9FE] py-16 lg:py-20 lg:ps-12 xl:ps-18"
      aria-label="Premium Flooring Solutions Across UAE & GCC"
    >
      <div className="container-wrapper lg:container-wrapper-none flex flex-col justify-start">
        <h2 className="our-heading">{pick(premium.title, premium.title_ar)}</h2>
        {/* sanitized rich text from the API: its <p> children are the flex items */}
        <div
          className="mt-12 flex flex-col gap-7 text-lg text-[#6F6F6F]"
          dangerouslySetInnerHTML={{
            __html: pick(premium.description, premium.description_ar),
          }}
        />
        <Button className="bg-our-blue our-btn mt-12 w-fit">
          {t('buttonLabel')}
        </Button>
      </div>
    </section>
  )
}
