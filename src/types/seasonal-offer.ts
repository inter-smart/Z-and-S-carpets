export type SeasonalOfferData = {
  is_visible: boolean
  auto_show_delay_seconds: number | null
  media: { path: string | null }
  badge: { path: string | null }
  button_text: string
  button_text_ar: string
  button_link: string
}
