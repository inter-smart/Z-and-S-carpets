import type { HomeData, HomeMedia } from './home'

// `is_enabled: false` = hidden by an admin (don't render at all)
type Visible = { is_visible: boolean; is_enabled?: boolean }
type Titled = { title: string; title_ar: string }
type Described = { description: string; description_ar: string }

// /api/frontend/about — same conventions as the home API (both languages per field,
// `is_visible` on every section, sanitized rich text for descriptions).
export type AboutData = {
  other_meta: string | null
  other_meta_ar: string | null
  banner_section: Visible &
    Titled & {
      sub_title: string
      sub_title_ar: string
      media: HomeMedia
    }
  introduction_section: Visible &
    Titled &
    Described & {
      trust_title: string
      trust_title_ar: string
      trust_description: string
      trust_description_ar: string
      trust_button: { text: string; text_ar: string; link: string } | null
      media: HomeMedia
      mission: Titled & Described
      vision: Titled & Described
      stats: {
        id: number
        value: string
        value_ar: string
        label: string
        label_ar: string
      }[]
    }
  history_section: Visible &
    Titled & {
      list: (Titled & Described & { id: number; year: string })[]
    }
  messages_section: Visible &
    Titled & {
      sub_title: string
      sub_title_ar: string
      list: {
        id: number
        quotes: string
        quotes_ar: string
        name: string
        name_ar: string
        designation: string
        designation_ar: string
        organization: string
        organization_ar: string
        media: HomeMedia
      }[]
    }
  core_value_section: Visible &
    Titled &
    Described & {
      media: HomeMedia
      list: (Titled & { id: number; media: HomeMedia })[]
    }
  industry_section: Visible &
    Titled &
    Described & {
      media: HomeMedia
      list: (Titled & Described & { id: number; media: HomeMedia })[]
    }
  how_it_works_section: HomeData['how_it_works_section']
  features_section: HomeData['features_section']
  side_section: HomeData['side_section']
}
