'use client'

import styles from './confirm.module.scss'
import { Loader } from '@/shared/ui/loader/Loader'
import { useEmailConfirmation } from '@/features/auth/lib/useEmailConfirmation'
const Page = () => {
  useEmailConfirmation()

  return (
    <div className={styles.confirm}>
      <Loader />
    </div>
  )
}

export default Page
