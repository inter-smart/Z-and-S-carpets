'use client'

import type { DownloadItem } from '@/types/download'
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

// Either a download picked from the Downloads page list (sends download_id), or a product's
// datasheet request (sends a product slug). Products no longer carry their own uploaded file —
// this is lead capture only, same as the download_id path: the file is sent to the requester by
// hand, never auto-attached.
export type DownloadRequestSubject =
  | { kind: 'download'; download: DownloadItem }
  | { kind: 'product'; product: string }

type DownloadRequestContextType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  subject: DownloadRequestSubject | null
  // open the form from anywhere, with the download/product this request is for
  openDownloadRequest: (subject: DownloadRequestSubject) => void
}

const DownloadRequestContext = createContext<DownloadRequestContextType | null>(
  null,
)

export function DownloadRequestProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [subject, setSubject] = useState<DownloadRequestSubject | null>(null)

  const openDownloadRequest = useCallback((next: DownloadRequestSubject) => {
    setSubject(next)
    setOpen(true)
  }, [])

  const value = useMemo(
    () => ({ open, setOpen, subject, openDownloadRequest }),
    [open, subject, openDownloadRequest],
  )

  return (
    <DownloadRequestContext.Provider value={value}>
      {children}
    </DownloadRequestContext.Provider>
  )
}

export function useDownloadRequest() {
  const context = useContext(DownloadRequestContext)

  if (!context) {
    throw new Error(
      'useDownloadRequest must be used inside DownloadRequestProvider',
    )
  }

  return context
}
