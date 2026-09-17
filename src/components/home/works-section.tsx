'use client'

import {
  ArrowLeftIcon,
  ArrowLeftPurpleIcon,
  ArrowRightIcon,
  ArrowRightPurpleIcon,
} from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { cn } from 'cn'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type WorkItem = {
  id: string
  title: string
  category: string
  location: string
  image: string
  featured: boolean
  btnLabel: string
}

type WorkProject = {
  item: WorkItem
  originalIndex: number
}

type Direction = 'next' | 'previous'

function ProjectCard({ project }: { project: WorkProject }) {
  const { item, originalIndex } = project

  return (
    <article
      className={cn(
        'group relative min-h-64 overflow-hidden rounded-md',
        item.featured ? 'md:row-span-2 md:min-h-128' : '',
      )}
    >
      <Image
        src={item.image}
        fill
        alt={item.title}
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="text-background absolute inset-x-3 bottom-3 flex flex-col rounded-md bg-[#1F1A1A]/30 px-3 py-4 backdrop-blur-sm sm:flex-row sm:items-start sm:justify-between md:px-5 md:max-lg:flex-col md:max-lg:items-start lg:py-7 lg:max-lg:flex-col">
        <div>
          <h3 className="text-xl font-bold lg:text-2xl">{item.title}</h3>

          <p className="text-background/90 text-sm">{item.location}</p>
        </div>

        <div>
          <span className="mt-2 inline-block text-xs font-light sm:max-md:text-sm lg:text-[1rem]">
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
  )
}

function ProjectGrid({ projects }: { projects: WorkProject[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.item.id} project={project} />
      ))}
    </div>
  )
}

const createSlides = (projects: WorkProject[], itemsPerSlide: number) => {
  if (itemsPerSlide === 1) {
    return projects.map((project) => [project])
  }

  const slides: WorkProject[][] = []
  let index = 0

  while (index < projects.length) {
    const current = projects[index]
    const next = projects[index + 1]
    const afterNext = projects[index + 2]

    // Two featured items should always stay together
    if (current.item.featured && next?.item.featured) {
      slides.push([current, next])
      index += 2
      continue
    }

    // Featured + 2 normal
    if (
      current.item.featured &&
      next &&
      !next.item.featured &&
      afterNext &&
      !afterNext.item.featured
    ) {
      slides.push([current, next, afterNext])
      index += 3
      continue
    }

    // Featured + one normal
    if (current.item.featured && next && !next.item.featured) {
      slides.push([current, next])
      index += 2
      continue
    }

    // Three normal items
    if (
      !current.item.featured &&
      next &&
      !next.item.featured &&
      afterNext &&
      !afterNext.item.featured
    ) {
      slides.push([current, next, afterNext])
      index += 3
      continue
    }

    // Two normal items
    if (!current.item.featured && next && !next.item.featured) {
      slides.push([current, next])
      index += 2
      continue
    }

    // Single item
    slides.push([current])
    index += 1
  }

  return slides
}

