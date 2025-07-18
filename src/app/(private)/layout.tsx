'use client'

import { ReactNode, useEffect } from 'react'
import styles from './layout.module.scss'
import '@/shared/config/styles/index.scss'
import Sidebar from '@/widgets/Sidebar/ui/Sidebar/Sidebar'
import MobileSideBar from '@/widgets/Sidebar/ui/MobileSideBar/MobileSideBar'
import { Loader } from '@/shared/ui/loader/Loader'
import { useMeQuery } from '@/features/auth/model/authApi'
import { redirect } from 'next/navigation'
import { publicRoutes } from '@/shared/config/routes/routes'
import { setUser } from '@/shared/model/user/userSlice'
import { useDispatch } from 'react-redux'

export default function PrivetLayout({ children }: { children: ReactNode }) {
  const { data, isLoading, isError } = useMeQuery()
  const dispatch = useDispatch()

  const isAuthenticated = !!data?.userId

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || isError)) {
      redirect(publicRoutes.auth.SIGNIN)
    }
  }, [isLoading, isAuthenticated, isError])

  useEffect(() => {
    dispatch(setUser(data))
  }, [data, dispatch])

  if (isLoading) return <Loader />

  return (
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
  )
}
