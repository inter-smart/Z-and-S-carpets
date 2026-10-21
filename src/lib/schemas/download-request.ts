import { z } from 'zod'

// Same limits as the server (downloadRequestRequest.js) and the other forms
const PHONE_PATTERN = /^[0-9\s\-()+]{7,20}$/

// `t` returns the message for a `DownloadsPage.CardSection.downloadFormDialog.validation.<key>`
// translation, so the messages follow the active locale (en / ar).
export function createDownloadRequestSchema(t: (key: string) => string) {
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
  })
}

export type DownloadRequestFormValues = z.infer<
  ReturnType<typeof createDownloadRequestSchema>
>
