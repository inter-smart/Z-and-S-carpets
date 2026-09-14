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
  const t = useTranslations('FAQ')
  const faqs = t.raw('faqs') as { question: string; answer: string }[]

  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      className={cn('py-16 lg:py-20', className)}
      aria-label="Frequently asked questions"
    >
      <div className={cn(container && 'container-wrapper', 'flex flex-col')}>
        <h2 className="max-w-md text-4xl font-medium ltr:font-nobile rtl:font-cairo leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl">
          {t('title')}
        </h2>

        <div className="mt-14 sm:pe-8 lg:pe-12 xl:pe-18">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={faq.question}
                className="border-b last:border-none border-border"
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 py-6 ltr:text-left rtl:text-right text-base font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
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
                    <p className="pb-6 pe-8 text-sm leading-6 text-muted-foreground">
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
