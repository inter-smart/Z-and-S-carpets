import SafeImage from '@/components/common/safe-image'
import { Button } from '@/components/ui/button'
import type { LocaleType } from '@/i18n/types'
import { formatBlogDate, pickLocalized } from '@/lib/blogs'
import type { BlogCard } from '@/types/blog'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

export default function BlogItemCard({ article }: { article: BlogCard }) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('BlogsPage.BlogListSection')

  const title = pickLocalized(locale, article.title, article.title_ar)
  const author = pickLocalized(locale, article.author, article.author_ar)
  const date = formatBlogDate(article.published_at, locale)

  return (
    <article className="grid grid-cols-1 gap-3 overflow-hidden rounded-md border border-[#BABABA] p-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-[#F4F4F4] min-[400px]:max-sm:h-75 sm:order-last lg:order-first xl:order-last">
        <SafeImage
          src={article.media.path}
          alt={
            pickLocalized(locale, article.media.alt, article.media.alt_ar) ||
            title
          }
          fill
          sizes="(max-width: 640px) 100vw, 400px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col p-2">
        <p className="text-our-purple text-sm">
          • {date}
          {author && ` | ${author}`}
        </p>
        <h2 className="mt-3 text-xl font-semibold sm:line-clamp-3">{title}</h2>
        <p className="mt-3 text-base leading-5 font-normal sm:line-clamp-3 md:line-clamp-5 xl:line-clamp-3 2xl:line-clamp-none">
          {pickLocalized(locale, article.excerpt, article.excerpt_ar)}
        </p>
        <Button
          variant={'outline'}
          nativeButton={false}
          render={<Link href={`/${locale}/blogs/${article.slug}`} />}
          className="our-btn border-our-blue mt-3 w-fit"
        >
          {t('readMore')}
        </Button>
      </div>
    </article>
  )
}
