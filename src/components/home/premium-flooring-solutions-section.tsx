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
      className="flex flex-col justify-start px-6 py-16 sm:px-10 lg:px-[5.2vw] lg:py-20 bg-[#EFF9FE]"
      aria-label="Premium Flooring Solutions Across UAE & GCC"
    >
      <h2 className="text-4xl font-medium ltr:font-nobile rtl:font-cairo leading-[1.1] tracking-[-0.04em] text-foreground sm:text-5xl">
        {pfs.title}
      </h2>
      <div className="mt-12 flex flex-col gap-7 text-base leading-7 text-muted-foreground">
        {pfs.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <Button className="w-fit mt-12 bg-[#0066B3] px-12 py-4.5 text-white hover:bg-[#0066B3]/90">
        {pfs.buttonLabel}
      </Button>
    </section>
  )
}
