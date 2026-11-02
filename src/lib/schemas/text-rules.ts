import { z } from 'zod'

// Shared client-side text rules for every lead form (quote, cart quote, contact, sample,
// download). Free-text fields reject script / code / SQL-like input.

export const NAME_MIN = 2
export const NAME_MAX = 100
export const COMPANY_MAX = 100
export const MESSAGE_MAX = 2000

// Unicode letters (English + Arabic), spaces and . ' - only
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u
// Letters, digits, spaces and & . , ' - ( ) /
const COMPANY_PATTERN = /^[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N}\s&.,'’()/-]*$/u
// Symbols that only show up in code / markup / shell / SQL
const FORBIDDEN_CHARS = /[<>{}[\]\\`$|;^~]/
// Injection patterns that can be typed with otherwise allowed characters
const INJECTION_PATTERNS: RegExp[] = [
  /--/,
  /\/\*|\*\//,
  /javascript\s*:/i,
  /\bon[a-z]+\s*=/i,
  /\b(union\s+(all\s+)?select|drop\s+(table|database)|insert\s+into|delete\s+from|update\s+\w+\s+set|truncate\s+table|alter\s+table|exec(ute)?\s*\()/i,
  /\b(eval|alert|prompt|confirm|require|import)\s*\(/i,
]

export function isSafeText(value: string): boolean {
  if (FORBIDDEN_CHARS.test(value)) return false
  return !INJECTION_PATTERNS.some((pattern) => pattern.test(value))
}

// `t` resolves keys inside the form's own `validation` namespace
type T = (key: string) => string

export function nameField(t: T) {
  return z
    .string()
    .trim()
    .min(1, t('nameRequired'))
    .min(NAME_MIN, t('nameMin'))
    .max(NAME_MAX, t('nameMax'))
    .regex(NAME_PATTERN, t('nameInvalid'))
}

export function companyField(t: T) {
  return z
    .string()
    .trim()
    .max(COMPANY_MAX, t('companyMax'))
    .refine((v) => v === '' || COMPANY_PATTERN.test(v), t('companyInvalid'))
}

// Optional free text (quote message)
export function messageField(t: T) {
  return z
    .string()
    .trim()
    .max(MESSAGE_MAX, t('messageMax'))
    .refine(isSafeText, t('messageInvalid'))
    .optional()
}

// Required free text (contact requirements)
export function requirementsField(t: T) {
  return z
    .string()
    .trim()
    .min(1, t('requirementsRequired'))
    .min(NAME_MIN, t('requirementsMin'))
    .max(MESSAGE_MAX, t('requirementsMax'))
    .refine(isSafeText, t('requirementsInvalid'))
}
