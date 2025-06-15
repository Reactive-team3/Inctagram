'use client'

import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { Button } from '@/shared/ui/button/Button'
import styles from './verificationForm.module.scss'
import { useEmailResendingForm } from '@/features/auth/lib/useEmailResendingForm'
import { Loader } from '@/shared/ui/loader/Loader'
import { ReCaptcha } from '@/shared/ui/recaptcha/ReCaptcha'
import SignUpModal from '@/shared/ui/signUpModal/SignUpModal'

export const VerificationForm = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    setCaptchaToken,
    modalOpen,
    onModalClose,
    email,
  } = useEmailResendingForm()

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <SignUpModal onClose={onModalClose} open={modalOpen} email={email} modalTitle="Email sent" />
      <ControlledInput placeholder="Email" control={control} name="email" label="Email" />
      <Button disabled={isLoading} fullWidth type="submit">
        Submit
      </Button>
      <ReCaptcha onVerify={setCaptchaToken} onExpired={() => setCaptchaToken(null)} />
      {isLoading && <Loader />}
    </form>
  )
}
