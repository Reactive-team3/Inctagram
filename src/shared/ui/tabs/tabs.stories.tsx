import { Meta, StoryObj } from '@storybook/react'
import TabsRadix from './tabs'
import { userEvent, within } from '@storybook/test'
import * as Tabs from '@radix-ui/react-tabs'
import styles from './tabs.module.scss'

const meta: Meta<typeof TabsRadix> = {
  title: 'UI/Tabs/TabsRadix',
  component: TabsRadix,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TabsRadix>
export const Default: Story = {
  args: {},
  render: () => (
    <div style={{ width: '300px', background: '#222', padding: '20px' }}>
      <TabsRadix />
    </div>
  ),
}

export const Active: Story = {
  args: {},
  render: () => (
    <div style={{ width: '300px', background: '#222', padding: '20px' }}>
      <TabsRadix />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tab = canvas.getByRole('tab', { name: 'Tabs' })
    await userEvent.click(tab)
  },
}

export const Hover: Story = {
  args: {},
  render: () => (
    <div style={{ width: '300px', background: '#222', padding: '20px' }}>
      <TabsRadix />
    </div>
  ),
  parameters: {
    pseudo: { hover: true },
  },
}

export const Focus: Story = {
  args: {},
  render: () => (
    <div style={{ width: '300px', background: '#222', padding: '20px' }}>
      <TabsRadix />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tab = canvas.getByRole('tab', { name: 'Tabs' })
    await tab.focus()
  },
}

export const Disabled: Story = {
  args: {},
  render: () => (
    <div style={{ width: '300px', background: '#222', padding: '20px' }}>
      <div style={{ width: '100%' }}>
        <Tabs.Root className={styles.Root} defaultValue="tab1">
          <Tabs.List className={styles.List} aria-label="Manage your account">
            <Tabs.Trigger className={styles.Trigger} value="tab1" disabled>
              Tabs
            </Tabs.Trigger>
          </Tabs.List>
        </Tabs.Root>
      </div>
    </div>
  ),
}

export const MultipleTabs: Story = {
  args: {},
  render: () => (
    <div style={{ width: '400px', background: '#222', padding: '20px' }}>
      <Tabs.Root className={styles.Root} defaultValue="tab1">
        <Tabs.List className={styles.List} aria-label="Manage your account">
          <Tabs.Trigger className={styles.Trigger} value="tab1">
            Профиль
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.Trigger} value="tab2">
            Настройки
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.Trigger} value="tab3">
            Помощь
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </div>
  ),
}

export const AllStates: Story = {
  args: {},
  render: () => (
    <div style={{ width: '600px', background: '#222', padding: '20px' }}>
      <Tabs.Root className={styles.Root} defaultValue="tab1">
        <Tabs.List className={styles.List} aria-label="Manage your account">
          <Tabs.Trigger className={styles.Trigger} value="tab1">
            Активная
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.Trigger} value="tab2">
            Неактивная
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.Trigger} value="tab3" disabled>
            Отключенная
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </div>
  ),
}
