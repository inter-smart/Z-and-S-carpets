import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function IntroSection() {
  const t = useTranslations('ServicesPage.IntroSection')

  const paragraphs = t.raw('paragraphs') as string[]
  const categories = t.raw('categories') as { id: string; label: string }[]

  return (
    <section className="bg-[#EFF9FE]">
      <div className="container-wrapper grid gap-10 py-15 lg:grid-cols-[0.80fr_1.20fr] lg:gap-20 xl:gap-24">
        <h1 className="our-heading">{t('title')}</h1>
        <div className="text-[12px] leading-[1.55] text-[#252525] sm:text-[13px]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="our-text mb-5 text-sm leading-6">
              {paragraph}
            </p>
          ))}
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/work?type=${category.id}`}
                className="our-text pb-1 font-normal underline decoration-1 underline-offset-4 hover:text-[#037EDA]"
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
