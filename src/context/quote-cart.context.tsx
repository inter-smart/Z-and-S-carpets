'use client'

import {
  MAX_QUANTITY,
  QUOTE_CART_KEY,
  isStoredCartExpired,
  itemsEqual,
  readStoredExpiry,
  readStoredItems,
  writeStoredItems,
} from '@/lib/quote-cart-storage'
import type { QuoteCartItem } from '@/types/quote'
import { useTranslations } from 'next-intl'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { toast } from 'sonner'

const EXPIRED_TOAST_ID = 'quote-cart-expired'

const dedupeKey = (productId: number, variantId: number | null) =>
  `${productId}:${variantId ?? 'none'}`

// setTimeout stores its delay as a signed 32-bit int; larger values fire at once.
const MAX_TIMEOUT_MS = 2 ** 31 - 1
// Small buffer so the timer never fires just before the stored expiry.
const EXPIRY_GRACE_MS = 100

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
  const itemsRef = useRef<QuoteCartItem[]>([])
  const t = useTranslations('QuotesPage')

  // localStorage isn't available during SSR; load once on mount, after the
  // server-rendered (empty) markup has already hydrated.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration restore, not a sync loop
    setItems(readStoredItems())
    setHydrated(true)
  }, [])

  useEffect(() => {
    itemsRef.current = items
  }, [items])

  useEffect(() => {
    if (!hydrated) return
    writeStoredItems(items)
  }, [items, hydrated])

  // Re-read storage and adopt it if it differs (expired, or changed by another
  // tab). Keeps the same array when nothing changed, so there is no re-render.
  const syncFromStorage = useCallback(() => {
    // Checked before reading, because reading removes an expired cart.
    const expired = isStoredCartExpired()
    const stored = readStoredItems()

    if (expired && itemsRef.current.length > 0) {
      toast.info(t('expiredNotice'), { id: EXPIRED_TOAST_ID })
    }
    setItems((current) => (itemsEqual(current, stored) ? current : stored))
  }, [t])

  // Expire the cart while the page stays mounted. Declared after the write
  // effect so storage already holds the fresh expiry when this runs.
  useEffect(() => {
    if (!hydrated || items.length === 0) return
    const expiresAt = readStoredExpiry()
    if (expiresAt === null) return

    const delay = Math.min(
      Math.max(0, expiresAt - Date.now()) + EXPIRY_GRACE_MS,
      MAX_TIMEOUT_MS,
    )
    const timer = setTimeout(syncFromStorage, delay)
    return () => clearTimeout(timer)
  }, [items, hydrated, syncFromStorage])

  // Timers are throttled in background tabs, so also re-check when the tab
  // becomes visible/focused, and follow changes made in other tabs.
  useEffect(() => {
    if (!hydrated) return

    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === QUOTE_CART_KEY) syncFromStorage()
    }
    const onVisibility = () => {
      if (document.visibilityState === 'visible') syncFromStorage()
    }

    window.addEventListener('storage', onStorage)
    window.addEventListener('focus', syncFromStorage)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('focus', syncFromStorage)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [hydrated, syncFromStorage])

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
