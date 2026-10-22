'use client'

import { Success_1Icon } from '@/assets/icons'
import RecaptchaScript from '@/components/common/recaptcha-script'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { useQuoteCart } from '@/context/quote-cart.context'
import type { LocaleType } from '@/i18n/types'
import { submitQuoteRequest } from '@/lib/api/quotes'
import { pickLocalized } from '@/lib/product-detail'
import { getRecaptchaToken, RECAPTCHA_ACTIONS } from '@/lib/recaptcha'
import {
  createQuoteCartSchema,
  type QuoteCartFormValues,
} from '@/lib/schemas/quote'
import type { QuoteRequestSubmitPayload } from '@/types/quote'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { Loader2Icon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

const inputClass =
  'h-12 w-full rounded-sm border border-black/20 px-5 text-sm text-black placeholder:text-black/40'
const invalidClass = 'border-red-400 focus:border-red-400'

const emptyValues: QuoteCartFormValues = {
  name: '',
  phone: '',
  email: '',
  company_name: '',
  message: '',
}

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p role="alert" className="mt-1.5 text-sm text-red-500">
      {message}
    </p>
  ) : null

function QuoteCartForm({
  onSuccess,
}: {
  onSuccess: (referenceCode: string | null) => void
}) {
  const t = useTranslations('QuotesPage.Form')
  const tItems = useTranslations('QuotesPage')
  const locale = useLocale() as LocaleType
  const { items } = useQuoteCart()

  const schema = useMemo(
    () => createQuoteCartSchema((key) => t(`validation.${key}`)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale],
  )

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<QuoteCartFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: emptyValues,
  })

  const [submitError, setSubmitError] = useState('')

  const onSubmit = async (values: QuoteCartFormValues) => {
    setSubmitError('')

    if (items.length === 0) {
      setSubmitError(t('errors.generic'))
      return
    }

    try {
      const recaptchaToken = await getRecaptchaToken(RECAPTCHA_ACTIONS.quote)
      const payload: QuoteRequestSubmitPayload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        company_name: values.company_name,
        message: values.message,
        recaptcha_token: recaptchaToken,
        items: items.map((item) => ({
          product_id: item.productId,
          product_title: item.productTitle,
          product_title_ar: item.productTitleAr,
          variant_id: item.variantId,
          variant_label: item.variantLabel,
          variant_label_ar: item.variantLabelAr,
          variant_sku: item.variantSku,
          media_path: item.media,
          quantity: item.quantity,
        })),
      }

      const response = await submitQuoteRequest(payload, locale)

      if (response.ok) {
        onSuccess(response.result.referenceCode)
        return
      }

      const knownFields = ['name', 'email', 'phone', 'company_name', 'message']
      const fieldErrors = response.errors.filter((item) =>
        knownFields.includes(item.field),
      )
      fieldErrors.forEach((item) =>
        setError(item.field as keyof QuoteCartFormValues, {
          message: item.message,
        }),
      )
      if (fieldErrors.length === 0)
        setSubmitError(response.message || t('errors.generic'))
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
      <DialogTitle className="our-heading mt-5 text-6xl!">
        {t('title')}
      </DialogTitle>
      <DialogDescription className="mt-1 text-base font-normal text-black">
        {t('subtitle')}
      </DialogDescription>

      <div className="mt-6 max-h-60 w-full space-y-2 overflow-y-auto pe-1">
        {items.map((item) => {
          const name = pickLocalized(
            locale,
            item.productTitle,
            item.productTitleAr,
          )
          const variantLabel = pickLocalized(
            locale,
            item.variantLabel || '',
            item.variantLabelAr || '',
          )
          return (
            <div
              key={item.lineId}
              className="flex items-center gap-3 rounded-sm border border-black/10 p-3"
            >
              <div className="relative size-12 shrink-0 overflow-hidden rounded bg-[#F4F4F4]">
                {item.media && (
                  <Image
                    src={item.media}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-black">{name}</p>
                <p className="text-xs text-[#555]">
                  {variantLabel && `${variantLabel} • `}
                  {tItems('itemsCount', { count: item.quantity })}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <input
            {...register('name')}
            autoComplete="name"
            aria-label={t('namePlaceholder')}
            aria-invalid={!!errors.name}
            placeholder={`${t('namePlaceholder')}*`}
            className={cn(inputClass, errors.name && invalidClass)}
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div>
          <input
            {...register('email')}
            type="email"
            dir="ltr"
            autoComplete="email"
            aria-label={t('emailPlaceholder')}
            aria-invalid={!!errors.email}
            placeholder={`${t('emailPlaceholder')}*`}
            className={cn(inputClass, errors.email && invalidClass)}
          />
          <FieldError message={errors.email?.message} />
        </div>
        <div>
          <input
            {...register('phone')}
            type="tel"
            dir="ltr"
            autoComplete="tel"
            aria-label={t('phonePlaceholder')}
            aria-invalid={!!errors.phone}
            placeholder={`${t('phonePlaceholder')}*`}
            className={cn(inputClass, errors.phone && invalidClass)}
          />
          <FieldError message={errors.phone?.message} />
        </div>
        <div>
          <input
            {...register('company_name')}
            autoComplete="organization"
            aria-label={t('companyPlaceholder')}
            aria-invalid={!!errors.company_name}
            placeholder={t('companyPlaceholder')}
            className={cn(inputClass, errors.company_name && invalidClass)}
          />
          <FieldError message={errors.company_name?.message} />
        </div>
        <div className="sm:col-span-2">
          <textarea
            {...register('message')}
            aria-label={t('notesPlaceholder')}
            aria-invalid={!!errors.message}
            placeholder={t('notesPlaceholder')}
            className={cn(
              inputClass,
              'h-auto min-h-16 resize-y py-3',
              errors.message && invalidClass,
            )}
          />
          <FieldError message={errors.message?.message} />
        </div>
      </div>

      {submitError && (
        <p role="alert" className="mt-5 text-sm text-red-500">
          {submitError}
        </p>
      )}

      <Button
        className="bg-our-purple our-btn me-auto mt-7 w-fit"
        type="submit"
        disabled={isSubmitting || items.length === 0}
      >
        {isSubmitting && <Loader2Icon className="animate-spin" />}
        <span className="font-medium">{t('submit')}</span>
      </Button>
    </form>
  )
}

export default function GetAQuoteDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const t = useTranslations('QuotesPage.Form')
  const { clear } = useQuoteCart()
  const [success, setSuccess] = useState<{
    referenceCode: string | null
  } | null>(null)

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next)
    if (!next) setSuccess(null)
  }

  return (
    <>
      <RecaptchaScript />

      <Dialog open={open} onOpenChange={handleOpenChange}>
        {success ? (
          <DialogContent className="flex min-h-100 min-w-[35vw] flex-row items-center justify-center rounded-sm px-15! 2xl:min-w-125">
            <div className="flex flex-col items-center text-center text-black">
              <div className="h-25">
                <Image
                  src={Success_1Icon}
                  alt="Inquiry Success"
                  className="size-full"
                />
              </div>
              <span className="mt-7 text-4xl font-medium">
                {t('successDialog.title')}
              </span>
              <span className="mt-2 text-base leading-5 text-[#120D0D]">
                {t('successDialog.description')}
              </span>
              {success.referenceCode && (
                <span className="mt-3 text-sm font-semibold text-[#0066B3]">
                  {t('successDialog.reference')}: {success.referenceCode}
                </span>
              )}
              <DialogClose className="bg-our-purple mt-5 w-fit rounded-sm border p-2 px-10 text-white">
                <span className="text-sm font-medium">
                  {t('successDialog.btnLable')}
                </span>
              </DialogClose>
            </div>
          </DialogContent>
        ) : (
          <DialogContent className="flex flex-row items-center justify-center rounded-sm bg-white p-5 text-black sm:min-w-150 md:p-10 lg:min-w-180 lg:p-12">
            <QuoteCartForm
              onSuccess={(referenceCode) => {
                clear()
                setSuccess({ referenceCode })
              }}
            />
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
