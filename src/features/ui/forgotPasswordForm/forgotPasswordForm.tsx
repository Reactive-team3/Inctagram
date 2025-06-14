'use client'

import { Button } from '@/shared/ui/button/Button'
import { Typography } from '@/shared/ui/typography/Typography'
import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { ReCaptcha } from '@/shared/ui/recaptcha/ReCaptcha'

import Link from 'next/link'
import styles from './forgotPasswordForm.module.scss'

import { publicRoutes } from '@/shared/config/routes/routes'
import { useForgotPassword } from '@/features/auth/lib/useForgotPassword'
import { Loader } from '@/shared/ui/loader/Loader'
import AuthModal from '@/shared/ui/signUpModal/AuthModal'

export const ForgotPasswordForm = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isLoading,
    setCaptchaToken,
    modalOpen,
    onModalClose,
    email,
    isLinkSent,
  } = useForgotPassword()

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <AuthModal onClose={onModalClose} open={modalOpen} modalTitle="Email sent">
        We have sent a link to confirm your email to {email}
      </AuthModal>

      <ControlledInput
        name="email"
        label="Email"
        control={control}
        placeholder="example@example.com"
      />

      <Typography as="p" variant="subtitle1" className={styles.instructions}>
        Enter your email address and we will send you further instructions
      </Typography>

      {!isLinkSent ? (
        <>
          <Button
            type="submit"
            className={styles.sendButton}
            fullWidth
            variant="primary"
            disabled={isLoading}
          >
            Send Link
          </Button>

          <Button
            as={Link}
            variant="text"
            className={styles.backButton}
            href={publicRoutes.auth.SIGNIN}
          >
            Back to Sign In
          </Button>
          {isLoading && <Loader />}
          <div className={styles.recaptchaContainer}>
            <ReCaptcha onVerify={setCaptchaToken} onExpired={() => setCaptchaToken(null)} />
          </div>
        </>
      ) : (
        <>
          <Typography as="p" variant="subtitle2" className={styles.instructionsActive}>
            The link has been sent by email.
            <br />
            If you don’t receive an email, try again.
          </Typography>
          <Button fullWidth type="submit" className={styles.sendButton} disabled={isLoading}>
            Send Link Again
          </Button>

          <Button
            as={Link}
            variant="text"
            className={styles.backButton}
            href={publicRoutes.auth.SIGNIN}
          >
            Back to Sign In
          </Button>
        </>
      )}
    </form>
  )
}
