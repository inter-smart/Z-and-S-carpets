import GalleryVideoCard from '@/components/pages/work-details/gallery-video-card'
import type { LocaleType } from '@/i18n/types'
import { formatProjectDate, pickLocalized } from '@/lib/works'
import type { WorkDetailData } from '@/types/work'
import { useLocale, useTranslations } from 'next-intl'
import SafeImage from '@/components/common/safe-image'

export default function WorkDetailsSection({
  project,
}: {
  project: WorkDetailData
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('WorksPage.Details')

  const title = pickLocalized(locale, project.title, project.title_ar)
  const location = pickLocalized(locale, project.location, project.location_ar)
  const material = pickLocalized(
    locale,
    project.material_type,
    project.material_type_ar,
  )
  const description = pickLocalized(
    locale,
    project.description,
    project.description_ar,
  )

  const metadata = [
    location && { label: t('locationLabel'), value: location },
    project.date_of_completion && {
      label: t('dateLabel'),
      value: formatProjectDate(project.date_of_completion, locale),
    },
    material && { label: t('materialLabel'), value: material },
  ].filter((item): item is { label: string; value: string } => Boolean(item))

  return (
    <main className="container-wrapper pt-12 pb-20">
      <header className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
        <h1 className="our-heading">{title}</h1>
        {metadata.length > 0 && (
          <dl className="grid grid-cols-1 gap-3 text-[9px] md:grid-cols-2 lg:grid-cols-3 lg:gap-10 2xl:gap-20">
            {metadata.map((item) => (
              <div key={item.label}>
                <dt className="text-xl font-medium">{item.label}</dt>
                <dd className="text-our-blue mt-1 text-base">{item.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </header>

      <div className="relative mt-15 mb-15 h-50 w-full overflow-hidden rounded-md sm:h-75 xl:h-100 2xl:h-120">
        <SafeImage
          src={project.media.path}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {description && (
        <div
          className="mt-7 space-y-5 text-lg"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}

      {project.gallery.length > 0 && (
        <section
          className="mt-15 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
          aria-label={`${title} gallery`}
        >
          {project.gallery.map((item, index) => {
            if (!item.path) return null

            if (item.type === 'video') {
              return (
                <GalleryVideoCard
                  key={`${item.path}-${index}`}
                  src={item.path}
                  poster={item.thumbnail}
                />
              )
            }

            return (
              <div
                key={`${item.path}-${index}`}
                className="relative h-50 overflow-hidden rounded-md sm:h-40 md:h-50 lg:h-60"
              >
                <SafeImage
                  src={item.path}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            )
          })}
        </section>
      )}
    </main>
  )
}
