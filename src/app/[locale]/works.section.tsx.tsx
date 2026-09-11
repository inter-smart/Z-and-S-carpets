'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons'
import { FloorImg6, FloorImg7, FloorImg8 } from '@/assets/images'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

const workItemsImgs = [FloorImg6, FloorImg7, FloorImg8]

export default function WorksSections() {
  const t = useTranslations('works')
  const [category, setCategory] = useState('ALL')

  const workCategories = t.raw('categories') as string[]
  const workItems = t.raw('items') as {
    title: string
    category: string
    location: string
    image: string
    featured: boolean
  }[]

  const visibleProjects = workItems.filter(
    (item) => category === 'ALL' || item.category === category,
  )

  return (
    <section
      className="bg-[#EFF9FE] px-6 py-16 sm:px-10 lg:px-[5.4vw] lg:py-24"
      aria-labelledby="projects-title"
    >
      {/* <div className="mx-auto max-w-6xl"> */}
      <div className="mx-auto">
        <h2
          id="projects-title"
          className="text-center text-4xl font-mediummotion-safe:animate-testimonial-scroll-rtl tracking-[-0.04em] sm:text-5xl"
        >
          {t('title')}
        </h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {workCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={cn(
                'rounded-md border px-7 py-2 text-xs font-medium transition-colors',
                category === item
                  ? 'border-[#0066B3] text-[#0066B3]'
                  : 'border-border hover:border-primary',
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {visibleProjects.map((item, i) => (
            <article
              key={item.title}
              className={cn(
                'group relative min-h-64 overflow-hidden rounded-md',
                item.featured ? 'md:row-span-2 md:min-h-128' : '',
              )}
            >
              <Image
                src={workItemsImgs[i]}
                alt={item.title}
                className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-3 bottom-3 rounded-md bg-foreground/60 px-5 py-4 text-background backdrop-blur-sm flex flex-col sm:flex-row sm:justify-between sm:items-center md:max-lg:flex-col md:max-lg:items-start">
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-background/75">{item.location}</p>
                </div>
                <div>
                  <span className="mt-2 inline-block text-sm">
                    View Project
                    <Image
                      src={ArrowLeftIcon}
                      alt="arrow-left"
                      className="hidden rtl:inline-block w-auto h-2.5 sm:ms-3"
                    />
                    <Image
                      src={ArrowRightIcon}
                      alt="arrow-right"
                      className="hidden ltr:inline-block w-auto h-2.5 sm:ms-3"
                    />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="mx-auto mt-10 block rounded-sm bg-[#0066B3] px-5 py-2.5 text-sm text-white"
        >
          View All Projects
        </button>
      </div>
    </section>
  )
}
