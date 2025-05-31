import React from 'react'
import DatePicker from 'react-multi-date-picker'
import type { Meta, StoryObj } from '@storybook/react'
import CustomDatePicker from '@/shared/ui/datePicker/DatePicker'

const meta: Meta<typeof CustomDatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
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

type Story = StoryObj<typeof CustomDatePicker>

export const Default: Story = {
  render: () => <CustomDatePicker />,
}
