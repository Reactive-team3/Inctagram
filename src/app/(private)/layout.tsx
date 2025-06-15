import { ReactNode } from 'react'
import styles from './layout.module.scss'
import '@/shared/config/styles/index.scss'
import Sidebar from '@/widgets/Sidebar/ui/Sidebar/Sidebar'
import MobileSideBar from '@/widgets/Sidebar/ui/MobileSideBar/MobileSideBar'
import { ProtectedRoute } from '@/features/auth/lib/ProtectedRoute'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className={styles.wrapper}>
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
    </ProtectedRoute>
  )
}
