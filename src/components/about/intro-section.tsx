import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

function SimpleIcon({ type }: { type: string }) {
  return (
    <span
      aria-hidden="true"
      className="text-[21px] leading-none text-[#9b41b5]"
    >
      {type === 'Quality'
        ? '◎'
        : type === 'Customer focus'
          ? '♧'
          : type === 'Innovation'
            ? '♧'
            : type === 'Residential'
              ? '▥'
              : type === 'Commercial'
                ? '▤'
                : '▦'}
    </span>
  )
}

export default function IntroSection() {
  const t = useTranslations('AboutPage.IntroSection')
  const stats = t.raw('stats') as {
    value: string
    label: string
  }[]

  return (
    <section className="container-wrapper flex flex-col gap-10 pt-8 pb-12 lg:gap-18 lg:pt-16 lg:pb-20">
      <section
        className="grid items-start gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-15"
        aria-labelledby="about-title"
      >
        <div className="relative h-50 w-full overflow-hidden rounded-md sm:h-75 md:h-100 lg:h-full">
          <Image
            src={t('image')}
            alt="Contemporary flooring showroom with warm wood floors, seating, and indoor plants"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-start gap-4">
          <p className="ltr:font-nobile rtl:font-cairo flex gap-2.5 font-medium text-[#812990]">
            &#9632;
            <span>{t('intro.eyebrow')}</span>
          </p>
          <h1 id="about-title" className="our-heading">
            {t('intro.title')}
          </h1>
          <p className="our-text">{t('intro.body')}</p>
        </div>
      </section>

      <hr className="w-full border-t border-dashed border-[#812990]" />

      <section
        className="grid gap-20 lg:grid-cols-[1.25fr_1fr] xl:grid-cols-[1.75fr_1fr]"
        aria-labelledby="quality-title"
      >
        <div className="flex h-full flex-col justify-start gap-4">
          <h2 id="quality-title" className="our-heading text-3xl!">
            {t('quality.title')}
          </h2>
          <p className="our-text">{t('quality.body')}</p>
          <div className="mt-4 flex gap-2">
            <Button className="our-btn border-black bg-white text-black">
              {t('actions.contact')}
            </Button>
            <Button className="bg-our-purple our-btn">
              {t('actions.quote')}
            </Button>
          </div>
        </div>
        {/* <StatCard stats={stats} /> */}
        <aside className="grid h-fit grid-cols-2 overflow-hidden rounded-md bg-[#023260] text-white shadow-sm 2xl:h-full">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center border-r border-b border-white/15 p-6 last:border-b-0 nth-[2n]:border-r-0 nth-last-[-n+2]:border-b-0 min-[400px]:p-9"
            >
              <div className="">
                <p className="text-md font-semibold min-[400px]:text-xl sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm min-[400px]:text-base sm:text-lg">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </aside>
      </section>

      {/* Mission & Vision */}
      <section
        className="grid gap-4 lg:grid-cols-2"
        aria-label="Our mission and vision"
      >
        <article className="rounded-md border border-[#62a9dc] bg-[#e5f2fa] p-10">
          <h2 className="our-heading text-3xl!">{t('mission.title')}</h2>
          <p className="our-text">{t('mission.body')}</p>
        </article>
        <article className="rounded-md border border-[#c46bd0] bg-[#f6edf8] p-10">
          <h2 className="our-heading text-3xl!">{t('vision.title')}</h2>
          <p className="our-text">{t('vision.body')}</p>
        </article>
      </section>
    </section>
  )
}
