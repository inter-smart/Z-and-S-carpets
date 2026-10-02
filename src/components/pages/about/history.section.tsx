'use client'

import { OurIcon, type OurIconName } from '@/components/ui/icon'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import { useState, type CSSProperties } from 'react'

export default function HistorySection() {
  const t = useTranslations('AboutPage.HistorySection')
  const events = t.raw('events') as {
    year: string
    title: OurIconName
    description: string
  }[]

  const [activeEvent, setActiveEvent] = useState(1)

  const event = events[activeEvent]

  const moveTimeline = (direction: -1 | 1) => {
    setActiveEvent(
      (current) => (current + direction + events.length) % events.length,
    )
  }

  return (
    <section
      className="container-wrapper pb-16 lg:pb-24"
      aria-labelledby="company-history"
    >
      <h2 className="our-heading text-center text-7xl!">{t('title')}</h2>

      {/* Timeline */}
      <div className="relative mt-2 flex items-center">
        {/* Previous button */}
        <button
          type="button"
          onClick={() => moveTimeline(-1)}
          aria-label="Previous history event"
          className="relative z-10 flex size-15 shrink-0 items-center justify-center rounded-full bg-[#F2EAF4] text-lg transition-transform hover:scale-105 focus:ring-2 focus:ring-[#8b2b9d] focus:outline-none"
        >
          <OurIcon name="arrow-left" className="rtl:hidden" />
          <OurIcon name="arrow-right" className="ltr:hidden" />
        </button>

        {/* Timeline viewport */}
        <div className="relative min-w-0 flex-1">
          {/* This clips only the moving timeline */}
          <div className="relative flex h-30 flex-col justify-center overflow-hidden">
            <div
              className="absolute top-1/2 right-0 left-0 h-px bg-[#ACCEDF]"
              aria-hidden="true"
            />
            {/* Moving timeline */}
            <div
              // className="relative flex transition-transform duration-500 ease-out"
              // style={
              //   {
              //     width: `${(events.length / 3) * 100}%`,
              //     transform: `translateX(${
              //       (1 - activeEvent) * (100 / events.length)
              //     }%)`,
              //   } as CSSProperties
              //   // {
              //   //   width: `${(events.length / 1) * 100}%`,
              //   //   transform: `translateX(${
              //   //     (0 - activeEvent) * (100 / events.length)
              //   //   }%)`,
              //   // } as CSSProperties
              // }
              className={cn(
                'relative flex transition-transform duration-500 ease-out',
                // Mobile: 1 item
                'w-[calc(var(--events-length)*100%)]',
                // Mobile LTR
                'ltr:translate-x-[calc(var(--active-event)*-1*(100%/var(--events-length)))]',
                // Mobile RTL
                'rtl:translate-x-[calc(var(--active-event)*(100%/var(--events-length)))]',
                // Desktop: 3 items
                'sm:w-[calc(var(--events-length)/3*100%)]',
                // Desktop LTR
                'ltr:sm:translate-x-[calc((1-var(--active-event))*(100%/var(--events-length)))]',
                // Desktop RTL
                'rtl:sm:translate-x-[calc((var(--active-event)-1)*(100%/var(--events-length)))]',
              )}
              style={
                {
                  '--events-length': events.length,
                  '--active-event': activeEvent,
                } as CSSProperties
              }
            >
              {events.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveEvent(index)}
                  aria-label={`View ${item.year}`}
                  className={cn(
                    'relative shrink-0 py-2 focus:ring-0 focus:outline-none',
                    // 'transition-transform duration-500 ease-out',
                    // activeEvent - 1 === index && '0 translate-x-1/4',
                    // activeEvent + 1 === index && '-translate-x-1/4',
                  )}
                  style={{
                    display: 'flex',
                    width: `${100 / events.length}%`,
                    flexDirection: 'column',
                    alignItems: 'center',
                    // gap: '0.75rem',
                  }}
                >
                  {/* Circle */}
                  <span
                    className={cn(
                      'relative flex size-10 items-center justify-center rounded-full border bg-white transition-all duration-300',
                      index === activeEvent
                        ? 'border-black'
                        : 'border-[#6D6D6D]',
                    )}
                  >
                    <span
                      className={cn(
                        'size-4 rounded-full transition-colors',
                        index === activeEvent
                          ? 'bg-our-purple'
                          : 'bg-transparent',
                      )}
                    />
                  </span>

                  {/* Year */}
                  <span
                    className={cn(
                      'absolute top-16 text-lg whitespace-nowrap transition-colors',
                      index === activeEvent ? 'hidden' : 'text-black',
                    )}
                  >
                    {item.year}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Next button */}
        <button
          type="button"
          onClick={() => moveTimeline(1)}
          aria-label="Next history event"
          className="relative flex size-15 shrink-0 items-center justify-center rounded-full bg-[#F2EAF4] text-lg transition-transform hover:scale-105 focus:ring-2 focus:ring-[#8b2b9d] focus:outline-none"
        >
          <OurIcon name="arrow-right" className="rtl:hidden" />
          <OurIcon name="arrow-left" className="ltr:hidden" />
        </button>
      </div>

      {/* Details */}
      <div
        className="mx-auto w-full text-center sm:w-4/5 md:w-3/5"
        aria-live="polite"
      >
        <p className="text-our-purple text-9xl leading-none font-bold">
          {event.year}
        </p>
        <h3 className="ltr:font-nobile rtl:font-cairo mt-4 text-5xl font-medium">
          {event.title}
        </h3>
        <p className="our-text mt-3 text-lg leading-6">{event.description}</p>
      </div>
    </section>
  )
}
