export type HomeMedia = { path: string | null; alt: string; alt_ar: string }

type Visible = { is_visible: boolean }
type Titled = { title: string; title_ar: string }
type Described = { description: string; description_ar: string }

export type HomeData = {
  other_meta?: string | null
  other_meta_ar?: string | null
  banner_section: Visible & {
    list: (Titled &
      Described & {
        id: number
        media: HomeMedia & { type: string }
        thumbnail: HomeMedia
        industry: Titled & { id: number; slug: string; link: string }
      })[]
  }
  milestones_section: Visible & {
    list: {
      id: number
      value: string
      value_ar: string
      label: string
      label_ar: string
      media: HomeMedia
    }[]
  }
  discover_section: Visible &
    Titled & {
      list: (Titled & {
        id: number
        slug: string
        link: string
        media: HomeMedia
      })[]
    }
  industries_section: Visible & {
    list: (Titled &
      Described & {
        id: number
        slug: string
        link: string
        categories: (Titled & { id: number; slug: string; media: HomeMedia })[]
      })[]
  }
  testimonials_section: Visible &
    Titled & {
      list: {
        id: number
        name: string
        name_ar: string
        designation: string
        designation_ar: string
        message: string
        message_ar: string
        profile: HomeMedia
      }[]
    }
  brands_section: Visible &
    Titled & { list: { id: number; media: HomeMedia }[] }
  faqs_section: Visible &
    Titled & {
      list: {
        id: number
        question: string
        question_ar: string
        answer: string
        answer_ar: string
      }[]
    }
  side_images_section: Visible & {
    list: { id: number; before: HomeMedia; after: HomeMedia }[]
  }
  premium_section: Visible & Titled & Described
  features_section: Visible &
    Titled & { list: (Titled & Described & { id: number })[] }
  side_section: Visible &
    Titled &
    Described & {
      button: { text: string; text_ar: string; link: string }
    }
  how_it_works_section: Visible &
    Titled & { list: (Titled & Described & { id: number })[] }
  residential_section: Visible &
    Titled & {
      list: (Titled & {
        id: number
        slug: string
        short_description: string
        short_description_ar: string
        price: string | null
        media: HomeMedia
        badge: (Titled & { id: number; slug: string }) | null
      })[]
    }
  cta_section: Visible & Titled & Described & { media: HomeMedia }
}
