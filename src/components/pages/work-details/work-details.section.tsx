import type { WorkItemType } from '@/types/work'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function WorkDetailsSection({ id }: { id: string }) {
  const t = useTranslations('Works')

  const workItems = t.raw('Items') as WorkItemType[]

  const work = workItems.find((work) => work.id === id)

  if (!work) return null

  return (
    <main className="container-wrapper pt-12 pb-20">
      <header className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <h1 className="our-heading">{work.title}</h1>
        <dl className="grid grid-cols-1 gap-3 text-[9px] md:grid-cols-2 lg:grid-cols-3 lg:gap-10 2xl:gap-20">
          {work.details.metadata.map((item) => (
            <div key={item.label}>
              <dt className="our-text font-medium">{item.label}</dt>
              <dd className="text-our-blue mt-1 text-sm font-light">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="relative mt-15 mb-15 h-50 w-full overflow-hidden rounded-md sm:h-75 xl:h-100 2xl:h-120">
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="our-text mt-7 space-y-5">
        {work.details.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <section
        className="mt-15 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
        aria-label="Deck flooring project gallery"
      >
        {work.details.gallery.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative h-50 overflow-hidden rounded-md sm:h-40 md:h-50 lg:h-60"
          >
            <Image
              src={image}
              alt={`${work.title} ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </section>
    </main>
  )
}
