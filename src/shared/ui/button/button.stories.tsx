import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  // parameters: { layout: 'centered' },
  parameters: { layout: 'padded' },
  argTypes: { onClick: { action: 'clicked' } },
  args: {
    children: 'Button',
  },
}
export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
}
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
}

export const Text: Story = {
  args: {
    variant: 'text',
  },
}
export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
  },
}
