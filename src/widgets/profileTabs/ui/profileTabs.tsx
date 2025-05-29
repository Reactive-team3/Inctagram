'use client'
import { useProfileTabs } from '../model/useProfileTabs'
import { TabsHeader } from './tabsHeader'
import styles from './profileTabs.module.scss'

// Here you will need to import your real components
//Replace these plugs with your real components
const GeneralForm = () => <div>General Information Form</div>
const Devices = () => <div>Devices Content</div>

export const ProfileTabs = () => {
  const { tabs, current, setCurrent } = useProfileTabs()

  return (
    <div className={styles.container}>
      <TabsHeader tabs={tabs} current={current} onChange={setCurrent}>
        {current === 'general' && <GeneralForm />}
        {current === 'devices' && <Devices />}
        {current === 'account' && <div>Account Management</div>}
        {current === 'payments' && <div>My Payments</div>}
      </TabsHeader>
    </div>
  )
}

export default ProfileTabs
