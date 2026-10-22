// Shared reCAPTCHA v3 execution, used by both the /quotes/form flat form and
// the cart-preview "Get a Quote" dialog. The <Script> tag that loads the
// grecaptcha SDK still needs to be rendered by each component (Next's
// `next/script` dedupes by `src`, so mounting it twice is harmless).
export const RECAPTCHA_ACTION = 'quote_request'
export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

export async function getRecaptchaToken(): Promise<string> {
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
        .grecaptcha!.execute(RECAPTCHA_SITE_KEY, { action: RECAPTCHA_ACTION })
        .then(resolve)
        .catch(() => resolve(''))
    })
  })
}
