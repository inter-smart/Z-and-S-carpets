'use client'

import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import type { HomeData } from '@/types/home'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

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
  const description = pick(premium.description, premium.description_ar)

  const contentRef = useRef<HTMLDivElement>(null)
  const [expanded, setExpanded] = useState(false)
  const [overflowing, setOverflowing] = useState(false)

  // Only measure while collapsed (clamped); once expanded the button must stay
  // so the user can collapse again. ResizeObserver re-checks on rotate/resize.
  useEffect(() => {
    const el = contentRef.current
    if (!el || expanded) return
    const check = () => setOverflowing(el.scrollHeight > el.clientHeight + 1)
    check()
    const observer = new ResizeObserver(check)
    observer.observe(el)
    return () => observer.disconnect()
  }, [description, expanded])

  return (
    <section
      className="bg-[#EFF9FE] py-16 lg:py-20 lg:ps-12 xl:ps-18"
      aria-label="Premium Flooring Solutions Across UAE & GCC"
    >
      <div className="container-wrapper lg:container-wrapper-none flex flex-col justify-start">
        <h2 className="our-heading">{pick(premium.title, premium.title_ar)}</h2>
        <div className="relative mt-12">
          {/* sanitized rich text from the API: its <p> children are the flex items.
              Collapsed: clamped height (shorter on mobile). Expanded: capped height
              with an inner scroll so the section never grows unbounded. */}
          <div
            ref={contentRef}
            id="premium-solutions-content"
            tabIndex={expanded ? 0 : -1}
            className={`flex flex-col gap-7 text-base text-[#6F6F6F] sm:text-lg ${
              expanded
                ? 'max-h-[60vh] overflow-y-auto pe-3 [scrollbar-width:thin] lg:max-h-[28rem]'
                : 'max-h-60 overflow-hidden lg:max-h-72'
            }`}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          {overflowing && !expanded && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#EFF9FE] to-transparent"
            />
          )}
        </div>
        {(overflowing || expanded) && (
          <Button
            type="button"
            aria-expanded={expanded}
            aria-controls="premium-solutions-content"
            onClick={() => setExpanded((v) => !v)}
            className="bg-our-blue our-btn mt-8 w-fit lg:mt-12"
          >
            {expanded ? t('buttonLessLabel') : t('buttonLabel')}
          </Button>
        )}
      </div>
    </section>
  )
}
