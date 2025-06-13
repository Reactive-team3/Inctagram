import { Cards } from '@/shared/ui/cards/Cards'
import { Typography } from '@/shared/ui/typography/Typography'
import styles from './forgotPassword.module.scss'
import { ForgotPasswordForm } from '@/features/ui/forgotPasswordForm/forgotPasswordForm'

export const ForgotPasswordClientPage = () => {
  return (
    <div>
      <Cards>
        <Typography as="h1" variant="h1" className={styles.title}>
          Forgot Password
        </Typography>
        <ForgotPasswordForm />
      </Cards>
    </div>
  )
}
