import type { LocaleType } from '@/i18n/types'
import type { ProductDetailVariant } from '@/types/product-detail'

const SLUG = /^[a-z0-9-]+$/i
const MAX_PAIRS = 10

export const pickLocalized = (
  locale: LocaleType,
  en?: string | null,
  ar?: string | null,
) => (locale === 'ar' ? ar || en || '' : en || '')

// `?attrs=size:small,color:oak` -> { size: 'small', color: 'oak' } (plain slugs only)
export function parseAttrsParam(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value
  const chosen: Record<string, string> = {}
  for (const pair of (raw ?? '').split(',').slice(0, MAX_PAIRS)) {
    const [attribute, option, ...rest] = pair.trim().split(':')
    if (rest.length || !SLUG.test(attribute ?? '') || !SLUG.test(option ?? ''))
      continue
    if (!(attribute in chosen)) chosen[attribute] = option
  }
  return chosen
}

export const buildAttrsParam = (chosen: Record<string, string>) =>
  Object.entries(chosen)
    .map(([attribute, option]) => `${attribute}:${option}`)
    .join(',')

// The variant sharing the most chosen values (the first one wins a tie / no choice). Same rule as
// the API, so a combination that does not exist lands on the closest variant.
export function pickVariant(
  variants: ProductDetailVariant[],
  chosen: Record<string, string>,
) {
  let best: ProductDetailVariant | null = variants[0] ?? null
  let bestScore = -1
  for (const variant of variants) {
    const score = Object.entries(chosen).filter(
      ([attribute, option]) => variant.values[attribute] === option,
    ).length
    if (score > bestScore) {
      best = variant
      bestScore = score
    }
  }
  return best
}

// Whether `option` of `attribute` exists in a variant that also has the other chosen values
export const isCombinationAvailable = (
  variants: ProductDetailVariant[],
  chosen: Record<string, string>,
  attribute: string,
  option: string,
) =>
  variants.some(
    (variant) =>
      variant.values[attribute] === option &&
      Object.entries(chosen).every(
        ([other, value]) =>
          other === attribute || variant.values[other] === value,
      ),
  )

// wa.me link with a ready-to-send message
export function buildWhatsappLink(number: string, message: string) {
  const digits = number.replace(/[^\d]/g, '')
  return digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : ''
}
