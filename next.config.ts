import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '**/assets/icons/*.svg': {
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
