'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type GetASampleContextType = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const GetASampleContext = createContext<GetASampleContextType | null>(null)

export function GetASampleProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <GetASampleContext.Provider value={{ open, setOpen }}>
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
