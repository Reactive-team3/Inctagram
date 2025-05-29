import { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import TabsRadix from './tabsRadix'
import styles from './tabsRadix.module.scss'
import { userEvent, within } from '@storybook/test'

const meta: Meta<typeof TabsRadix> = {
  title: 'UI/Tabs/TabsRadix',
  component: TabsRadix,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [{ name: 'dark', value: '#222' }],
    },
  },
  tags: ['autodocs'],
}
export default meta
type Story = StoryObj<typeof TabsRadix>

// 📌General tabs for all stories
const tabs = [
  { value: 'tab1', label: 'Профиль' },
  { value: 'tab2', label: 'Настройки' },
  { value: 'tab3', label: 'Помощь' },
]

// 🎯 Brush component to control tabs
const StatefulTabs = ({ initial = 'tab1' }: { initial?: string }) => {
  const [current, setCurrent] = useState(initial)
  return (
    <div style={{ width: 400, background: '#222', padding: 20 }}>
      <TabsRadix tabs={tabs} current={current} onChange={setCurrent}>
        <div className={styles.content}>
          <p style={{ color: '#fff' }}>Контент: {current}</p>
        </div>
      </TabsRadix>
    </div>
  )
}

// 👇 Stories themselves
export const Default: Story = {
  render: () => <StatefulTabs />,
}

export const Hover: Story = {
  parameters: {
    pseudo: { hover: true },
  },
  render: () => <StatefulTabs />,
}

export const Focus: Story = {
  render: () => <StatefulTabs />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tab = await canvas.findByRole('tab', { name: 'Профиль' })
    tab.focus()
  },
}

export const ClickToChange: Story = {
  render: () => <StatefulTabs />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const tab = await canvas.findByRole('tab', { name: 'Настройки' })
    await userEvent.click(tab)
  },
}

export const Disabled: Story = {
  render: () => {
    const disabledTabs = [
      { value: 'tab1', label: 'Активная' },
      { value: 'tab2', label: 'Неактивная' },
      { value: 'tab3', label: 'Отключена (disabled)' },
    ]
    return (
      <div style={{ width: 400, background: '#222', padding: 20 }}>
        <TabsRadix tabs={disabledTabs} current="tab1" onChange={() => {}}>
          <div className={styles.content}>
            <p style={{ color: '#fff' }}>Таблица с отключённой вкладкой (визуально)</p>
          </div>
        </TabsRadix>
      </div>
    )
  },
}
