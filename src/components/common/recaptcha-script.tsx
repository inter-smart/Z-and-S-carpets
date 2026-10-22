import { RECAPTCHA_SITE_KEY } from '@/lib/recaptcha'
import Script from 'next/script'

// Loads the reCAPTCHA v3 SDK used by `getRecaptchaToken`. Safe to render from
// several forms on one page: `next/script` loads a given `src` only once.
export default function RecaptchaScript() {
  if (!RECAPTCHA_SITE_KEY) return null
  return (
    <Script
      src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`}
      strategy="lazyOnload"
    />
  )
}
