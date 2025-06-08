import { Cards } from '@/shared/ui/cards/Cards'
import { ForgotPasswordForm } from '@/features/ui/forgotPasswordForm/forgotPasswordForm'
import { Typography } from '@/shared/ui/typography/Typography'
import styles from './forgotPassword.module.scss'

const ForgotPassword = () => {
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
export default ForgotPassword
