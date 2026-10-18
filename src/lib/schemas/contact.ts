import { z } from 'zod'

// Same limits as the server (contactEnquiryRequest.js + the upload middleware)
export const CONTACT_FILE_MAX_BYTES = 5 * 1024 * 1024
export const CONTACT_FILE_ACCEPT = '.pdf,.doc,.docx'
const FILE_NAME_PATTERN = /\.(pdf|docx?)$/i
const PHONE_PATTERN = /^[0-9\s\-()+]{7,20}$/

// `t` returns the message for a `getInTouch.validation.<key>` translation, so the messages
// follow the active locale (en / ar).
export function createContactSchema(t: (key: string) => string) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(1, t('nameRequired'))
      .min(4, t('nameMin'))
      .max(100, t('nameMax')),
    email: z
      .string()
      .trim()
      .min(1, t('emailRequired'))
      .email(t('emailInvalid')),
    phone: z
      .string()
      .trim()
      .min(1, t('phoneRequired'))
      .regex(PHONE_PATTERN, t('phoneInvalid')),
    requirements: z
      .string()
      .trim()
      .min(1, t('requirementsRequired'))
      .max(2000, t('requirementsMax')),
    // optional attachment: PDF / DOC / DOCX, up to 5MB
    file: z
      .custom<File | null>()
      .nullable()
      .superRefine((file, ctx) => {
        if (!file) return
        if (!FILE_NAME_PATTERN.test(file.name)) {
          ctx.addIssue({ code: 'custom', message: t('fileInvalid') })
        } else if (file.size > CONTACT_FILE_MAX_BYTES) {
          ctx.addIssue({ code: 'custom', message: t('fileTooLarge') })
        }
      }),
  })
}

export type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>
