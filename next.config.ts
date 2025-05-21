import path from 'path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpack(config) {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(__dirname, 'src'),
    }

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
