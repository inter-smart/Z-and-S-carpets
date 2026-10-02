'use client'

import { cn } from 'cn'
import { Pause, Play } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRef, useState } from 'react'

export default function ProcessSections() {
  const [activeStep, setActiveStep] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const t = useTranslations('Common.ProcessSection')
  const processSteps = t.raw('steps') as {
    title: string
    description: string
  }[]

  const handleToggle = async () => {
    const video = videoRef.current

    if (!video) return

    if (video.paused) {
      await video.play()
    } else {
      video.pause()
    }
  }

  return (
    <section
      className="text-primary-foreground bg-[#023260] pt-10 pb-24"
      aria-labelledby="process-title"
    >
      <div className="container-wrapper">
        <p className="font-cairo text-center text-[4rem] leading-14 font-bold tracking-widest text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.03)] sm:text-[5rem] sm:leading-18">
          {t('eyebrow')}
        </p>
        <h2
          id="process-title"
          className="our-heading -mt-7 text-center sm:-mt-8"
        >
          {t('title')}
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="group relative min-h-72 overflow-hidden rounded-md">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              playsInline
              muted
              loop
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              poster="/images/video-poster-3.webp"
            >
              <source src="/videos/floor-video-3.mp4" type="video/mp4" />
            </video>

            <div
              className={cn(
                'bg-foreground/20 absolute inset-0 grid place-items-center transition-opacity',
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100',
              )}
            >
              <button
                type="button"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                onClick={handleToggle}
                className="grid cursor-pointer place-items-center text-sm focus:ring-0 focus:outline-none"
              >
                <span className="bg-background grid size-7 place-items-center rounded-full text-[#0066B3]">
                  {isPlaying ? (
                    <Pause className="size-3 fill-current stroke-1" />
                  ) : (
                    <Play className="size-3 fill-current stroke-1" />
                  )}
                </span>

                <span className="mt-1.5 text-sm">
                  {isPlaying ? 'Pause Video' : 'Watch Video'}
                </span>
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
                    'flex flex-row items-start justify-start rounded border p-5 text-2xl transition-colors focus:ring-0 focus:outline-none',
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
                        <span className="text-primary-foreground/90 block text-lg leading-5 font-light">
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
