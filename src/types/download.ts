import type { HomeMedia } from '@/types/home'

type Visible = { is_visible: boolean }

export type DownloadItem = {
  id: number
  title: string
  title_ar: string
  description: string
  description_ar: string
  file: { url: string | null; filename: string; size_bytes: number | null }
}

// /api/frontend/downloads
export type DownloadsPageData = {
  other_meta: string | null
  other_meta_ar: string | null
  banner_section: {
    title: string
    title_ar: string
    sub_title: string
    sub_title_ar: string
    media: HomeMedia
  } & Visible
  downloads: DownloadItem[]
}
