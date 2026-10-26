import type { QuoteCartItem } from '@/types/quote'

export const QUOTE_CART_KEY = 'quote-cart-items'
export const MAX_QUANTITY = 999
// Sliding expiry: reset whenever the cart contents change.
export const QUOTE_CART_TTL_MS = 3 * 24 * 60 * 60 * 1000

const STORAGE_VERSION = 1

type StoredCart = {
  v: number
  items: QuoteCartItem[]
  expiresAt: number
}

const isNullableString = (value: unknown) =>
  value === null || typeof value === 'string'

const toValidItem = (value: unknown): QuoteCartItem | null => {
  if (!value || typeof value !== 'object') return null
  const item = value as Record<string, unknown>

  if (
    typeof item.lineId !== 'string' ||
    typeof item.productId !== 'number' ||
    typeof item.productSlug !== 'string' ||
    typeof item.productTitle !== 'string' ||
    typeof item.quantity !== 'number' ||
    !Number.isFinite(item.quantity)
  ) {
    return null
  }

  return {
    lineId: item.lineId,
    productId: item.productId,
    productSlug: item.productSlug,
    productTitle: item.productTitle,
    productTitleAr:
      typeof item.productTitleAr === 'string' ? item.productTitleAr : '',
    variantId: typeof item.variantId === 'number' ? item.variantId : null,
    variantLabel: isNullableString(item.variantLabel)
      ? (item.variantLabel as string | null)
      : null,
    variantLabelAr: isNullableString(item.variantLabelAr)
      ? (item.variantLabelAr as string | null)
      : null,
    variantSku: isNullableString(item.variantSku)
      ? (item.variantSku as string | null)
      : null,
    media: isNullableString(item.media) ? (item.media as string | null) : null,
    quantity: Math.min(MAX_QUANTITY, Math.max(1, Math.round(item.quantity))),
  }
}

const toValidItems = (value: unknown): QuoteCartItem[] =>
  Array.isArray(value)
    ? value.flatMap((entry) => {
        const item = toValidItem(entry)
        return item ? [item] : []
      })
    : []

export const itemsEqual = (a: QuoteCartItem[], b: QuoteCartItem[]) =>
  JSON.stringify(a) === JSON.stringify(b)

type ReadResult = {
  items: QuoteCartItem[]
  // null when nothing is stored, or when it is in a legacy format.
  stored: StoredCart | null
}

const readRaw = (): ReadResult => {
  const raw = localStorage.getItem(QUOTE_CART_KEY)
  if (!raw) return { items: [], stored: null }

  const parsed: unknown = JSON.parse(raw)

  // Legacy format (plain array, no expiry): keep the items. The next write
  // upgrades it to the versioned format with an expiry.
  if (Array.isArray(parsed))
    return { items: toValidItems(parsed), stored: null }

  if (parsed && typeof parsed === 'object') {
    const candidate = parsed as Partial<StoredCart>
    if (
      Array.isArray(candidate.items) &&
      typeof candidate.expiresAt === 'number'
    ) {
      if (Date.now() > candidate.expiresAt) {
        localStorage.removeItem(QUOTE_CART_KEY)
        return { items: [], stored: null }
      }
      const items = toValidItems(candidate.items)
      return {
        items,
        stored: {
          v: typeof candidate.v === 'number' ? candidate.v : STORAGE_VERSION,
          items,
          expiresAt: candidate.expiresAt,
        },
      }
    }
  }

  return { items: [], stored: null }
}

// Cart items from storage; an expired cart is removed and reads as empty.
export const readStoredItems = (): QuoteCartItem[] => {
  try {
    return readRaw().items
  } catch {
    return []
  }
}

// True when a stored cart exists but its expiry has passed (does not remove it).
export const isStoredCartExpired = (): boolean => {
  try {
    const raw = localStorage.getItem(QUOTE_CART_KEY)
    if (!raw) return false
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return false
    }
    const { expiresAt } = parsed as Partial<StoredCart>
    return typeof expiresAt === 'number' && Date.now() > expiresAt
  } catch {
    return false
  }
}

// When the stored cart expires, or null if there is no (valid) stored cart.
export const readStoredExpiry = (): number | null => {
  try {
    return readRaw().stored?.expiresAt ?? null
  } catch {
    return null
  }
}

export const writeStoredItems = (items: QuoteCartItem[]) => {
  try {
    if (items.length === 0) {
      localStorage.removeItem(QUOTE_CART_KEY)
      return
    }

    // Unchanged contents must not extend the expiry (e.g. on page load, or
    // when the items were just synced from another tab).
    let stored: StoredCart | null = null
    try {
      stored = readRaw().stored
    } catch {
      // corrupt JSON in storage: overwrite it below
    }
    if (stored && itemsEqual(stored.items, items)) return

    const next: StoredCart = {
      v: STORAGE_VERSION,
      items,
      expiresAt: Date.now() + QUOTE_CART_TTL_MS,
    }
    localStorage.setItem(QUOTE_CART_KEY, JSON.stringify(next))
  } catch {
    // localStorage unavailable (private mode, etc.) - the cart just won't persist
  }
}
