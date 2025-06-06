import type { Meta, StoryObj } from '@storybook/react'
import { Typography } from '@/shared/ui/typography/Typography'

const meta = {
  title: 'Components/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: [
        'large',
        'h1',
        'h2',
        'h3',
        'body1',
        'body2',
        'subtitle1',
        'subtitle2',
        'caption',
        'overline',
        'link1',
        'link2',
        'error',
      ],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: {
    variant: 'h1',
    children: 'h1',
    disabled: false,
  },
}

export const Large: Story = {
  args: {
    variant: 'large',
    children: 'large',
    disabled: false,
  },
}

export const Tertiary: Story = {
  args: {
    variant: 'body1',
    children: 'body1',
    disabled: false,
  },
}
