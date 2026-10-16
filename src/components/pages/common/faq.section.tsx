'use client'

import type { LocaleType } from '@/i18n/types'
import type { HomeData } from '@/types/home'
import { cn } from 'cn'
import { Minus, Plus } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

export default function FAQSection({
  className,
  container = true,
  data,
}: {
  className?: string
  container?: boolean
  // When omitted (product pages) the translated FAQs are used
  data?: HomeData['faqs_section']
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('Common.FAQSection')
  const pick = (en?: string, ar?: string) =>
    locale === 'ar' ? ar || en || '' : en || ''

  const faqs = data
    ? data.list.map((item) => ({
        question: pick(item.question, item.question_ar),
        answer: pick(item.answer, item.answer_ar),
      }))
    : (t.raw('faqs') as { question: string; answer: string }[])
  const sectionTitle = data ? pick(data.title, data.title_ar) : t('title')

  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      className={cn('py-16 lg:py-20', className)}
      aria-label="Frequently asked questions"
    >
      <div
        className={cn(
          container && 'container-wrapper',
          'flex flex-col sm:pe-8 lg:pe-12 xl:pe-18',
        )}
      >
        <h2 className="our-heading">{sectionTitle}</h2>

        <div className="mt-12">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div key={faq.question} className="border-border border-b">
                <button
                  type="button"
                  className="text-foreground hover:text-primary focus-visible:ring-ring flex w-full items-start justify-between gap-6 py-5 text-lg font-medium transition-colors focus:ring-0 focus:outline-none ltr:text-left rtl:text-right"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <Minus
                      aria-hidden="true"
                      className="text-our-purple size-4 shrink-0"
                    />
                  ) : (
                    <Plus
                      aria-hidden="true"
                      className="text-our-purple size-4 shrink-0"
                    />
                  )}
                </button>
                <div
                  id={`faq-answer-${index}`}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="pe-8 pb-5 text-base text-[#797979]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
