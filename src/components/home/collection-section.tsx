import {
  ArrowLeftIcon,
  ArrowLeftPurpleIcon,
  ArrowRightIcon,
  ArrowRightPurpleIcon,
} from '@/assets/icons'
import { FloorImg2, FloorImg5 } from '@/assets/images'
import { Button } from '@/components/ui/button'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const collectionImgs = {
  'laminate-flooring': FloorImg5,
  'carpet-flooring': FloorImg2,
}

export default function CollectionSection() {
  const t = useTranslations('collection')
  const collectionItems = t.raw('items') as {
    id: string
    title: string
  }[]

  return (
    <section
      className="container-wrapper bg-background py-16 lg:py-24"
      aria-labelledby="collection-title"
    >
      <div className="sm:items-centers flex flex-col justify-between gap-3 sm:flex-row sm:gap-6">
        <h2 id="collection-title" className="section-title">
          {t('title')}
        </h2>
        <Button
          variant="outline"
          className="inline-flex w-fit rounded-sm border-[#0066B3] px-5 py-4.5 text-xs font-semibold"
        >
          {t('buttonLabel')}
        </Button>
      </div>
      <div className="relative mt-12 grid gap-4 lg:grid-cols-[1fr_1fr] xl:grid-cols-[1.35fr_1fr]">
        {collectionItems.map((item) => (
          <article
            key={item.title}
            className="group bg-muted relative min-h-80 overflow-hidden rounded-lg sm:min-h-108"
          >
            <Image
              src={collectionImgs[item.id as keyof typeof collectionImgs]}
              alt={`${item.title} interior`}
              priority
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="text-background absolute inset-x-8 bottom-7 flex items-center justify-between gap-4 rounded-sm bg-[#1F1A1A]/30 px-6 py-6 backdrop-blur-sm">
              <h3 className="ltr:font-nobile rtl:font-cairo sm:text:xl text-lg font-medium">
                {item.title}
              </h3>
              <span className="flex items-center justify-between text-sm font-medium">
                <span className="hidden sm:block">{t('itemButtonLabel')}</span>
                <Image
                  src={ArrowLeftIcon}
                  alt="arrow-left"
                  className="hidden h-2.5 w-auto sm:ms-3 rtl:block"
                />
                <Image
                  src={ArrowRightIcon}
                  alt="arrow-right"
                  className="hidden h-2.5 w-auto sm:ms-3 ltr:block"
                />
              </span>
            </div>
          </article>
        ))}
        <Button
          type="button"
          aria-label="Previous collection"
          className="text-primary absolute top-1/2 -left-10 hidden text-xl hover:bg-transparent lg:block"
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
          className="text-primary absolute top-1/2 -right-10 hidden text-xl hover:bg-transparent lg:block"
          variant="ghost"
        >
          <Image
            src={ArrowRightPurpleIcon}
            alt="arrow-right"
            className="h-2.5 w-auto"
          />
        </Button>
      </div>
    </section>
  )
}
