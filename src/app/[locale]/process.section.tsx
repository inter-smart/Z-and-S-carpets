'use client'

import { FloorImg1 } from '@/assets/images'
import { cn } from 'cn'
import { Play } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

export default function ProcessSections() {
  const [activeStep, setActiveStep] = useState(1)

  const t = useTranslations('process')
  const processSteps = t.raw('steps') as {
    title: string
    description: string
  }[]

  return (
    <section
      className="bg-[#023260] text-primary-foreground py-16 lg:py-24"
      aria-labelledby="process-title"
    >
      <div className="container-wrapper">
        <p className="text-center text-5xl sm:text-6xl md:text-8xl font-semibold tracking-widest text-primary-foreground/5">
          {t('eyebrow')}
        </p>
        <h2
          id="process-title"
          className="-mt-6 sm:-mt-7 md:-mt-10 text-center text-4xl font-medium ltr:font-nobile rtl:font-cairo tracking-[-0.04em] sm:text-5xl"
        >
          {t('title')}
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative min-h-72 overflow-hidden rounded-md">
            <Image
              src={FloorImg1}
              alt="Flooring project interior at sunset"
              className="absolute inset-0 size-full object-cover"
            />
            <div className="absolute inset-0 grid place-items-center bg-foreground/20">
              <button
                type="button"
                aria-label="Watch video"
                className="grid place-items-center text-sm"
              >
                <span className="grid size-10 place-items-center rounded-full bg-background text-primary">
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
                    'border p-5 transition-colors rounded-md text-xl flex flex-row justify-start items-start',
                    active
                      ? 'border-primary-foreground bg-primary-foreground/10'
                      : 'border-primary-foreground/15 bg-primary-foreground/5 hover:bg-primary-foreground/10 text-white/90',
                  )}
                  aria-expanded={active}
                  aria-controls={`process-step-${i}`}
                >
                  <span className="">0{i + 1}</span>
                  <div className="flex flex-col items-start ps-6">
                    <span className="text-start">{step.title}</span>
                    <span
                      id={`process-step-${i}`}
                      aria-hidden={!active}
                      className={cn(
                        'grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none text-start',
                        active
                          ? 'grid-rows-[1fr] opacity-100'
                          : 'grid-rows-[0fr] opacity-0',
                      )}
                    >
                      <span className="min-h-0 overflow-hidden">
                        <span className="block text-sm leading-6 text-primary-foreground/75">
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
