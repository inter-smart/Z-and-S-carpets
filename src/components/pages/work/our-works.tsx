'use client'

import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import { cn } from 'cn'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

type WorkItem = {
  id: string
  title: string
  category: string
  location: string
  image: string
  btnLabel: string
}

function ProjectCard({ project }: { project: WorkItem }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-md">
      <Image
        src={project.image}
        fill
        alt={project.title}
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="text-background absolute inset-x-3 bottom-3 flex flex-col items-start rounded-md bg-[#1F1A1A]/30 p-3 backdrop-blur-sm sm:p-5 md:flex-row md:items-end md:justify-between lg:flex-col lg:items-start 2xl:flex-row 2xl:items-end">
        <div>
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-background/90 text-sm">{project.location}</p>
        </div>

        <div className="flex flex-col gap-2 text-sm min-[350px]:flex-row">
          <p className="cursor-pointer whitespace-nowrap underline decoration-0 underline-offset-8">
            View Products
          </p>
          <span className="hidden leading-7 opacity-40 min-[350px]:block 2xl:block">
            |
          </span>
          <p className="cursor-pointer space-x-2 whitespace-nowrap underline decoration-0 underline-offset-8">
            <span>{project.btnLabel}</span>
            <OurIcon
              name="arrow-left"
              className="hidden size-3.5 rtl:inline-block"
            />
            <OurIcon
              name="arrow-right"
              className="hidden size-3.5 ltr:inline-block"
            />
          </p>
        </div>
      </div>
    </article>
  )
}

export default function OurWorksSection() {
  const locale = useLocale() as LocaleType

  const searchParams = useSearchParams()
  const category = searchParams.get('type')

  const t = useTranslations('HomePage.WorksSection')
  const t2 = useTranslations('WorkPage.OurWorks')

  const workCategories = t.raw('categories') as { id: string; label: string }[]
  const workItems = t.raw('items') as WorkItem[]

  // #Filter by category
  const filteredWorkItems = useMemo(
    () =>
      workItems.filter(
        (item) => category === null || item.category === category,
      ),
    [workItems, category],
  )

  return (
    <section className="container-wrapper pt-8 pb-12 lg:pt-12 lg:pb-18">
      <h2 id="projects-title" className="section-title text-center">
        {t('title')}
      </h2>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        {workCategories.map((item) => (
          <Button
            // render={
            //   <Link
            //     prefetch={false}
            //     href={
            //       item.id === 'all'
            //         ? `/${locale}/work`
            //         : `/${locale}/work?type=${item.id}`
            //     }
            //   />
            // }
            key={item.id}
            type="button"
            variant="outline"
            onClick={() => {
              if (item.id === 'all')
                window.history.pushState({}, '', `/${locale}/work`)
              else
                window.history.pushState(
                  {},
                  '',
                  `/${locale}/work?type=${item.id}`,
                )
            }}
            className={cn(
              'rounded-md border px-9 py-4.5 text-xs font-semibold transition-colors hover:border-[#0066B3] hover:text-[#0066B3]',
              category === item.id
                ? 'border-[#0066B3]! text-[#0066B3]!'
                : 'border-[#CDCDCD]!',
            )}
          >
            {item.label}
          </Button>
        ))}
      </div>

      {/*  */}
      <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {filteredWorkItems.map((item, index) => (
          <div key={index} className="h-60 md:h-70">
            <ProjectCard project={item} />
          </div>
        ))}
      </div>

      <div className="mt-12 flex w-full justify-center">
        <Button variant="outline" className="our-btn border-our-blue">
          {t2('loadMoreBtnLable')}
        </Button>
      </div>
    </section>
  )
}
