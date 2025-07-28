'use client'
import styles from './signUpSocialButtons.module.scss'
import { GoogleAuthButton } from '@/features/ui/googleAuthButton/GoogleAuthButton'
import { GitHubAuthButton } from '@/features/ui/githubAuthButton/GitHubAuthButton'

export const SignUpSocialButtons = () => {
  return (
    <div className={styles.socialButtons}>
      <GoogleAuthButton />
      <GitHubAuthButton />
    </div>
  )
}
