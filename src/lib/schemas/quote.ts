import { z } from 'zod'

// Same limits as the server (quoteRequestRequest.js) and the other lead forms.
const PHONE_PATTERN = /^[0-9\s\-()+]{7,20}$/

// Contact fields shared by both the /quotes/form flat form and the
// cart-preview dialog. `t` returns the message for a
// `QuotesPage.Form.validation.<key>` translation.
function contactFields(t: (key: string) => string) {
  return {
    name: z
      .string()
      .trim()
      .min(1, t('nameRequired'))
      .min(4, t('nameMin'))
      .max(100, t('nameMax')),
    phone: z
      .string()
      .trim()
      .min(1, t('phoneRequired'))
      .regex(PHONE_PATTERN, t('phoneInvalid')),
    email: z
      .string()
      .trim()
      .min(1, t('emailRequired'))
      .email(t('emailInvalid')),
    company_name: z.string().trim().max(100, t('companyMax')),
    message: z.string().trim().max(2000, t('messageMax')).optional(),
  }
}

// The flat form (/quotes/form) also picks a category/product via dropdowns.
export function createQuoteSchema(t: (key: string) => string) {
  return z.object({
    ...contactFields(t),
    category: z.string().min(1, t('categoryRequired')),
    product: z.string().min(1, t('productRequired')),
  })
}

export type QuoteFormValues = z.infer<ReturnType<typeof createQuoteSchema>>

// The cart-preview dialog only needs the contact fields - the products are
// already chosen (they're the cart items), no dropdown needed.
export function createQuoteCartSchema(t: (key: string) => string) {
  return z.object(contactFields(t))
}

export type QuoteCartFormValues = z.infer<
  ReturnType<typeof createQuoteCartSchema>
>
