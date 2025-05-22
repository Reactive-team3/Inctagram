import path from 'path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    }

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'))

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    config.module.rules.forEach((rule: any) => {
      if (Array.isArray(rule.oneOf)) {
        rule.oneOf.forEach((oneOf: any) => {
          if (Array.isArray(oneOf.use)) {
            oneOf.use.forEach((loader: any) => {
              if (loader.loader?.includes('sass-loader') && loader.options) {
                const prepend = `@use "@/shared/config/styles/helpers" as *;`
                const existingData = loader.options.additionalData

                loader.options.additionalData =
                  typeof existingData === 'function'
                    ? (content: string, loaderContext: any) =>
                        prepend + '\n' + existingData(content, loaderContext)
                    : (content: string) => prepend + '\n' + (existingData || '') + content
              }
            })
          }
        })
      }
    })

    return config
  },
}

export default nextConfig
