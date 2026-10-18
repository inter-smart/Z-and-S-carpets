'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { OurIcon } from '@/components/ui/icon'
import type { LocaleType } from '@/i18n/types'
import {
  CONTACT_FILE_ACCEPT,
  createContactSchema,
  type ContactFormValues,
} from '@/lib/schemas/contact'
import type { ContactData } from '@/types/contact'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { CloudCheckIcon, Loader2Icon, XIcon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const inputClass =
  'w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20'
const invalidClass = 'border-red-300/70 focus:border-red-300'

interface GetInTouchSectionProps {
  // form heading from the CMS; the translation is the fallback
  title?: ContactData['form_section']
}

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-300">
      {message}
    </p>
  ) : null

export default function GetInTouchSection({ title }: GetInTouchSectionProps) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('ContactPage.getInTouch')

  const formField = t.raw('fields') as string[]
  const formTitle =
    (title &&
      (locale === 'ar' ? title.title_ar || title.title : title.title)) ||
    t('formTitle')

  // validation messages follow the locale (en / ar)
  const schema = useMemo(
    () => createContactSchema((key) => t(`validation.${key}`)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale],
  )

  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    // validate while typing, not only on submit
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      requirements: '',
      file: null,
    },
  })

  const [submitError, setSubmitError] = useState('')
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false)

  const onSubmit = async (values: ContactFormValues) => {
    setSubmitError('')

    const body = new FormData()
    body.append('name', values.name)
    body.append('email', values.email)
    body.append('phone', values.phone)
    body.append('requirements', values.requirements)
    if (values.file) body.append('file', values.file)

    try {
      const res = await fetch(`/api/contact-enquiry?lang=${locale}`, {
        method: 'POST',
        body,
      })

      if (res.ok) {
        reset()
        setOpenSuccessDialog(true)
        return
      }

      // the server answers in the same language: show its messages next to the right field
      const result = (await res.json().catch(() => ({}))) as {
        error_code?: string
        message?: string
        errors?: { field: string; message: string }[]
      }

      const fieldErrors = (result.errors ?? []).filter((item) =>
        (['name', 'email', 'phone', 'requirements', 'file'] as const).includes(
          item.field as keyof ContactFormValues,
        ),
      )
      fieldErrors.forEach((item) =>
        setError(item.field as keyof ContactFormValues, {
          message: item.message,
        }),
      )

      if (result.error_code === 'ALREADY_SUBMITTED') {
        setError('email', {
          message: result.message || t('errors.alreadySubmitted'),
        })
      } else if (fieldErrors.length === 0) {
        setSubmitError(t('errors.generic'))
      }
    } catch {
      setSubmitError(t('errors.generic'))
    }
  }

  return (
    <>
      <section>
        <form
          noValidate
          className="mt-14 h-fit rounded-md bg-[#023260] px-8 py-18 text-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="our-heading text-8xl!">{formTitle}</h2>
          <div className="mt-8 space-y-3">
            <div>
              <input
                {...register('name')}
                autoComplete="name"
                aria-label={formField[0]}
                aria-invalid={!!errors.name}
                aria-describedby="contact-name-error"
                placeholder={`${formField[0]}*`}
                className={cn(inputClass, errors.name && invalidClass)}
              />
              <FieldError
                id="contact-name-error"
                message={errors.name?.message}
              />
            </div>
            <div>
              <input
                {...register('email')}
                type="email"
                dir="ltr"
                autoComplete="email"
                aria-label={formField[1]}
                aria-invalid={!!errors.email}
                aria-describedby="contact-email-error"
                placeholder={`${formField[1]}*`}
                className={cn(inputClass, errors.email && invalidClass)}
              />
              <FieldError
                id="contact-email-error"
                message={errors.email?.message}
              />
            </div>
            <div>
              <input
                {...register('phone')}
                type="tel"
                dir="ltr"
                autoComplete="tel"
                aria-label={formField[2]}
                aria-invalid={!!errors.phone}
                aria-describedby="contact-phone-error"
                placeholder={`${formField[2]}*`}
                className={cn(inputClass, errors.phone && invalidClass)}
              />
              <FieldError
                id="contact-phone-error"
                message={errors.phone?.message}
              />
            </div>
            <div>
              <textarea
                {...register('requirements')}
                rows={3}
                aria-label={formField[3]}
                aria-invalid={!!errors.requirements}
                aria-describedby="contact-requirements-error"
                placeholder={`${formField[3]}*`}
                className={cn(
                  inputClass,
                  'resize-none',
                  errors.requirements && invalidClass,
                )}
              />
              <FieldError
                id="contact-requirements-error"
                message={errors.requirements?.message}
              />
            </div>
            <div>
              <Controller
                control={control}
                name="file"
                render={({ field }) => (
                  <>
                    <label
                      className={cn(
                        'flex h-30 cursor-pointer flex-col items-center justify-center rounded-sm border-2 border-dashed border-white/10 text-[10px] text-white/80 hover:border-white/20',
                        errors.file && 'border-red-300/70',
                      )}
                    >
                      <OurIcon
                        name="cloud-upload"
                        className="size-7 opacity-50"
                      />
                      <span className="px-3 text-center text-sm font-light break-all">
                        {field.value?.name || t('upload')}
                      </span>
                      <span className="mt-1 text-xs font-light text-white/50">
                        {t('uploadHint')}
                      </span>
                      <input
                        type="file"
                        accept={CONTACT_FILE_ACCEPT}
                        className="sr-only"
                        aria-invalid={!!errors.file}
                        aria-describedby="contact-file-error"
                        onBlur={field.onBlur}
                        onChange={(event) => {
                          field.onChange(event.target.files?.[0] ?? null)
                          // allow picking the same file again after removing it
                          event.target.value = ''
                        }}
                      />
                    </label>
                    {field.value && (
                      <button
                        type="button"
                        onClick={() => field.onChange(null)}
                        className="mt-2 flex items-center gap-1 text-xs text-white/70 hover:text-white"
                      >
                        <XIcon className="size-3.5" />
                        {t('removeFile')}
                      </button>
                    )}
                  </>
                )}
              />
              <FieldError
                id="contact-file-error"
                message={errors.file?.message}
              />
            </div>
          </div>
          {submitError && (
            <p role="alert" className="mt-5 text-sm text-red-300">
              {submitError}
            </p>
          )}
          <div className="mt-9 flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-our-purple our-btn"
            >
              {isSubmitting && <Loader2Icon className="animate-spin" />}
              {t('submit')}
            </Button>
          </div>
        </form>
      </section>

      {/* Success Dialog */}
      <Dialog open={openSuccessDialog} onOpenChange={setOpenSuccessDialog}>
        <DialogContent className="flex min-h-100 min-w-[35vw] flex-row items-center justify-center rounded-sm 2xl:min-w-125">
          <div className="flex flex-col items-center text-center text-black">
            <CloudCheckIcon className="text-our-blue" size={100} />
            <DialogTitle className="mt-5 text-2xl font-medium">
              {t('successDialog.title')}
            </DialogTitle>
            <DialogDescription className="our-text font-normal">
              {t('successDialog.description')}
            </DialogDescription>
            <DialogClose className="bg-our-purple mt-5 w-fit rounded-sm border p-2 px-10 text-white">
              <span className="font-medium">{t('successDialog.btnLable')}</span>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