export default function WorksSections() {
  const t = useTranslations('works')

  const workCategories = t.raw('categories') as string[]

  const workItems = t.raw('items') as WorkItem[]

  const [category, setCategory] = useState(workCategories[0])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(1)
  const [direction, setDirection] = useState<Direction>('next')
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const updateItemsPerSlide = () => {
      setItemsPerSlide(window.matchMedia('(min-width: 768px)').matches ? 3 : 1)
      setCurrentIndex(0)
      setIsAnimating(false)
    }

    updateItemsPerSlide()

    window.addEventListener('resize', updateItemsPerSlide)

    return () => {
      window.removeEventListener('resize', updateItemsPerSlide)
    }
  }, [])

  const visibleProjects = workItems.filter(
    (item) => category === workCategories[0] || item.category === category,
  )

  const projectsWithIndex = visibleProjects.map((item) => ({
    item,
    originalIndex: workItems.indexOf(item),
  }))

  const slides = createSlides(projectsWithIndex, itemsPerSlide)

  const maxIndex = Math.max(slides.length - 1, 0)

  const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1

  const handleNext = () => {
    if (isAnimating || currentIndex >= maxIndex) return

    setDirection('next')
    setIsAnimating(true)
  }

  const handlePrevious = () => {
    if (isAnimating || currentIndex <= 0) return

    setDirection('previous')
    setIsAnimating(true)
  }

  const handleAnimationEnd = () => {
    setCurrentIndex((current) =>
      direction === 'next' ? current + 1 : current - 1,
    )

    setIsAnimating(false)
  }

  // useEffect(() => {
  //   setCurrentIndex(0)
  //   setIsAnimating(false)
  // }, [category, itemsPerSlide])

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
              onClick={() => {
                setCategory(item)
                setCurrentIndex(0)
                setIsAnimating(false)
              }}
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

        <div className="relative mt-10">
          <div className="overflow-hidden rounded-md">
            <div className="relative">
              {/* Current slide */}
              <div
                className={
                  isAnimating
                    ? direction === 'next'
                      ? 'animate-slide-out-left'
                      : 'animate-slide-out-right'
                    : ''
                }
                onAnimationEnd={handleAnimationEnd}
              >
                {slides[currentIndex] && (
                  <ProjectGrid projects={slides[currentIndex]} />
                )}
              </div>

              {/* Incoming slide */}
              {isAnimating && slides[nextIndex] && (
                <div
                  className={cn(
                    'absolute inset-0',
                    direction === 'next'
                      ? 'animate-slide-in-right'
                      : 'animate-slide-in-left',
                  )}
                >
                  <ProjectGrid projects={slides[nextIndex]} />
                </div>
              )}
            </div>
          </div>

          {/* Desktop navigation */}
          <Button
            type="button"
            aria-label="Previous collection"
            onClick={handlePrevious}
            disabled={currentIndex === 0 || isAnimating}
            className="text-primary absolute top-1/2 -left-8 hidden cursor-pointer text-xl hover:bg-transparent disabled:opacity-30 sm:inline-flex md:-left-10"
            variant="ghost"
          >
            <Image
              src={ArrowLeftPurpleIcon}
              alt="arrow-left"
              className="h-2.5 w-auto"
            />
          </Button>

          <Button
            type="button"
            aria-label="Next collection"
            onClick={handleNext}
            disabled={currentIndex === maxIndex || isAnimating}
            className="text-primary absolute top-1/2 -right-8 hidden cursor-pointer text-xl hover:bg-transparent disabled:opacity-30 sm:inline-flex md:-right-10"
            variant="ghost"
          >
            <Image
              src={ArrowRightPurpleIcon}
              alt="arrow-right"
              className="h-2.5 w-auto"
            />
          </Button>
        </div>

        {/* Mobile navigation */}
        <div className="mt-6 flex justify-center gap-2 sm:hidden">
          <Button
            type="button"
            aria-label="Previous projects"
            variant="ghost"
            size="icon"
            disabled={currentIndex === 0 || isAnimating}
            onClick={handlePrevious}
            className="cursor-pointer hover:bg-transparent disabled:opacity-30"
          >
            <Image
              src={ArrowRightPurpleIcon}
              alt="arrow-right"
              className="hidden h-2.5 w-auto rtl:block"
            />

            <Image
              src={ArrowLeftPurpleIcon}
              alt="arrow-left"
              className="hidden h-2.5 w-auto ltr:block"
            />
          </Button>

          <Button
            type="button"
            aria-label="Next projects"
            variant="ghost"
            size="icon"
            disabled={currentIndex === maxIndex || isAnimating}
            onClick={handleNext}
            className="cursor-pointer hover:bg-transparent disabled:opacity-30"
          >
            <Image
              src={ArrowLeftPurpleIcon}
              alt="arrow-left"
              className="hidden h-2.5 w-auto rtl:block"
            />

            <Image
              src={ArrowRightPurpleIcon}
              alt="arrow-right"
              className="hidden h-2.5 w-auto ltr:block"
            />
          </Button>
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
