import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import type { AboutData } from '@/types/about'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

interface IntroSectionProps {
  data: AboutData['introduction_section']
}

export default function IntroSection({ data }: IntroSectionProps) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('AboutPage.IntroSection')
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  const stats = data.stats.map((item) => ({
    id: item.id,
    value: pick(item.value, item.value_ar),
    label: pick(item.label, item.label_ar),
  }))

  // relative links get the locale prefix, external ones are kept as is
  const trustButton = data.trust_button
    ? {
        label: pick(data.trust_button.text, data.trust_button.text_ar),
        href: data.trust_button.link.startsWith('/')
          ? `/${locale}${data.trust_button.link}`
          : data.trust_button.link,
      }
    : null

  return (
    <section className="container-wrapper flex flex-col gap-10 pt-8 pb-12 lg:gap-18 lg:pt-16 lg:pb-20">
      <section
        className="grid items-start gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-15"
        aria-labelledby="about-title"
      >
        <div className="relative h-50 w-full overflow-hidden rounded-md sm:h-75 md:h-100 lg:h-full">
          {data.media.path && (
            <Image
              src={data.media.path}
              alt={
                pick(data.media.alt, data.media.alt_ar) ||
                pick(data.title, data.title_ar)
              }
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col justify-start gap-4">
          <p className="ltr:font-nobile rtl:font-cairo text-our-purple flex gap-2.5 text-lg font-medium">
            &#9632;
            <span>{t('intro.eyebrow')}</span>
          </p>
          <h1 id="about-title" className="our-heading text-7xl!">
            {pick(data.title, data.title_ar)}
          </h1>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: pick(data.description, data.description_ar),
            }}
          />
        </div>
      </section>

      <div className="spaced-dotted" />

      <section
        className="grid gap-20 lg:grid-cols-[1.25fr_1fr] xl:grid-cols-[1.75fr_1fr]"
        aria-labelledby="quality-title"
      >
        <div className="flex h-full flex-col justify-start gap-4">
          <h2 id="quality-title" className="our-heading text-7xl!">
            {pick(data.trust_title, data.trust_title_ar)}
          </h2>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: pick(data.trust_description, data.trust_description_ar),
            }}
          />
          <div className="mt-4 flex flex-col gap-2 min-[450px]:flex-row">
            <Button
              variant={'outline'}
              className="our-btn border-black"
              {...(trustButton
                ? { nativeButton: false, render: <Link href={trustButton.href} /> }
                : {})}
            >
              {trustButton ? trustButton.label : t('actions.contact')}
            </Button>
            <Button className="bg-our-purple our-btn">
              {t('actions.quote')}
            </Button>
          </div>
        </div>
        <aside className="grid h-fit grid-cols-2 overflow-hidden rounded-md bg-[#023260] text-white shadow-sm 2xl:h-full">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="flex items-center border-r border-b border-white/15 p-6 last:border-b-0 nth-[2n]:border-r-0 nth-last-[-n+2]:border-b-0 min-[400px]:p-9"
            >
              <div className="">
                <p className="text-5xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-xl">{stat.label}</p>
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
        <article className="border-our-blue bg-our-blue/10 rounded-md border p-10">
          <h2 className="our-heading text-7xl!">
            {pick(data.mission.title, data.mission.title_ar)}
          </h2>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: pick(
                data.mission.description,
                data.mission.description_ar,
              ),
            }}
          />
        </article>
        <article className="border-our-purple bg-our-purple/10 rounded-md border p-10">
          <h2 className="our-heading text-7xl!">
            {pick(data.vision.title, data.vision.title_ar)}
          </h2>
          <div
            className="text-lg"
            dangerouslySetInnerHTML={{
              __html: pick(data.vision.description, data.vision.description_ar),
            }}
          />
        </article>
      </section>
    </section>
  )
}
