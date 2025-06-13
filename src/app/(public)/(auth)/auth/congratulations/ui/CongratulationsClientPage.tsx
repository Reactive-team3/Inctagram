import { Typography } from '@/shared/ui/typography/Typography'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'
import Image from 'next/image'
import styles from './congratulation.module.scss'
import { publicRoutes } from '@/shared/config/routes/routes'

export const CongratulationsClientPage = () => {
  return (
    <div className={styles.congratulationPage}>
      <div className={styles.congratulationActiveBlock}>
        <div className={styles.info}>
          <Typography as="h1" variant="h1">
            Congratulations
          </Typography>
          <Typography as="p" variant="body1">
            Your email has been confirmed
          </Typography>
        </div>
        <Button as={Link} href={publicRoutes.auth.SIGNIN}>
          Sign In
        </Button>
      </div>
      <div className={styles.picture}>
        <Image src="/auth-images/bro.png" alt="rafiki" width={432} height={300} priority />
      </div>
    </div>
  )
}
