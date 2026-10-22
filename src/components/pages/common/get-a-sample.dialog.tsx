'use client'

import RecaptchaScript from '@/components/common/recaptcha-script'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  useGetASample,
  type GetASamplePreset,
} from '@/context/get-a-sample.context'
import type { LocaleType } from '@/i18n/types'
import { getRecaptchaToken, RECAPTCHA_ACTIONS } from '@/lib/recaptcha'
import { pickLocalized } from '@/lib/product-detail'
import { createSampleSchema, type SampleFormValues } from '@/lib/schemas/sample'
import type { SampleOptionsData } from '@/types/sample-request'
import { zodResolver } from '@hookform/resolvers/zod'
import { cn } from 'cn'
import { CloudCheckIcon, Loader2Icon } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'

const inputClass =
  'w-full rounded-sm border-2 border-white/10 bg-transparent px-4.5 py-3 text-sm text-white/90 outline-none placeholder:text-white/60 focus:border-white/20'
const invalidClass = 'border-red-300/70 focus:border-red-300'
const triggerClass =
  'h-12! w-full rounded-sm border-white/20 bg-transparent px-5 text-sm data-placeholder:text-white/50'

const FIELDS = [
  'name',
  'phone',
  'email',
  'company_name',
  'category',
  'product',
] as const

const emptyValues: SampleFormValues = {
  name: '',
  phone: '',
  email: '',
  company_name: '',
  category: '',
  product: '',
}

const FieldError = ({ id, message }: { id: string; message?: string }) =>
  message ? (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-300">
      {message}
    </p>
  ) : null

