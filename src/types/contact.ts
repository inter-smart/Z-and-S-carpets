import type { HomeMedia } from './home'

// `is_enabled: false` = hidden by an admin (don't render at all); absent/true = shown.
// `is_visible` only says whether the section has CMS content (else the translated fallback is used).
type Visible = { is_visible: boolean; is_enabled?: boolean }
type Titled = { title: string; title_ar: string }

// /api/frontend/contact — same conventions as the home / about APIs (both languages per field,
// `is_visible` on every section, sanitized rich text for descriptions and the office address).
export type ContactData = {
  other_meta: string | null
  other_meta_ar: string | null
  banner_section: Visible &
    Titled & {
      sub_title: string
      sub_title_ar: string
      media: HomeMedia
    }
  contact_detail_section: Visible &
    Titled & {
      description: string
      description_ar: string
      items: (Titled & {
        key: 'phone' | 'email' | 'office'
        description: string
        description_ar: string
        value: string
        value_ar: string
        media: HomeMedia
      })[]
    }
  social_section: Visible &
    Titled & {
      list: { id: number; link: string; media: HomeMedia }[]
    }
  form_section: Visible & Titled
  map_section: Visible & { url: string }
}
