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
        <h2 className="section-title">{t('title')}</h2>
        <div className="text-muted-foreground mt-12 flex flex-col gap-7 text-base leading-7">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Button className="mt-12 w-fit bg-[#0066B3] px-12 py-4.5 text-xs font-semibold text-white hover:bg-[#0066B3]/90">
          {t('buttonLabel')}
        </Button>
      </div>
    </section>
  )
}
