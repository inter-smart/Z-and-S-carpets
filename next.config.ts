import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_BASE_URL

const nextConfig: NextConfig = {
  images: {
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
