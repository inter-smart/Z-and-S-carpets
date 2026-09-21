import BreadcrumbBar from '@/components/common/breadcrumb-bar'
import { OurIcon } from '@/components/ui/icon'
import type { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Z&S Carpets',
  description:
    'Read the Z&S Carpets privacy policy and terms for handling information.',
}

export default function PrivacyPolicyPage() {
  const t = useTranslations('PrivacyPolicyPage')
  const sections = t.raw('sections') as {
    title: string
    paragraphs: string[]
    bullets: string[]
  }[]

  return (
    <>
      <BreadcrumbBar
        values={[{ name: 'Privacy Policy', link: '/privacy-policy' }]}
      />
      <article className="container-wrapper pt-5 pb-10 lg:pt-5 lg:pb-20">
        <h1 className="our-heading">{t('title')}</h1>
        <p className="our-text mt-3">{t('intro')}</p>
        <div className="mt-8 space-y-4">
          {sections.map((section, sectionIndex) => (
            <section
              key={sectionIndex}
              aria-labelledby={section.title.toLowerCase().replaceAll(' ', '-')}
            >
              <h2
                id={section.title.toLowerCase().replaceAll(' ', '-')}
                className="our-heading text-xl"
              >
                {section.title}
              </h2>
              {section.paragraphs.map((_, paragraphIndex) => (
                <p key={paragraphIndex} className="our-text">
                  {t.rich(
                    `sections.${sectionIndex}.paragraphs.${paragraphIndex}`,
                    {
                      privacy: (chunks) => (
                        <Link
                          href="https://masscareagency.co.uk/privacy-policy"
                          className="text-our-blue underline hover:no-underline"
                        >
                          {chunks}
                        </Link>
                      ),
                      // terms: (chunks) => (
                      //   <Link
                      //     href="/terms-and-conditions"
                      //     className="text-our-blue underline hover:no-underline"
                      //   >
                      //     {chunks}
                      //   </Link>
                      // ),
                      // contact: (chunks) => (
                      //   <Link
                      //     href="/contact"
                      //     className="text-our-blue underline hover:no-underline"
                      //   >
                      //     {chunks}
                      //   </Link>
                      // ),
                    },
                  )}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-4 space-y-2">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="our-text flex items-start gap-2"
                    >
                      <div className="pt-1.5">
                        <OurIcon
                          name="square-check"
                          className="text-our-blue size-3.5"
                        />
                      </div>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>
    </>
  )
}
