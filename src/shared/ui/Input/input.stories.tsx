import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: { onChange: { action: 'changed' } },
  args: {
    name: 'email',
    placeholder: 'Epam@epam.com',
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: 'Email',
  },
}

export const Active: Story = {
  args: {
    label: 'Email',
    value: 'Epam@epam.com',
  },
}

export const Error: Story = {
  args: {
    label: 'Email',
    value: 'Epam@epam.com',
    error: 'Error text',
  },
}

export const Hover: Story = {
  args: {
    label: 'Email',
    value: 'Epam@epam.com',
  },
  parameters: {
    pseudo: { hover: true },
  },
}

export const Focus: Story = {
  args: {
    label: 'Email',
    value: 'Epam@epam.com',
  },
  parameters: {
    pseudo: { focus: true },
  },
}

export const Disabled: Story = {
  args: {
    label: 'Email',
    value: 'Epam@epam.com',
    disabled: true,
  },
}

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Input search',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Password',
    showPasswordIcon: true,
  },
}
