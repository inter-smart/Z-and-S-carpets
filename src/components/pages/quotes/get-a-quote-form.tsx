'use client'

import { Success_1Icon } from '@/assets/icons'
import RecaptchaScript from '@/components/common/recaptcha-script'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { LocaleType } from '@/i18n/types'
import { submitQuoteRequest } from '@/lib/api/quotes'
import { pickLocalized } from '@/lib/product-detail'
import { getRecaptchaToken, RECAPTCHA_ACTIONS } from '@/lib/recaptcha'
import { createQuoteSchema, type QuoteFormValues } from '@/lib/schemas/quote'
import type { QuoteOptionsData, QuoteRequestSubmitPayload } from '@/types/quote'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { Loader2Icon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'

const inputClass =
  'h-12 w-full rounded-sm border border-black/20 px-5 text-sm text-black placeholder:text-black/40'
const triggerClass =
  'h-12! w-full rounded-sm border-black/20 bg-transparent px-5 text-sm data-placeholder:text-black/40'
const invalidClass = 'border-red-400 focus:border-red-400'

const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p role="alert" className="mt-1.5 text-sm text-red-500">
      {message}
    </p>
  ) : null

const emptyValues: QuoteFormValues = {
  name: '',
  phone: '',
  email: '',
  company_name: '',
  category: '',
  product: '',
  message: '',
}

export default function GetAQuoteForm() {
  const t = useTranslations('QuotesPage.Form')
  const locale = useLocale() as LocaleType

  const [options, setOptions] = useState<QuoteOptionsData | null>(null)
  const [success, setSuccess] = useState<{
    referenceCode: string | null
  } | null>(null)

  const schema = useMemo(
    () => createQuoteSchema((key) => t(`validation.${key}`)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale],
  )

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: emptyValues,
  })

  const [submitError, setSubmitError] = useState('')

  const category = useWatch({ control, name: 'category' })

  useEffect(() => {
    let cancelled = false
    fetch('/api/quote-request/options')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: QuoteOptionsData | null) => {
        if (!cancelled && data) setOptions(data)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const categoryItems = useMemo(() => {
    if (!options) return []
    const used = new Set(options.products.map((item) => item.category_slug))
    return options.categories
      .filter((item) => used.has(item.slug))
      .map((item) => ({
        value: item.slug,
        label: pickLocalized(locale, item.title, item.title_ar),
      }))
  }, [options, locale])

  const productItems = useMemo(() => {
    if (!options || !category) return []
    return options.products
      .filter((item) => item.category_slug === category)
      .map((item) => ({
        value: item.slug,
        label: pickLocalized(locale, item.title, item.title_ar),
      }))
  }, [options, category, locale])

  const onSubmit = async (values: QuoteFormValues) => {
    setSubmitError('')

    const selectedProduct = options?.products.find(
      (item) => item.slug === values.product,
    )
    if (!selectedProduct) {
      setError('product', { message: t('validation.productRequired') })
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
        items: [
          {
            product_id: selectedProduct.id,
            product_title: selectedProduct.title,
            product_title_ar: selectedProduct.title_ar,
            quantity: 1,
          },
        ],
      }

      const response = await submitQuoteRequest(payload, locale)

      if (response.ok) {
        setSuccess({ referenceCode: response.result.referenceCode })
        reset(emptyValues)
        return
      }

      const knownFields = ['name', 'email', 'phone', 'company_name', 'message']
      const fieldErrors = response.errors.filter((item) =>
        knownFields.includes(item.field),
      )
      fieldErrors.forEach((item) =>
        setError(item.field as keyof QuoteFormValues, {
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
    <>
      <RecaptchaScript />

      <div className="z-20 my-15 w-200! max-w-full rounded-md bg-white p-10 text-black sm:p-10 lg:p-12">
        <h1 className="our-heading">{t('title')}</h1>
        <p className="mt-3 text-base">{t('subtitle')}</p>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
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

          <div>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <Select
                  items={categoryItems}
                  value={field.value || null}
                  onValueChange={(value) => {
                    field.onChange(value ?? '')
                    setValue('product', '', { shouldValidate: false })
                  }}
                >
                  <SelectTrigger
                    aria-label={t('categoryPlaceholder')}
                    aria-invalid={!!errors.category}
                    onBlur={field.onBlur}
                    className={cn(
                      triggerClass,
                      errors.category && invalidClass,
                    )}
                  >
                    <SelectValue placeholder={`${t('categoryPlaceholder')}*`} />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm px-2">
                    <SelectGroup>
                      {categoryItems.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="rounded-sm text-sm"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError message={errors.category?.message} />
          </div>
          <div>
            <Controller
              control={control}
              name="product"
              render={({ field }) => (
                <Select
                  items={productItems}
                  value={field.value || null}
                  onValueChange={(value) => field.onChange(value ?? '')}
                  disabled={!category}
                >
                  <SelectTrigger
                    aria-label={t('productPlaceholder')}
                    aria-invalid={!!errors.product}
                    onBlur={field.onBlur}
                    className={cn(triggerClass, errors.product && invalidClass)}
                  >
                    <SelectValue
                      placeholder={
                        category
                          ? `${t('productPlaceholder')}*`
                          : t('productFirst')
                      }
                    />
                  </SelectTrigger>
                  <SelectContent className="rounded-sm px-2">
                    <SelectGroup>
                      {productItems.map((item) => (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          className="rounded-sm text-sm"
                        >
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError message={errors.product?.message} />
          </div>

          <div className="sm:col-span-2">
            <textarea
              {...register('message')}
              aria-label={t('notesPlaceholder')}
              aria-invalid={!!errors.message}
              placeholder={t('notesPlaceholder')}
              className={cn(
                'min-h-25 w-full resize-y rounded-sm border border-black/20 px-5 py-3 text-sm text-black placeholder:text-black/40',
                errors.message && invalidClass,
              )}
            />
            <FieldError message={errors.message?.message} />
          </div>

          {submitError && (
            <p role="alert" className="col-span-full text-sm text-red-500">
              {submitError}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-our-purple our-btn mt-3 w-fit sm:col-span-2"
          >
            {isSubmitting && <Loader2Icon className="animate-spin" />}
            <span className="font-medium">{t('submit')}</span>
          </Button>
        </form>
      </div>

      <Dialog
        open={!!success}
        onOpenChange={(open) => !open && setSuccess(null)}
      >
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
            {success?.referenceCode && (
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
      </Dialog>
    </>
  )
}