function SampleForm({
  options,
  optionsLoading,
  preset,
  onSuccess,
}: {
  options: SampleOptionsData | null
  optionsLoading: boolean
  preset: GetASamplePreset | null
  onSuccess: () => void
}) {
  const locale = useLocale() as LocaleType
  const t = useTranslations('Common.GetASample')

  const formField = t.raw('fields') as string[]

  // validation messages follow the locale (en / ar)
  const schema = useMemo(
    () => createSampleSchema((key) => t(`validation.${key}`)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale],
  )

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SampleFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      ...emptyValues,
      category: preset?.category ?? '',
      product: preset?.product ?? '',
    },
  })

  const [submitError, setSubmitError] = useState('')

  const category = useWatch({ control, name: 'category' })

  // only categories that have products to choose from
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

  const onSubmit = async (values: SampleFormValues) => {
    setSubmitError('')

    try {
      const recaptchaToken = await getRecaptchaToken(RECAPTCHA_ACTIONS.sample)
      const res = await fetch(`/api/sample-request?lang=${locale}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, recaptcha_token: recaptchaToken }),
      })

      if (res.ok) {
        onSuccess()
        return
      }

      // the server answers in the same language: show its messages next to the right field
      const result = (await res.json().catch(() => ({}))) as {
        error_code?: string
        message?: string
        errors?: { field: string; message: string }[]
      }
      const fieldErrors = (result.errors ?? []).filter((item) =>
        (FIELDS as readonly string[]).includes(item.field),
      )
      fieldErrors.forEach((item) =>
        setError(item.field as keyof SampleFormValues, {
          message: item.message,
        }),
      )
      // reCAPTCHA failures come back without a form field: show the server's (localized) message
      const recaptchaError =
        result.error_code === 'RECAPTCHA_FAILED'
          ? result.message
          : result.errors?.find((item) => item.field === 'recaptcha_token')
              ?.message
      if (fieldErrors.length === 0)
        setSubmitError(recaptchaError || t('errors.generic'))
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
      <DialogTitle className="our-heading mt-5 text-8xl!">
        {t('title')}
      </DialogTitle>
      <DialogDescription className="mt-1 text-base font-normal text-white">
        {t('subtitle')}
      </DialogDescription>
      <div className="mt-8 grid w-full grid-cols-1 gap-3">
        <div>
          <input
            {...register('name')}
            autoComplete="name"
            aria-label={formField[0]}
            aria-invalid={!!errors.name}
            aria-describedby="sample-name-error"
            placeholder={`${formField[0]}*`}
            className={cn(inputClass, errors.name && invalidClass)}
          />
          <FieldError id="sample-name-error" message={errors.name?.message} />
        </div>
        <div>
          <input
            {...register('phone')}
            type="tel"
            dir="ltr"
            autoComplete="tel"
            aria-label={formField[1]}
            aria-invalid={!!errors.phone}
            aria-describedby="sample-phone-error"
            placeholder={`${formField[1]}*`}
            className={cn(inputClass, errors.phone && invalidClass)}
          />
          <FieldError id="sample-phone-error" message={errors.phone?.message} />
        </div>
        <div>
          <input
            {...register('email')}
            type="email"
            dir="ltr"
            autoComplete="email"
            aria-label={formField[2]}
            aria-invalid={!!errors.email}
            aria-describedby="sample-email-error"
            placeholder={`${formField[2]}*`}
            className={cn(inputClass, errors.email && invalidClass)}
          />
          <FieldError id="sample-email-error" message={errors.email?.message} />
        </div>
        <div>
          <input
            {...register('company_name')}
            autoComplete="organization"
            aria-label={formField[3]}
            aria-invalid={!!errors.company_name}
            aria-describedby="sample-company-error"
            placeholder={formField[3]}
            className={cn(inputClass, errors.company_name && invalidClass)}
          />
          <FieldError
            id="sample-company-error"
            message={errors.company_name?.message}
          />
        </div>
        {/* Product Categories */}
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
                  // the products belong to the category: choose again
                  setValue('product', '', { shouldValidate: false })
                }}
              >
                <SelectTrigger
                  aria-label={t('categoryPlaceholder')}
                  aria-invalid={!!errors.category}
                  onBlur={field.onBlur}
                  className={cn(
                    triggerClass,
                    errors.category && 'border-red-300/70',
                  )}
                >
                  <SelectValue
                    placeholder={
                      optionsLoading
                        ? t('loadingOptions')
                        : `${t('categoryPlaceholder')}*`
                    }
                  />
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
          <FieldError
            id="sample-category-error"
            message={errors.category?.message}
          />
        </div>
        {/* Products of the chosen category */}
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
                  className={cn(
                    triggerClass,
                    errors.product && 'border-red-300/70',
                  )}
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
          <FieldError
            id="sample-product-error"
            message={errors.product?.message}
          />
        </div>
      </div>
      {submitError && (
        <p role="alert" className="mt-5 text-sm text-red-300">
          {submitError}
        </p>
      )}
      <Button
        className="bg-our-purple our-btn me-auto mt-10 w-fit"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2Icon className="animate-spin" />}
        <span className="font-medium">{t('submit')}</span>
      </Button>
    </form>
  )
}

export default function GetASampleDialog() {
  const { open, setOpen, preset } = useGetASample()
  const t = useTranslations('Common.GetASample')

  const [options, setOptions] = useState<SampleOptionsData | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [wasOpen, setWasOpen] = useState(open)

  // every time it opens it starts from the form, not from the last success message
  if (open !== wasOpen) {
    setWasOpen(open)
    if (open) setSubmitted(false)
  }

  // the dropdown data is loaded the first time the dialog opens
  useEffect(() => {
    if (!open || options) return
    let cancelled = false
    fetch('/api/sample-request/options')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: SampleOptionsData | null) => {
        if (!cancelled && data) setOptions(data)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [open, options])

  return (
    <>
      <RecaptchaScript />
      <Dialog open={open} onOpenChange={setOpen}>
        {submitted ? (
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
                <span className="font-medium">
                  {t('successDialog.btnLable')}
                </span>
              </DialogClose>
            </div>
          </DialogContent>
        ) : (
          <DialogContent
            showCloseButton={false}
            className="flex min-h-100 flex-row items-center justify-center rounded-sm bg-[#023260] p-5 text-white sm:min-w-120 md:p-10 lg:p-12"
          >
            <SampleForm
              options={options}
              optionsLoading={!options}
              preset={preset}
              onSuccess={() => setSubmitted(true)}
            />
          </DialogContent>
        )}
      </Dialog>
    </>
  )
}
