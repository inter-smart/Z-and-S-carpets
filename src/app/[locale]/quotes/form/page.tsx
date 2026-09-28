import GetAQuoteForm from '@/components/pages/quotes/get-a-quote-form'

export const metadata = {
  title: 'Get a Quote',
  description: 'Request a flooring quote from Z&S Carpets.',
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
