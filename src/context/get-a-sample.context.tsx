'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

// Optional selection to start the form with (slugs), e.g. from a product page
export type GetASamplePreset = { category?: string; product?: string }

type GetASampleContextType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  preset: GetASamplePreset | null
  // open the form from anywhere, optionally with a category / product already chosen
  openGetASample: (preset?: GetASamplePreset) => void
}

const GetASampleContext = createContext<GetASampleContextType | null>(null)

export function GetASampleProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [preset, setPreset] = useState<GetASamplePreset | null>(null)

  const openGetASample = useCallback((next?: GetASamplePreset) => {
    setPreset(next ?? null)
    setOpen(true)
  }, [])

  const value = useMemo(
    () => ({ open, setOpen, preset, openGetASample }),
    [open, preset, openGetASample],
  )

  return (
    <GetASampleContext.Provider value={value}>
      {children}
    </GetASampleContext.Provider>
  )
}

export function useGetASample() {
  const context = useContext(GetASampleContext)

  if (!context) {
    throw new Error('useGetASample must be used inside GetASampleProvider')
  }

  return context
}
