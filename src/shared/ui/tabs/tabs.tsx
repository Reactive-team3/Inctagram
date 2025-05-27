import * as Tabs from '@radix-ui/react-tabs'
import styles from './tabs.module.scss'

type TabsProps = {
  tabName: string
}

const TabsRadix = ({ tabName }: TabsProps) => (
  <Tabs.Root className={styles.Root} defaultValue="tab1">
    <Tabs.List className={styles.List} aria-label="Manage your account">
      <Tabs.Trigger className={styles.Trigger} value="tab1">
        {tabName}
      </Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
)

export default TabsRadix
