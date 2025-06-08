import styles from './congratulation.module.scss'
import { Typography } from '@/shared/ui/typography/Typography'
import Image from 'next/image'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'

const Congratulation = () => {
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
        <Button as={Link} href="/signin">
          Sign In
        </Button>
      </div>
      <div className={styles.picture}>
        <Image src="/auth-images/bro.png" alt="rafiki" width={432} height={300} priority />
      </div>
    </div>
  )
}

export default Congratulation
