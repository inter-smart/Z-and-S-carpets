'use client'

import { cn } from 'cn'
import { Minus, Plus } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function FAQSection({
  className,
  container = true,
}: {
  className?: string
  container?: boolean
}) {
  const t = useTranslations('Common.FAQSection')
  const faqs = t.raw('faqs') as { question: string; answer: string }[]

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
        <h2 className="section-title">{t('title')}</h2>

        <div className="mt-12">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={faq.question}
                className="border-border border-b last:border-none"
              >
                <button
                  type="button"
                  className="text-foreground hover:text-primary focus-visible:ring-ring flex w-full items-start justify-between gap-6 py-6 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none ltr:text-left rtl:text-right"
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
                    <p className="text-muted-foreground pe-8 pb-6 text-sm leading-6">
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
