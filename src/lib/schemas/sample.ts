import { z } from 'zod'

// Same limits as the server (sampleRequestRequest.js) and the contact form
const PHONE_PATTERN = /^[0-9\s\-()+]{7,20}$/

// `t` returns the message for a `Common.GetASample.validation.<key>` translation, so the
// messages follow the active locale (en / ar).
export function createSampleSchema(t: (key: string) => string) {
  return z.object({
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
    category: z.string().min(1, t('categoryRequired')),
    product: z.string().min(1, t('productRequired')),
  })
}

export type SampleFormValues = z.infer<ReturnType<typeof createSampleSchema>>
