'use client'
import styles from './signUpSocialButtons.module.scss'
import Icon from '@/shared/ui/icon/Icon'

export const SignUpSocialButtons = () => {
  return (
    <div className={styles.socialButtons}>
      <button className={styles.socialButton} type="button">
        <Icon name="google" />
      </button>
      <button className={styles.socialButton} type="button">
        <Icon name="done-all-outline" />
      </button>
    </div>
  )
}
