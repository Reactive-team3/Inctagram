'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import styles from './signInForm.module.scss'
import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'
import { SignInFormValues, signInSchema } from '@/features/model/signInSchema'

export const SignInForm = () => {
  const { control, handleSubmit, reset } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const onSubmit = (data: SignInFormValues) => {
    reset()
    return data
  }

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
          href="/forgotPassword"
          variant={'text'}
          className={styles.forgotPasswordButton}
          style={{ color: 'grey' }}
        >
          Forgot Password
        </Button>
        <Button type="submit" fullWidth>
          Sign In
        </Button>
        <Button as={Link} href="/signup" variant={'text'} style={{ color: 'white' }}>
          Don’t have an account?
        </Button>
        <Button as={Link} href="/signup" variant={'text'}>
          Sign Up
        </Button>
      </div>
    </form>
  )
}
