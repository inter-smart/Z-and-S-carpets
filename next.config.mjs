import createNextIntlPlugin from 'next-intl/plugin'

const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_BASE_URL

const svgrLoader = {
  loader: '@svgr/webpack',
  options: {
    // dimensions: false,
    icon: true,
  },
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // The local API (localhost) is a private address, which the image optimizer blocks by default
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== 'production',
    // API-served uploads (home banners, milestones, ...)
    remotePatterns: apiUrl
      ? [
          {
            protocol: new URL(apiUrl).protocol.replace(':', ''),
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
        loaders: [svgrLoader],
        as: '*.js',
      },
    },
  },
  // Webpack equivalent of the Turbopack rule above (used by `next build --webpack`)
  webpack(config) {
    // Stop Next's built-in image rule from claiming *.icon.svg
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test instanceof RegExp && rule.test.test('.svg')
    )
    if (fileLoaderRule) fileLoaderRule.exclude = /\.icon\.svg$/i

    config.module.rules.push({
      test: /\.icon\.svg$/i,
      use: [svgrLoader],
    })
    return config
  },
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
