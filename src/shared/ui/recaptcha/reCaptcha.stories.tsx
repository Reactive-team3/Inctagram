import type { Meta, StoryObj } from '@storybook/react'
import { ReCaptcha } from '@/shared/ui/recaptcha/ReCaptcha'

const meta: Meta<typeof ReCaptcha> = {
  title: 'Components/Recaptcha',
  component: ReCaptcha,
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#121212',
        },
      ],
    },
  },
}
export default meta

type Story = StoryObj<typeof ReCaptcha>

export const Default: Story = {}
