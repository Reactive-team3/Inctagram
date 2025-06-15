'use client'
import styles from './signUpForm.module.scss'
import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { Button } from '@/shared/ui/button/Button'
import { ControlledCheckbox } from '@/shared/ui/controlled/ControlledСheckbox'
import { Typography } from '@/shared/ui/typography/Typography'
import { Loader } from '@/shared/ui/loader/Loader'
import { useSignUpForm } from '@/features/auth/lib/useSignUpForm'
import Link from 'next/link'
import AuthModal from '@/shared/ui/signUpModal/AuthModal'
import { publicRoutes } from '@/shared/config/routes/routes'

export const SignUpForm = () => {
  const { control, handleSubmit, onSubmit, isLoading, modalOpen, onModalClose, email } =
    useSignUpForm()

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <AuthModal onClose={onModalClose} open={modalOpen} modalTitle="Email sent">
        We have sent a link to confirm your email to {email}
      </AuthModal>

      <ControlledInput placeholder="Username" control={control} name="username" label="Username" />
      <ControlledInput placeholder="Email" control={control} name="email" label="Email" />
      <ControlledInput
        placeholder="Password"
        control={control}
        name="password"
        label="Password"
        type="password"
      />
      <ControlledInput
        placeholder="Password confirmation"
        control={control}
        name="passwordConfirmation"
        label="Password confirmation"
        type="password"
      />

      <div className={styles.block}>
        <ControlledCheckbox control={control} name={'agreeToTerms'} defaultValue={false} />
        <Typography as="div" variant="body2">
          I agree to the
          <Button as={Link} variant="transparent" href={publicRoutes.auth.TERMS}>
            <Typography variant="link1">Terms of Service </Typography>
          </Button>
          and
          <Button as={Link} variant="transparent" href={publicRoutes.auth.POLICY}>
            <Typography variant="link1">Privacy Policy</Typography>
          </Button>
        </Typography>
      </div>

      <Button disabled={isLoading} fullWidth type="submit">
        Submit
      </Button>
      {isLoading && <Loader />}
      <Typography variant="body1">Do you have an account?</Typography>
      <Button as={Link} variant="text" href={publicRoutes.auth.SIGNIN}>
        Sign In
      </Button>
    </form>
  )
}
