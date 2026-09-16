'use client'

import { cn } from 'cn'
import { Play } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

export default function ProcessSections() {
  const [activeStep, setActiveStep] = useState(0)

  const t = useTranslations('process')
  const processSteps = t.raw('steps') as {
    title: string
    description: string
  }[]

  return (
    <section
      className="text-primary-foreground bg-[#023260] pt-10 pb-24"
      aria-labelledby="process-title"
    >
      <div className="container-wrapper">
        <p className="font-cairo text-center text-5xl font-bold tracking-widest text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.05)] sm:text-6xl md:text-[7rem]">
          {t('eyebrow')}
        </p>
        <h2
          id="process-title"
          className="section-title -mt-6 text-center sm:-mt-7 md:-mt-10"
        >
          {t('title')}
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative min-h-72 overflow-hidden rounded-md">
            <Image
              src={t('image')}
              alt="Flooring project interior at sunset"
              fill
              className="absolute inset-0 size-full object-cover"
            />
            <div className="bg-foreground/20 absolute inset-0 grid place-items-center">
              <button
                type="button"
                aria-label="Watch video"
                className="grid place-items-center text-sm"
              >
                <span className="bg-background text-primary grid size-10 place-items-center rounded-full">
                  <Play className="ml-1 size-4 fill-current" />
                </span>
                <span className="mt-2">Watch Video</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {processSteps.map((step, i) => {
              const active = activeStep === i
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className={cn(
                    'flex flex-row items-start justify-start rounded border p-5 text-xl transition-colors focus:ring-0 focus:outline-none',
                    active
                      ? 'border-primary-foreground/85 bg-primary-foreground/10 font-medium'
                      : 'border-primary-foreground/15 bg-primary-foreground/5 hover:bg-primary-foreground/10 text-white/90',
                  )}
                  aria-expanded={active}
                  aria-controls={`process-step-${i}`}
                >
                  <span className="">0{i + 1}</span>
                  <div className="flex flex-col items-start gap-2 ps-6">
                    <span className="text-start">{step.title}</span>
                    <span
                      id={`process-step-${i}`}
                      aria-hidden={!active}
                      className={cn(
                        'grid text-start transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none',
                        active
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <span className="min-h-0 overflow-hidden">
                        <span className="text-primary-foreground/90 block text-[1rem] leading-6 font-light">
                          {step.description}
                        </span>
                      </span>
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
