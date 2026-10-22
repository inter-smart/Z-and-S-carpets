// Shared reCAPTCHA v3 execution for every lead-capture form (quote form + cart
// dialog, contact, get-a-sample, download request). The SDK itself is loaded by
// <RecaptchaScript /> (`@/components/common/recaptcha-script`), rendered by each
// form (Next's `next/script` dedupes by `src`, so mounting it twice is harmless).
//
// Each form passes its own action; the server checks the token's action matches
// its endpoint (services/recaptchaService.js), so a token minted for one form
// can't be replayed against another.
export const RECAPTCHA_ACTIONS = {
  quote: 'quote_request',
  contact: 'contact_enquiry',
  sample: 'sample_request',
  download: 'download_request',
} as const

export type RecaptchaAction =
  (typeof RECAPTCHA_ACTIONS)[keyof typeof RECAPTCHA_ACTIONS]

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

// Resolves to '' when the SDK isn't available; the server then rejects the
// submission with a "reCAPTCHA verification is required" error.
export async function getRecaptchaToken(
  action: RecaptchaAction,
): Promise<string> {
  if (
    !RECAPTCHA_SITE_KEY ||
    typeof window === 'undefined' ||
    !window.grecaptcha
  ) {
    return ''
  }
  return new Promise((resolve) => {
    window.grecaptcha!.ready(() => {
      window
        .grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action })
        .then(resolve)
        .catch(() => resolve(''))
    })
  })
}
