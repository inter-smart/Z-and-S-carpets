import type { HomeMedia } from './home'

type Visible = { is_visible: boolean }
type Titled = { title: string; title_ar: string }
type Described = { description: string; description_ar: string }

// /api/frontend/services — same conventions as the home / about APIs (both languages per field,
// `is_visible` on every section, sanitized rich text for titles and descriptions).
export type ServicesData = {
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
      items: (Titled & { id: number; slug: string })[]
    }
  service_section: Visible &
    Titled & {
      list: (Titled & Described & { id: number })[]
    }
  process_steps_section: Visible &
    Titled & {
      bg_title: string
      bg_title_ar: string
      list: (Titled & Described & { id: number; media: HomeMedia })[]
    }
}
