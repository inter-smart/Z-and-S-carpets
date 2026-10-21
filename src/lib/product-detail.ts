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

// Auto-fills attributes that have no real alternative given what's already chosen: if exactly one
// value of an unpicked attribute still appears on a variant matching the current choices, that
// value is picked too. Runs until nothing more can be resolved this way (picking one attribute can
// narrow another the same way, e.g. Colour -> Size -> Material). Never guesses between two or more
// still-possible values. Mirrors `narrowChosen` in the server's ProductsService.js exactly, so the
// swatches a visitor sees selected client-side always agree with what the server would resolve —
// this is what makes it safe to compute every click locally instead of asking the server.
export function narrowChosen(
  variants: ProductDetailVariant[],
  attributeSlugs: string[],
  initialChosen: Record<string, string>,
) {
  const chosen = { ...initialChosen }
  const matches = (variant: ProductDetailVariant) =>
    Object.entries(chosen).every(([slug, value]) => variant.values[slug] === value)

  let changed = true
  while (changed) {
    changed = false
    for (const slug of attributeSlugs) {
      if (chosen[slug]) continue
      const possible = new Set(
        variants.filter(matches).map((variant) => variant.values[slug]).filter(Boolean),
      )
      if (possible.size === 1) {
        chosen[slug] = [...possible][0]
        changed = true
      }
    }
  }
  return chosen
}

// "Color, Material and Size" / "اللون والخامة والمقاس" — locale-aware, used for both the
// selection-cleared notice and the "please choose ..." prompt
export const formatList = (items: string[], locale: LocaleType) =>
  new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(items)

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
