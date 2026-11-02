import { z } from 'zod'
import { companyField, nameField } from './text-rules'

// Same limits as the server (downloadRequestRequest.js) and the other forms
const PHONE_PATTERN = /^[0-9\s\-()+]{7,20}$/

// `t` returns the message for a `DownloadsPage.CardSection.downloadFormDialog.validation.<key>`
// translation, so the messages follow the active locale (en / ar).
export function createDownloadRequestSchema(t: (key: string) => string) {
  return z.object({
    name: nameField(t),
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
    company_name: companyField(t),
  })
}

export type DownloadRequestFormValues = z.infer<
  ReturnType<typeof createDownloadRequestSchema>
>
