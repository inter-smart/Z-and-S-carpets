// /api/frontend/site-settings?lang=<locale> — one language per response (picked by `lang`)
type Media = { path: string | null; alt: string }
type MediaItem = { media_path: string | null; media_alt: string }

export type SiteSettingsPage = { title: string; slug: string; link: string }

export type SiteSettingsProduct = {
  id: number
  slug: string
  title: string
  badge: string | null
  image: Media
}

export type SiteSettingsCategory = {
  id: number
  slug: string
  title: string
  products: SiteSettingsProduct[]
  children: SiteSettingsCategory[]
}

export type SiteSettingsData = {
  nav: {
    logo: Media
    categories: SiteSettingsCategory[]
    pages: SiteSettingsPage[]
  }
  footer: {
    logo: Media
    address: string
    email: string
    phone: string
    whatsapp_number: string
    pages: SiteSettingsPage[]
    social_media: { media: MediaItem; link: string }[]
    products: { title: string; slug: string }[]
    services: { id: number; title: string }[]
    footer_media: { media: MediaItem }[]
  }
  floating_buttons: { icon: Media; link: string }[]
}
