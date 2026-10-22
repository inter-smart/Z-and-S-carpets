'use client'

import type { SeasonalOfferData } from '@/types/seasonal-offer'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

const DISMISSED_KEY = 'seasonal-offer-dismissed'

type SeasonalOfferContextType = {
  open: boolean
  data: SeasonalOfferData | undefined
  close: () => void
}

const SeasonalOfferContext = createContext<SeasonalOfferContextType | null>(
  null,
)

export function SeasonalOfferProvider({
  data,
  children,
}: {
  data: SeasonalOfferData | undefined
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!data?.is_visible) return
    if (!data.auto_show_delay_seconds || data.auto_show_delay_seconds <= 0) return

    let dismissed = false
    try {
      dismissed = sessionStorage.getItem(DISMISSED_KEY) === '1'
    } catch {
      // sessionStorage unavailable (private mode, etc.) — fall back to always showing
    }
    if (dismissed) return

    const timer = setTimeout(() => {
      setOpen(true)
    }, data.auto_show_delay_seconds * 1000)

    return () => clearTimeout(timer)
    // only ever schedule once per full page load, not on every client-side navigation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const close = () => {
    setOpen(false)
    try {
      sessionStorage.setItem(DISMISSED_KEY, '1')
    } catch {
      // ignore
    }
  }

  return (
    <SeasonalOfferContext.Provider value={{ open, data, close }}>
      {children}
    </SeasonalOfferContext.Provider>
  )
}

export function useSeasonalOffer() {
  const context = useContext(SeasonalOfferContext)

  if (!context) {
    throw new Error('useSeasonalOffer must be used inside SeasonalOfferProvider')
  }

  return context
}
