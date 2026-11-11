import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_BASE_URL

const isDev = process.env.NODE_ENV !== 'production'

// Origins the page legitimately talks to: the backend API (fetches, /uploads images)
// plus Google (reCAPTCHA, Maps embed on /contact, Tag Manager/Analytics for admin-managed meta scripts).
// Both env vars are checked since either can be the one set; in dev, any localhost port
// is allowed so a local API/media server never gets blocked.
const apiOrigin = [
  ...new Set(
    [process.env.API_URL, process.env.NEXT_PUBLIC_API_BASE_URL]
      .filter((u): u is string => !!u)
      .map((u) => new URL(u).origin),
  ),
]
  .concat(isDev ? ['http://localhost:*', 'http://127.0.0.1:*'] : [])
  .join(' ')
const google = 'https://www.google.com https://www.gstatic.com'
const googleTags = 'https://www.googletagmanager.com https://www.google-analytics.com'

const contentSecurityPolicy = [
  "default-src 'self'",
  // Next.js emits inline bootstrap scripts; 'unsafe-eval' only for dev (React refresh)
  `script-src 'self' 'unsafe-inline' ${isDev ? "'unsafe-eval' " : ''}${google} ${googleTags}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https: ${apiOrigin}`.trim(),
  "font-src 'self' data:",
  `connect-src 'self' ${apiOrigin} ${google} ${googleTags}`.replace(/\s+/g, ' ').trim(),
  `frame-src 'self' ${google} https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com`,
  `media-src 'self' blob: https: ${apiOrigin}`.trim(),
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ['upgrade-insecure-requests']),
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
]

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // API uploads rarely change under the same URL, so avoid re-optimizing every minute
    minimumCacheTTL: 60 * 60 * 24,
    // The local API (localhost) is a private address, which the image optimizer blocks by default
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== 'production',
    // API-served uploads (home banners, milestones, ...)
    remotePatterns: apiUrl
      ? [
          {
            protocol: new URL(apiUrl).protocol.replace(':', '') as
              'http' | 'https',
            hostname: new URL(apiUrl).hostname,
            port: new URL(apiUrl).port,
            pathname: '/uploads/**',
          },
        ]
      : [],
  },
  turbopack: {
    rules: {
      '**/*.icon.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              // dimensions: false,
              icon: true,
            },
          },
        ],
        as: '*.js',
      },
    },
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
