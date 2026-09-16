'use client'

import { ArrowLeftIcon, ArrowRightIcon } from '@/assets/icons'
import { FloorImg6, FloorImg7, FloorImg8 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState } from 'react'

const workItemsImgs = [FloorImg6, FloorImg7, FloorImg8]

export default function WorksSections() {
  const t = useTranslations('works')

  const workCategories = t.raw('categories') as string[]
  const workItems = t.raw('items') as {
    title: string
    category: string
    location: string
    image: string
    featured: boolean
    btnLabel: string
  }[]

  const [category, setCategory] = useState(workCategories[0])

  const visibleProjects = workItems.filter(
    (item) => category === workCategories[0] || item.category === category,
  )

  return (
    <section
      className="bg-[#EFF9FE] pt-16 pb-12 lg:pt-24 lg:pb-18"
      aria-labelledby="projects-title"
    >
      <div className="container-wrapper">
        <h2 id="projects-title" className="section-title text-center">
          {t('title')}
        </h2>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {workCategories.map((item) => (
            <Button
              key={item}
              type="button"
              variant="outline"
              onClick={() => setCategory(item)}
              className={cn(
                'rounded-md border px-9 py-4.5 text-xs font-semibold transition-colors hover:border-[#0066B3] hover:text-[#0066B3]',
                category === item
                  ? 'border-[#0066B3]! text-[#0066B3]!'
                  : 'border-[#CDCDCD]!',
              )}
            >
              {item}
            </Button>
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
              <div className="text-background absolute inset-x-3 bottom-3 flex flex-col rounded-md bg-[#1F1A1A]/30 px-5 py-7 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between md:max-lg:flex-col md:max-lg:items-start">
                <div>
                  <h3 className="text-xl font-bold sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="text-background/90 text-sm">{item.location}</p>
                </div>
                <div>
                  <span className="mt-2 inline-block text-sm font-light sm:text-[1rem]">
                    <span className="underline decoration-0 underline-offset-8">
                      {item.btnLabel}
                    </span>
                    <Image
                      src={ArrowLeftIcon}
                      alt="arrow-left"
                      className="ms-3 hidden h-2.5 w-auto rtl:inline-block"
                    />
                    <Image
                      src={ArrowRightIcon}
                      alt="arrow-right"
                      className="ms-3 hidden h-2.5 w-auto ltr:inline-block"
                    />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="mx-auto mt-10 block rounded-sm bg-[#0066B3] px-5 py-3 text-xs font-semibold text-white lg:mt-12"
        >
          {t('viewAllProjectsBtnLabel')}
        </button>
      </div>
    </section>
  )
}
