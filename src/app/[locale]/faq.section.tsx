'use client'

import type { LocaleType } from '@/i18n/types'

import { Button } from '@/components/ui/button'
import { font } from '@/lib/utils'
import { cn } from 'cn'
import { Minus, Plus } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

export default function FAQSection() {
  const locale = useLocale() as LocaleType

  const t = useTranslations('FAQ')
  const faqs = t.raw('faqs') as { question: string; answer: string }[]
  const pfs = t.raw('pfs') as {
    title: string
    paragraphs: string[]
    buttonLabel: string
  }

  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      className="grid grid-cols-1 lg:grid-cols-2"
      aria-label="Frequently asked questions and company information"
    >
      <div className="flex flex-col px-6 py-16 sm:px-10 lg:px-[5.6vw] lg:py-20 xl:px-[5.7vw]">
        <h2
          className={cn(
            'max-w-md text-4xl font-medium leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl',
            font(locale as LocaleType, {
              en: 'font-nobile',
              ar: 'font-cairo',
            }),
          )}
        >
          Frequently Asked Questions
        </h2>

        <div className="mt-14">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div key={faq.question} className="border-b border-border">
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 py-6 text-left text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <Minus
                      aria-hidden="true"
                      className="size-4 shrink-0 text-[#812990]"
                    />
                  ) : (
                    <Plus
                      aria-hidden="true"
                      className="size-4 shrink-0 text-[#812990]"
                    />
                  )}
                </button>
                <div
                  id={`faq-answer-${index}`}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="pb-6 pr-8 text-sm leading-6 text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col justify-start px-6 py-16 sm:px-10 lg:px-[5.2vw] lg:py-20 bg-[#EFF9FE]">
        <div className="">
          <h2
            className={cn(
              'text-4xl font-medium leading-[1.1] tracking-[-0.04em] text-foreground sm:text-5xl',
              font(locale as LocaleType, {
                en: 'font-nobile',
                ar: 'font-cairo',
              }),
            )}
          >
            {pfs.title}
          </h2>
          <div className="mt-12 flex flex-col gap-7 text-base leading-7 text-muted-foreground">
            {pfs.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Button className="mt-12 bg-[#0066B3] px-12 py-4.5 text-white hover:bg-[#0066B3]/90">
            {pfs.buttonLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
