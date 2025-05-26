import type { StorybookConfig } from '@storybook/nextjs'
import { RuleSetRule } from 'webpack'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@chromatic-com/storybook',
    '@storybook/experimental-addon-test',
  ],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  webpackFinal: async config => {
    const rules = config.module?.rules as RuleSetRule[]

    for (const rule of rules) {
      if (rule.test instanceof RegExp && rule.test.test('.scss')) {
        const useLoaders = rule.use as any[]

        const sassLoader = useLoaders?.find(
          loader => typeof loader === 'object' && loader.loader?.includes('sass-loader')
        )

        if (sassLoader) {
          sassLoader.options = {
            ...(sassLoader.options || {}),
            additionalData: `@use 'src/shared/config/styles/helpers' as *;`,
            sassOptions: {
              includePaths: ['src/shared/config/styles'],
            },
          }
        }
      }
    }

    return config
  },
}

export default config
