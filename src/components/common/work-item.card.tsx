import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import type { WorkCardItem } from '@/types/work'
import { cn } from 'cn'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

export default function WorkItemCard({
  project,
  hasViewProductsBtn = false,
  priority = false,
  sizes,
}: {
  project: WorkCardItem
  hasViewProductsBtn?: boolean
  priority?: boolean
  sizes?: string
}) {
  const locale = useLocale() as LocaleType

  return (
    <article className="group relative h-full overflow-hidden rounded-md">
      {project.image && (
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority={priority}
          sizes={sizes}
          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="text-background absolute inset-x-3 bottom-3 flex flex-col items-start justify-between rounded-sm border border-white/30 bg-[#1F1A1A]/30 p-3 backdrop-blur-sm sm:p-5 xl:flex-row xl:items-center">
        <div>
          <h3 className="text-3xl font-bold">{project.title}</h3>
          <p className="text-background/90 mt-1 text-sm">{project.location}</p>
        </div>

        <div className="flex flex-col gap-0 text-sm min-[350px]:flex-row min-[350px]:gap-2">
          <div
            className={cn(
              'contents',
              (!hasViewProductsBtn || !project.categorySlug) && 'hidden',
            )}
          >
            <Button
              variant="ghost"
              nativeButton={false}
              render={
                <Link
                  href={`/${locale}/products?category=${encodeURIComponent(project.categorySlug ?? '')}`}
                />
              }
              className="p-0! text-lg font-light whitespace-nowrap underline decoration-1 underline-offset-8 hover:bg-transparent hover:text-white focus-visible:border-transparent! focus-visible:ring-0!"
            >
              <span>View Products</span>
            </Button>
            <span className="mt-auto hidden opacity-40 min-[350px]:block">
              |
            </span>
          </div>
          <Button
            variant="ghost"
            nativeButton={false}
            render={<Link href={`/${locale}/works/${project.id}`} />}
            className="space-x-1 p-0! text-lg font-light whitespace-nowrap underline decoration-1 underline-offset-8 hover:bg-transparent hover:text-white focus-visible:border-transparent! focus-visible:ring-0!"
          >
            <span>{project.btnLabel}</span>
            <OurIcon
              name="arrow-left"
              className="hidden size-3 rtl:inline-block"
            />
            <OurIcon
              name="arrow-right"
              className="hidden size-3 ltr:inline-block"
            />
          </Button>
        </div>
      </div>
    </article>
  )
}
