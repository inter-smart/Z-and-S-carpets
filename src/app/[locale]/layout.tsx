import type { Metadata } from 'next'

import '@/app/globals.css'
import BottomSideBtns from '@/components/common/bottom-side-btns'
import Footer from '@/components/pages/footer/footer.section'
import Navbar from '@/components/pages/navbar/navbar.section'
import { GetASampleProvider } from '@/context/get-a-sample.context'
import { cn } from '@/lib/utils'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Cairo, Inter, Manrope, Nobile } from 'next/font/google'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const nobile = Nobile({
  variable: '--font-nobile',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic'],
})

export const metadata: Metadata = {
  title: 'Z&S Carpets',
  description: 'Trusted Flooring Specialists in UAE & GCC',
  keywords:
    'Flooring, Artificial Grass, Vinyl Flooring, Deck Flooring, Spc Flooring, Laminate Flooring, Carpet Flooring, Lvt Flooring',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      dir={direction}
      className={cn(
        inter.variable,
        nobile.variable,
        manrope.variable,
        cairo.variable,
        'ltr:font-inter rtl:font-cairo h-full font-sans antialiased',
      )}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <GetASampleProvider>
            <Navbar />
            <main className="mt-27 md:mt-29 xl:mt-31">{children}</main>
            <Footer />
            <BottomSideBtns />
          </GetASampleProvider>
        </NextIntlClientProvider>
        {/* dev helper */}
        {/* <div className="fixed top-0 left-0 z-99 flex flex-row space-x-2">
          <div className="h-0.5 w-5 bg-blue-400"></div>
          <div className="hidden h-0.5 w-5 bg-blue-400 sm:block"></div>
          <div className="hidden h-0.5 w-5 bg-blue-400 md:block"></div>
          <div className="hidden h-0.5 w-5 bg-blue-400 lg:block"></div>
          <div className="hidden h-0.5 w-5 bg-blue-400 xl:block"></div>
          <div className="hidden h-0.5 w-5 bg-blue-400 2xl:block"></div>
        </div> */}
      </body>
    </html>
  )
}
