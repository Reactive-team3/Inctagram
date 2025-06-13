'use client'
import styles from './signUpSocialButtons.module.scss'
import Image from 'next/image'
import { Button } from '@/shared/ui/button/Button'

export const SignUpSocialButtons = () => {
  return (
    <div className={styles.socialButtons}>
      <Button variant="text" className={styles.socialButton} type="button">
        <Image src="../../icons/google.svg" alt="google" width={36} height={36} />
      </Button>
      <Button variant="text" className={styles.socialButton} type="button">
        <Image src="../../icons/github.svg" alt="github" width={36} height={36} />
      </Button>
    </div>
  )
}
