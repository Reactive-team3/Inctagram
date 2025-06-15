import { Cards } from '@/shared/ui/cards/Cards'
import { Typography } from '@/shared/ui/typography/Typography'
import styles from './createNewPassword.module.scss'
import { CreateNewPasswordForm } from '@/features/ui/createNewPasswordForm/createNewPasswordForm'

type Props = {
  code?: string
}

export const CreateNewPasswordClientPage = ({ code }: Props) => {
  return (
    <div>
      <Cards>
        <Typography as="h1" variant="h1" className={styles.title}>
          Create New Password
        </Typography>
        <CreateNewPasswordForm code={code} />
      </Cards>
    </div>
  )
}
