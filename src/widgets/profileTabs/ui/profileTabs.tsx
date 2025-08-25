'use client'
import { useProfileTabs } from '../model/useProfileTabs'
import { TabsHeader } from './tabsHeader'
import styles from './profileTabs.module.scss'
import { GeneralInformaition } from '@/widgets/generalInformation/ui/GeneralInformaition'

// Here you will need to import your real components
//Replace these plugs with your real components
const Devices = () => <div>Devices Content</div>

export const ProfileTabs = () => {
  const { tabs, current, setCurrent } = useProfileTabs()

  return (
    <div className={styles.container}>
      <TabsHeader tabs={tabs} current={current} onChange={setCurrent}>
        {current === 'general' && <GeneralInformaition />}
        {current === 'devices' && <Devices />}
        {current === 'account' && <div>Account Management</div>}
        {current === 'payments' && <div>My Payments</div>}
      </TabsHeader>
    </div>
  )
}

export default ProfileTabs
