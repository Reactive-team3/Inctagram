import { Cards } from '@/shared/ui/cards/Cards'
import { CreateNewPasswordForm } from '@/features/ui/createNewPassword/createNewPasswordForm'
import { Typography } from '@/shared/ui/typography/Typography'
import styles from './createNewPassword.module.scss'

const CreateNewPassword = () => {
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

export default CreateNewPassword
