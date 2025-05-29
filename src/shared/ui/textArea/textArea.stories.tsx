import type { Meta, StoryObj } from '@storybook/react'
import { TextArea } from './TextArea'

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],

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
  args: {},
}
export default meta

type Story = StoryObj<typeof TextArea>

export const TextAreaDefault: Story = {
  args: {
    label: 'Enter your message',
  },
}
