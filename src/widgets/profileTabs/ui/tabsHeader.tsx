import { ReactNode } from 'react'
import styles from './profileTabs.module.scss'
import TabsRadix from '@/shared/ui/tabs/tabsRadix'

type Props = {
  tabs: { value: string; label: string }[]
  current: string
  onChange: (value: string) => void
  children: ReactNode
}

export const TabsHeader = ({ tabs, current, onChange, children }: Props) => {
  return (
    <div className={styles.tabsWrapper}>
      <TabsRadix tabs={tabs} current={current} onChange={onChange}>
        {children}
      </TabsRadix>
    </div>
  )
}
