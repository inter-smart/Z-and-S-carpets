'use client'

import { Success_2Icon } from '@/assets/icons'
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
  createDownloadRequestSchema,
  type DownloadRequestFormValues,
} from '@/lib/schemas/download-request'
import { pickLocalized } from '@/lib/product-detail'
import type { DownloadItem } from '@/types/download'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { Loader2Icon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

const FIELDS = ['name', 'phone', 'email', 'company_name'] as const

const emptyValues: DownloadRequestFormValues = {
  name: '',
  phone: '',
  email: '',
  company_name: '',
}

const inputClass =
  'w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20'
const invalidClass = 'border-red-300/70 focus:border-red-300'

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-300">
      {message}
    </p>
  ) : null

function DownloadRequestForm({
  download,
  onSuccess,
}: {
  download: DownloadItem
  onSuccess: () => void
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('DownloadsPage.CardSection.downloadFormDialog')

  const formField = t.raw('fields') as string[]

  // validation messages follow the locale (en / ar)
  const schema = useMemo(
    () => createDownloadRequestSchema((key) => t(`validation.${key}`)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale],
  )

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<DownloadRequestFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: emptyValues,
  })

  const [submitError, setSubmitError] = useState('')

  const onSubmit = async (values: DownloadRequestFormValues) => {
    setSubmitError('')

    try {
      const res = await fetch(`/api/download-request?lang=${locale}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, download_id: download.id }),
      })

      if (res.ok) {
        onSuccess()
        return
      }

      // the server answers in the same language: show its messages next to the right field
      const result = (await res.json().catch(() => ({}))) as {
        errors?: { field: string; message: string }[]
      }
      const fieldErrors = (result.errors ?? []).filter((item) =>
        (FIELDS as readonly string[]).includes(item.field),
      )
      fieldErrors.forEach((item) =>
        setError(item.field as keyof DownloadRequestFormValues, {
          message: item.message,
        }),
      )
      if (fieldErrors.length === 0) setSubmitError(t('errors.generic'))
    } catch {
      setSubmitError(t('errors.generic'))
    }
  }

  return (
    <form
      noValidate
      className="flex w-full flex-col items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle className="our-heading mt-5 text-6xl! sm:text-7xl!">
        {t('title')}
      </DialogTitle>
      <DialogDescription className="mt-3 text-base font-normal text-white">
        {t('description')}
      </DialogDescription>
      <div className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <input
            {...register('name')}
            autoComplete="name"
            aria-label={formField[0]}
            aria-invalid={!!errors.name}
            aria-describedby="download-name-error"
            placeholder={`${formField[0]}*`}
            className={cn(inputClass, errors.name && invalidClass)}
          />
          <FieldError id="download-name-error" message={errors.name?.message} />
        </div>
        <div>
          <input
            {...register('phone')}
            type="tel"
            dir="ltr"
            autoComplete="tel"
            aria-label={formField[1]}
            aria-invalid={!!errors.phone}
            aria-describedby="download-phone-error"
            placeholder={`${formField[1]}*`}
            className={cn(inputClass, errors.phone && invalidClass)}
          />
          <FieldError
            id="download-phone-error"
            message={errors.phone?.message}
          />
        </div>
        <div>
          <input
            {...register('email')}
            type="email"
            dir="ltr"
            autoComplete="email"
            aria-label={formField[2]}
            aria-invalid={!!errors.email}
            aria-describedby="download-email-error"
            placeholder={`${formField[2]}*`}
            className={cn(inputClass, errors.email && invalidClass)}
          />
          <FieldError
            id="download-email-error"
            message={errors.email?.message}
          />
        </div>
        <div>
          <input
            {...register('company_name')}
            autoComplete="organization"
            aria-label={formField[3]}
            aria-invalid={!!errors.company_name}
            aria-describedby="download-company-error"
            placeholder={formField[3]}
            className={cn(inputClass, errors.company_name && invalidClass)}
          />
          <FieldError
            id="download-company-error"
            message={errors.company_name?.message}
          />
        </div>
      </div>
      {submitError && (
        <p role="alert" className="mt-5 text-sm text-red-300">
          {submitError}
        </p>
      )}
      <Button
        className="bg-our-purple our-btn ms-auto mt-10 w-fit border text-white"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2Icon className="animate-spin" />}
        <span className="font-medium">{t('submit')}</span>
      </Button>
    </form>
  )
}

export default function DownloadsCardSection({
  downloads,
}: {
  downloads: DownloadItem[]
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('DownloadsPage.CardSection')

  const [requestItem, setRequestItem] = useState<DownloadItem | null>(null)
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false)

  if (!downloads.length) {
    return (
      <section className="container-wrapper pt-12 pb-20">
        <p className="text-center text-base text-[#555]">{t('noItems')}</p>
      </section>
    )
  }

  return (
    <>
      <section className="container-wrapper pt-12 pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {downloads.map((item) => (
            <div
              key={item.id}
              className="border-our-blue grid grid-cols-1 gap-5 overflow-hidden rounded-md border p-8 sm:grid-cols-[1fr_auto]"
            >
              <div className="flex gap-5 sm:items-center">
                <div className="bg-our-green/10 h-fit w-fit p-4">
                  <OurIcon name="file-open" className="text-our-green size-8" />
                </div>
                <div className="flex-1 space-y-1 md:my-auto lg:my-0">
                  <p className="our-heading text-2xl leading-7 font-medium">
                    {pickLocalized(locale, item.title, item.title_ar)}
                  </p>
                  {(item.description || item.description_ar) && (
                    <p className="text-base">
                      {pickLocalized(
                        locale,
                        item.description,
                        item.description_ar,
                      )}
                    </p>
                  )}
                </div>
              </div>
              <Button
                className="our-btn bg-our-purple col-span-2 w-full px-8! sm:col-span-1 sm:my-auto sm:w-fit lg:col-span-2 lg:w-full xl:col-span-1"
                onClick={() => setRequestItem(item)}
              >
                {t('downloadBtnLable')}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Download Request Dialog — one per card, keyed by the clicked item so the form resets */}
      <Dialog
        open={!!requestItem}
        onOpenChange={(open) => !open && setRequestItem(null)}
      >
        <DialogContent className="flex min-h-100 min-w-[90vw] flex-row items-center justify-center rounded-sm bg-[#023260] p-5 text-white md:min-w-[70vw] md:p-10 lg:min-w-[60vw] lg:p-15 xl:min-w-[50vw] 2xl:min-w-180">
          {requestItem && (
            <DownloadRequestForm
              key={requestItem.id}
              download={requestItem}
              onSuccess={() => {
                setRequestItem(null)
                setOpenSuccessDialog(true)
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={openSuccessDialog} onOpenChange={setOpenSuccessDialog}>
        <DialogContent className="flex min-h-100 min-w-[35vw] flex-row items-center justify-center rounded-sm px-15! 2xl:min-w-125">
          <div className="flex flex-col items-center text-center text-black">
            <div className="h-25">
              <Image
                src={Success_2Icon}
                alt="Request Success"
                className="size-full"
              />
            </div>
            <span className="mt-7 text-4xl font-medium">
              {t('successDialog.title')}
            </span>
            <span className="mt-2 text-base leading-5 text-[#120D0D]">
              {t('successDialog.description')}
            </span>
            <DialogClose className="bg-our-purple mt-5 w-fit rounded-sm border p-2 px-6 text-sm text-white">
              <span className="font-medium">{t('successDialog.btnLable')}</span>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
