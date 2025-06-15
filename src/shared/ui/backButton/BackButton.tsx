'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/shared/ui/button/Button'
import Icon from '@/shared/ui/icon/Icon'
import styles from './backButton.module.scss'
export const BackButton = () => {
  const router = useRouter()
  return (
    <Button variant="transparent" onClick={() => router.back()}>
      <Icon name="arrow-forward" className={styles.icon} />
      <span>Back to Sign Up</span>
    </Button>
  )
}
