import type { LocaleType } from '@/i18n/types'
import { pickLocalized } from '@/lib/product-detail'
import type { ProductLabel } from '@/types/product-detail'

// The product's own tags
export default function TagsSection({
  tags,
  locale,
}: {
  tags: ProductLabel[]
  locale: LocaleType
}) {
  if (!tags.length) return null

  return (
    <section className="container-wrapper pt-8 pb-20 lg:pt-10">
      <div className="flex flex-wrap content-start gap-2">
        {tags.map((tag) => (
          <span
            key={tag.slug}
            className="rounded border border-[#CCCCCC] px-3 py-1 text-sm text-black"
          >
            {pickLocalized(locale, tag.title, tag.title_ar)}
          </span>
        ))}
      </div>
    </section>
  )
}
