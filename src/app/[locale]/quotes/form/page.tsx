import GetAQuoteForm from '@/components/pages/quotes/get-a-quote-form'
import type { LocaleType } from '@/i18n/types'
import { getMetaData } from '@/lib/api/metaApi'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/quotes/form'>): Promise<Metadata> {
  const { locale } = await params
  return getMetaData('quotes', locale as LocaleType, 'quotes/form')
}

export default function QuoteFormPage() {
  return (
    <div className="relative bg-blue-50 bg-[url('/images/floor-img-14.webp')] bg-cover bg-center">
      <div className="bg-our-blue/50 absolute top-0 left-0 z-10 h-full w-full" />
      <div className="container-wrapper relative z-20 flex justify-center">
        <GetAQuoteForm />
      </div>
    </div>
  )
}
