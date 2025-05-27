import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './RadioGroupComponent'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
  title: 'Components/Radio Group',
} satisfies Meta<typeof RadioGroup>

export default meta

export const Default: StoryObj = {
  render: () => {
    return (
      <div style={{ padding: 20, backgroundColor: 'black' }}>
        <RadioGroup
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
          ]}
        />
      </div>
    )
  },
}

export const Disabled: StoryObj = {
  render: () => {
    return (
      <div style={{ padding: 20, backgroundColor: 'black' }}>
        <RadioGroup
          disabled
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
          ]}
        />
      </div>
    )
  },
}
