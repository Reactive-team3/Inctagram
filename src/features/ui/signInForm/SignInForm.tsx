'use client'
import styles from './signInForm.module.scss'
import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'
import { Loader } from '@/shared/ui/loader/Loader'
import { Typography } from '@/shared/ui/typography/Typography'
import { useSignInForm } from '@/features/auth/lib/useSignInForm'
import { publicRoutes } from '@/shared/config/routes/routes'

export const SignInForm = () => {
  const { control, handleSubmit, onSubmit, isLoading } = useSignInForm()

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput placeholder="Email" control={control} name="email" label="Email" />
      <ControlledInput
        placeholder="Password"
        control={control}
        name="password"
        label="Password"
        type="password"
      />
      <div className={styles.buttons}>
        <Button
          as={Link}
          href={publicRoutes.auth.FORGOT_PASSWORD}
          variant="text"
          className={styles.forgotPasswordButton}
          style={{ color: 'grey' }}
        >
          Forgot Password
        </Button>
        <Button type="submit" fullWidth>
          Sign In
        </Button>
        {isLoading && <Loader />}
        <Typography variant="body1">Don’t have an account?</Typography>
        <Button as={Link} href={publicRoutes.auth.SIGNUP} variant={'text'}>
          Sign Up
        </Button>
      </div>
    </form>
  )
}
