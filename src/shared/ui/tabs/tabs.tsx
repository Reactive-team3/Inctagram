'use client'

import * as Tabs from '@radix-ui/react-tabs'
import styles from './tabs.module.scss'

const TabsRadix = () => (
  <Tabs.Root className={styles.Root} defaultValue="tab1">
    <Tabs.List className={styles.List} aria-label="Manage your account">
      <Tabs.Trigger className={styles.Trigger} value="tab1">
        Tabs
      </Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
)

export default TabsRadix
