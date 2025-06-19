import type { Meta, StoryObj } from '@storybook/react'
import { SelectComponent } from './SelectComponent'
// import { SelectComponent } from '@/shared/ui/select/SelectComponent.'

const meta = {
  title: 'Components/SelectComponent',
  component: SelectComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'tertiary', 'link'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof SelectComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    defaultValue: '1',
    onChangeAction: () => {},
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
    ],
    variant: 'simple',
    disabled: false,
  },
}
