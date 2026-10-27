import QuotesListSection from '@/components/pages/quotes/quotes-list.section'
import type { LocaleType } from '@/i18n/types'
import { getMetaData } from '@/lib/api/metaApi'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/quotes'>): Promise<Metadata> {
  const { locale } = await params
  // the quote cart is per-visitor and thin, so keep it out of the index
  return {
    ...(await getMetaData('quotes', locale as LocaleType, 'quotes')),
    robots: { index: false, follow: true },
  }
}

export default function Page() {
  return <QuotesListSection />
}
