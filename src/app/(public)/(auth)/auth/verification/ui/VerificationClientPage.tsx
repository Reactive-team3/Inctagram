import styles from './verification.module.scss'
import { Typography } from '@/shared/ui/typography/Typography'
import { VerificationForm } from '@/features/ui/verivicationForm/VerificationForm'
import Image from 'next/image'

export const VerificationClientPage = () => {
  return (
    <div className={styles.verificationPage}>
      <div className={styles.verificationActiveBlock}>
        <div className={styles.info}>
          <Typography as="h1" variant="h1">
            Email verification link expired
          </Typography>
          <Typography as="p" variant="body1">
            Looks like the verification link has expired. Not to worry, we can send the link again
          </Typography>
        </div>
        <VerificationForm />
      </div>
      <div className={styles.picture}>
        <Image src="/auth-images/rafiki.png" alt="rafiki" width={473} height={353} priority />
      </div>
    </div>
  )
}
