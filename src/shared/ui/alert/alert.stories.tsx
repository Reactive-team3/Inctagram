import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from '@/shared/ui/alert/Alert'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>

export default meta

export const Error: StoryObj = {
  render: () => {
    return (
      <div style={{ padding: 20, backgroundColor: 'black', position: 'relative' }}>
        <Alert
          notifications={[
            { id: 1, message: 'Your settings are saved', variant: 'error', duration: 40000 },
          ]}
          onCloseAction={() => {}}
        />
      </div>
    )
  },
}

export const Success: StoryObj = {
  render: () => {
    return (
      <div style={{ padding: 20, backgroundColor: 'black', position: 'relative' }}>
        <Alert
          notifications={[
            { id: 1, message: 'Your settings are saved', variant: 'success', duration: 40000 },
          ]}
          onCloseAction={() => {}}
        />
      </div>
    )
  },
}
