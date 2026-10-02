import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function PremiumSolutionsSection() {
  const t = useTranslations('HomePage.PremiumSolutionsSection')
  const paragraphs = t.raw('paragraphs') as string[]

  return (
    <section
      className="bg-[#EFF9FE] py-16 lg:py-20 lg:ps-12 xl:ps-18"
      aria-label="Premium Flooring Solutions Across UAE & GCC"
    >
      <div className="container-wrapper lg:container-wrapper-none flex flex-col justify-start">
        <h2 className="our-heading">{t('title')}</h2>
        <div className="mt-12 flex flex-col gap-7 text-lg text-[#6F6F6F]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Button className="bg-our-blue our-btn mt-12 w-fit">
          {t('buttonLabel')}
        </Button>
      </div>
    </section>
  )
}
