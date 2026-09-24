import { Button } from '@/components/ui/button'
import { OurIcon } from '@/components/ui/icon'
import type { WorkItemType } from '@/types/work'
import { cn } from 'cn'
import Image from 'next/image'
import Link from 'next/link'

export default function WorkItemCard({
  project,
  hasViewProductsBtn = false,
}: {
  project: WorkItemType
  hasViewProductsBtn?: boolean
}) {
  return (
    <article className="group relative h-full overflow-hidden rounded-md">
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="text-background absolute inset-x-3 bottom-3 flex flex-col items-start justify-between rounded-md bg-[#1F1A1A]/30 p-3 backdrop-blur-sm sm:p-5 md:flex-row md:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center">
        <div>
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="text-background/90 text-sm">{project.location}</p>
        </div>

        <div className="flex flex-col gap-0 text-sm min-[350px]:flex-row min-[350px]:gap-2">
          <div className={cn('contents', !hasViewProductsBtn && 'hidden')}>
            <Button
              variant="ghost"
              nativeButton={false}
              render={<Link href={`/projects`} />}
              className="p-0! text-sm font-normal whitespace-nowrap underline decoration-0 underline-offset-8 hover:bg-transparent hover:text-white focus-visible:border-transparent! focus-visible:ring-0!"
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
            render={<Link href={`/works/${project.id}`} />}
            className="space-x-1 p-0! text-sm font-normal whitespace-nowrap underline decoration-0 underline-offset-8 hover:bg-transparent hover:text-white focus-visible:border-transparent! focus-visible:ring-0!"
          >
            <span>{project.btnLabel}</span>
            <OurIcon
              name="arrow-left"
              className="hidden size-3 xl:size-3.5 rtl:inline-block"
            />
            <OurIcon
              name="arrow-right"
              className="hidden size-3 xl:size-3.5 ltr:inline-block"
            />
          </Button>
        </div>
      </div>
    </article>
  )
}
