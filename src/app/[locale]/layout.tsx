import type { Metadata } from 'next'

import '@/app/globals.css'
import BottomSideBtns from '@/components/common/bottom-side-btns'
import Footer from '@/components/pages/footer/footer.section'
import Navbar from '@/components/pages/navbar/navbar.section'
import { GetASampleProvider } from '@/context/get-a-sample.context'
import { getSiteSettingsData } from '@/lib/api/siteSettings'
import type { SiteSettingsData } from '@/types/site-settings'
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
  // one cached request for the nav, footer and bottom buttons; the static content is the fallback
  const [messages, siteSettings] = await Promise.all([
    getMessages(),
    getSiteSettingsData.getCmsData<SiteSettingsData>(locale),
  ])
  const nav = siteSettings.success ? siteSettings.data.nav : undefined
  const footer = siteSettings.success ? siteSettings.data.footer : undefined

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
            <Navbar nav={nav} whatsapp={footer?.whatsapp_number} />
            <main className="mt-28">{children}</main>
            <Footer footer={footer} />
            <BottomSideBtns
              buttons={
                siteSettings.success
                  ? siteSettings.data.floating_buttons
                  : undefined
              }
              email={footer?.email}
              phone={footer?.phone}
              whatsapp={footer?.whatsapp_number}
            />
          </GetASampleProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
