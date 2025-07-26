import styles from '@/features/ui/signUpSocialButtons/signUpSocialButtons.module.scss'
import Image from 'next/image'
import { Button } from '@/shared/ui/button/Button'

export const GitHubAuthButton = () => {
  const handleLogin = () => {
    window.location.href = 'https://pickandstore.com/api/v1/auth/github'
  }
  return (
    <Button variant="text" className={styles.socialButton} type="button" onClick={handleLogin}>
      <Image src="../../icons/github.svg" alt="github" width={36} height={36} />
    </Button>
  )
}
