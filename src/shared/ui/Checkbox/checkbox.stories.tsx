import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: 'Check-box',
  },
}

export const Checked: Story = {
  args: {
    label: 'Check-box',
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Check-box',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Check-box',
    disabled: true,
    checked: true,
  },
}
