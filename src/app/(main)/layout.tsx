import { ReactNode } from 'react'
import { Header } from '@/widgets/header'
import styles from './layout.module.scss'
import '@/shared/config/styles/index.scss'
import Sidebar from '@/widgets/Sidebar/ui/Sidebar/Sidebar'
import MobileSideBar from '@/widgets/Sidebar/ui/MobileSideBar/MobileSideBar'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.stickyHeader}>
        <Header />
      </div>
      <div className={styles.contentArea}>
        <div className={styles.leftSidebar}>
          <Sidebar />
        </div>
        <div className={styles.bottomSidebar}>
          <MobileSideBar />
        </div>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}
