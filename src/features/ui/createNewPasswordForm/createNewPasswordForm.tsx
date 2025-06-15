'use client'
import styles from './createNewPasswordForm.module.scss'
import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { Button } from '@/shared/ui/button/Button'
import { Typography } from '@/shared/ui/typography/Typography'

import { useNewPassword } from '@/features/auth/lib/useNewPassword'
import { Loader } from '@/shared/ui/loader/Loader'

type props = {
  code?: string
}

export const CreateNewPasswordForm = ({ code }: props) => {
  const { onSubmit, control, handleSubmit, isLoading } = useNewPassword({ code })

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        placeholder="Password"
        control={control}
        name="password"
        label="New Password"
        type="password"
      />
      <ControlledInput
        placeholder="Password confirmation"
        control={control}
        name="passwordConfirmation"
        label="Password confirmation"
        type="password"
      />
      <Typography as="p" variant="subtitle1" className={styles.text}>
        Your password must be between 6 and 20 characters
      </Typography>

      <Button fullWidth type="submit" className={styles.buttonSubmit}>
        Create New Password
      </Button>

      {isLoading && <Loader />}
    </form>
  )
}
