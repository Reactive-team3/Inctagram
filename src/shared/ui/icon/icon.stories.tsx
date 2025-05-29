import type { Meta, StoryObj } from '@storybook/react'
import Icon from './Icon'

const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
    },
    docs: {
      theme: 'dark',
    },
  },
  argTypes: {},
  args: { color: 'white' },
}
export default meta

type Story = StoryObj<typeof Icon>

export const DoneAllOutline: Story = {
  args: {
    name: 'done-all-outline',
  },
}

export const CheckmarkOutline: Story = {
  args: {
    name: 'checkmark-outline',
    color: 'blue',
  },
}

export const Heart: Story = {
  args: {
    name: 'heart',
    color: 'red',
  },
}
