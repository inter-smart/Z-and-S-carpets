'use client'

import type { QuoteCartItem } from '@/types/quote'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const QUOTE_CART_KEY = 'quote-cart-items'
const MAX_QUANTITY = 999

const dedupeKey = (productId: number, variantId: number | null) =>
  `${productId}:${variantId ?? 'none'}`

const readStoredItems = (): QuoteCartItem[] => {
  try {
    const raw = localStorage.getItem(QUOTE_CART_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const writeStoredItems = (items: QuoteCartItem[]) => {
  try {
    localStorage.setItem(QUOTE_CART_KEY, JSON.stringify(items))
  } catch {
    // localStorage unavailable (private mode, etc.) - the cart just won't persist
  }
}

type QuoteCartContextType = {
  items: QuoteCartItem[]
  count: number
  addItem: (item: Omit<QuoteCartItem, 'lineId'>) => void
  removeItem: (lineId: string) => void
  updateQuantity: (lineId: string, quantity: number) => void
  clear: () => void
}

const QuoteCartContext = createContext<QuoteCartContextType | null>(null)

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteCartItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // localStorage isn't available during SSR; load once on mount, after the
  // server-rendered (empty) markup has already hydrated.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration restore, not a sync loop
    setItems(readStoredItems())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    writeStoredItems(items)
  }, [items, hydrated])

  const addItem = useCallback((item: Omit<QuoteCartItem, 'lineId'>) => {
    setItems((current) => {
      const key = dedupeKey(item.productId, item.variantId)
      const existingIndex = current.findIndex(
        (existing) => dedupeKey(existing.productId, existing.variantId) === key,
      )

      if (existingIndex >= 0) {
        return current.map((existing, index) =>
          index === existingIndex
            ? {
                ...existing,
                quantity: Math.min(
                  MAX_QUANTITY,
                  existing.quantity + item.quantity,
                ),
              }
            : existing,
        )
      }

      return [
        ...current,
        {
          ...item,
          quantity: Math.min(MAX_QUANTITY, Math.max(1, item.quantity)),
          lineId:
            typeof crypto !== 'undefined' && crypto.randomUUID
              ? crypto.randomUUID()
              : `${key}-${Date.now()}`,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((lineId: string) => {
    setItems((current) => current.filter((item) => item.lineId !== lineId))
  }, [])

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    setItems((current) =>
      current.map((item) =>
        item.lineId === lineId
          ? { ...item, quantity: Math.min(MAX_QUANTITY, Math.max(1, quantity)) }
          : item,
      ),
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const count = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const value = useMemo(
    () => ({ items, count, addItem, removeItem, updateQuantity, clear }),
    [items, count, addItem, removeItem, updateQuantity, clear],
  )

  return (
    <QuoteCartContext.Provider value={value}>
      {children}
    </QuoteCartContext.Provider>
  )
}

export function useQuoteCart() {
  const context = useContext(QuoteCartContext)

  if (!context) {
    throw new Error('useQuoteCart must be used inside QuoteCartProvider')
  }

  return context
}
