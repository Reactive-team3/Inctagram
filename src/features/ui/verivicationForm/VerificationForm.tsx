'use client'

import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { Button } from '@/shared/ui/button/Button'
import styles from './verificationForm.module.scss'
import { useEmailResendingForm } from '@/features/auth/lib/useEmailResendingForm'
import { Loader } from '@/shared/ui/loader/Loader'

export const VerificationForm = () => {
  const { control, handleSubmit, onSubmit, isLoading } = useEmailResendingForm()

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput placeholder="Email" control={control} name="email" label="Email" />
      <Button disabled={isLoading} fullWidth type="submit">
        Submit
      </Button>
      {isLoading && <Loader />}
    </form>
  )
}
