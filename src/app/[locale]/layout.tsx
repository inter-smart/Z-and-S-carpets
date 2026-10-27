import type { Metadata } from 'next'

import '@/app/globals.css'
import BottomSideBtns from '@/components/common/bottom-side-btns'
import Footer from '@/components/pages/footer/footer.section'
import Navbar from '@/components/pages/navbar/navbar.section'
import { Toaster } from '@/components/ui/sonner'
import { DownloadRequestProvider } from '@/context/download-request.context'
import { GetASampleProvider } from '@/context/get-a-sample.context'
import { QuoteCartProvider } from '@/context/quote-cart.context'
import { SearchProvider } from '@/context/search.context'
import { SeasonalOfferProvider } from '@/context/seasonal-offer.context'
import { getSeasonalOfferData } from '@/lib/api/seasonal-offer'
import { getSiteSettingsData } from '@/lib/api/siteSettings'
import type { SeasonalOfferData } from '@/types/seasonal-offer'
import type { SiteSettingsData } from '@/types/site-settings'
import { pickClientMessages } from '@/i18n/client-messages'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Cairo, Inter, Nobile } from 'next/font/google'
import dynamic from 'next/dynamic'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const nobile = Nobile({
  variable: '--font-nobile',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

// Only needed by visitors who actually get an offer, so keep it out of the shared bundle
const SeasonalOfferDialog = dynamic(
  () => import('@/components/pages/common/seasonal-offer.dialog'),
)

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic'],
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ),
  title: 'Z&S Carpets',
  description: 'Trusted Flooring Specialists in UAE & GCC',
  applicationName: 'Z&S Carpets',
  openGraph: { siteName: 'Z&S Carpets' },
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

// Prerender every locale; pages that don't read searchParams/cookies are then served as ISR
// (HTML cached and refreshed in the background, see REVALIDATE_SECONDS in lib/api/cache.ts)
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  const direction = locale === 'ar' ? 'rtl' : 'ltr'
  // one cached request for the nav, footer and bottom buttons; the static content is the fallback
  const [messages, siteSettings, seasonalOffer] = await Promise.all([
    getMessages(),
    getSiteSettingsData.getCmsData<SiteSettingsData>(locale),
    getSeasonalOfferData.getCmsData<SeasonalOfferData>(),
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
        cairo.variable,
        'ltr:font-inter rtl:font-cairo h-full font-sans antialiased',
      )}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={pickClientMessages(messages)}>
          <QuoteCartProvider>
            <GetASampleProvider>
              <DownloadRequestProvider>
                <SearchProvider>
                <SeasonalOfferProvider
                  data={seasonalOffer.success ? seasonalOffer.data : undefined}
                >
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
                  {seasonalOffer.success && seasonalOffer.data?.is_visible && (
                    <SeasonalOfferDialog />
                  )}
                </SeasonalOfferProvider>
                </SearchProvider>
              </DownloadRequestProvider>
            </GetASampleProvider>
          </QuoteCartProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
