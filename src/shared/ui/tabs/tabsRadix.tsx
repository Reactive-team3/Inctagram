import * as Tabs from '@radix-ui/react-tabs'
import { ReactNode } from 'react'
import styles from './tabsRadix.module.scss'

type Props = {
  tabs: { value: string; label: string }[]
  current?: string
  onChange?: (value: string) => void
  children?: ReactNode
}

const TabsRadix = ({ tabs, current, onChange, children }: Props) => {
  return (
    <Tabs.Root value={current} onValueChange={onChange} className={styles.root}>
      <Tabs.List className={styles.list} aria-label="Manage your account">
        {tabs?.map(tab => (
          <Tabs.Trigger key={tab.value} value={tab.value} className={styles.trigger}>
            {tab.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className={styles.content}>{children}</div>
    </Tabs.Root>
  )
}

export default TabsRadix
