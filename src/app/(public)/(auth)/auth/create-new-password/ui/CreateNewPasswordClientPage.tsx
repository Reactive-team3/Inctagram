import { Cards } from '@/shared/ui/cards/Cards'
import { Typography } from '@/shared/ui/typography/Typography'
import styles from './createNewPassword.module.scss'
import { CreateNewPasswordForm } from '@/features/ui/createNewPasswordForm/createNewPasswordForm'

export const CreateNewPasswordClientPage = () => {
  return (
    <div>
      <Cards>
        <Typography as="h1" variant="h1" className={styles.title}>
          Create New Password
        </Typography>
        <CreateNewPasswordForm />
      </Cards>
    </div>
  )
}
