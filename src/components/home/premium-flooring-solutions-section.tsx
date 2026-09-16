import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'

export default function PremiumFlooringSolutionsSection() {
  const t = useTranslations('FAQ')
  const pfs = t.raw('pfs') as {
    title: string
    paragraphs: string[]
    buttonLabel: string
  }

  return (
    <section
      className="bg-[#EFF9FE] py-16 lg:py-20 lg:ps-12 xl:ps-18"
      aria-label="Premium Flooring Solutions Across UAE & GCC"
    >
      <div className="container-wrapper lg:container-wrapper-none flex flex-col justify-start">
        <h2 className="section-title">{pfs.title}</h2>
        <div className="text-muted-foreground mt-12 flex flex-col gap-7 text-base leading-7">
          {pfs.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Button className="mt-12 w-fit bg-[#0066B3] px-12 py-4.5 text-white hover:bg-[#0066B3]/90">
          {pfs.buttonLabel}
        </Button>
      </div>
    </section>
  )
}
