import { Button } from '@/components/ui/button'
import type { blogItemType } from '@/types/blog'
import Image from 'next/image'
import Link from 'next/link'

export default function BlogItemCard({ article }: { article: blogItemType }) {
  return (
    <article className="grid grid-cols-1 gap-3 overflow-hidden rounded-md border p-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-sm min-[400px]:max-sm:h-75 sm:order-last lg:order-first xl:order-last">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col p-2">
        <p className="text-our-purple text-xs">
          • {article.date} | {article.author}
        </p>
        <h2 className="mt-3 text-base font-semibold sm:line-clamp-3">
          {article.title}
        </h2>
        <p className="mt-3 text-sm leading-6 font-normal sm:line-clamp-3 md:line-clamp-5 xl:line-clamp-3 2xl:line-clamp-none">
          {article.excerpt}
        </p>
        <Button
          variant={'outline'}
          nativeButton={false}
          render={<Link href={`/blog-details?id=${article.id}`} />}
          className="our-btn border-our-blue hover:bg-our-blue mt-3 w-fit hover:text-white"
        >
          Read More
        </Button>
      </div>
    </article>
  )
}
