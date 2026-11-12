import { OurIcon } from '@/components/ui/icon'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function QuotesEmptySection() {
  const t = useTranslations('QuotesPage')

  return (
    <div className="flex flex-col items-center py-10 text-center">
      <div className="flex aspect-square w-40 items-center justify-center rounded-full bg-[#F4F4F4]/70 sm:w-45">
        <OurIcon name="empty-box-icon" className="size-25" />
      </div>
      <p className="mt-7 text-4xl font-medium">{t('emptyTitle')}</p>
      <p className="mt-2 text-base">{t('emptyDescription')}</p>
      <Link href="/products" className="bg-our-purple our-btn mt-6 inline-flex items-center text-white">
        {t('viewProducts')}
      </Link>
    </div>
  )
}
