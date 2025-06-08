'use client'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { SignUpFormValues, signUpSchema } from '@/features/model/signUpSchema'
import styles from './signUpForm.module.scss'
import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { Button } from '@/shared/ui/button/Button'
import { ControlledCheckbox } from '@/shared/ui/controlled/ControlledСheckbox'
import { Typography } from '@/shared/ui/typography/Typography'
import { useRegisterMutation } from '@/features/auth/model/authApi'
import { Loader } from '@/shared/ui/loader/Loader'

export const SignUpForm = () => {
  const { control, handleSubmit, reset } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      agreeToTerms: false,
    },
  })

  const [register, { isLoading }] = useRegisterMutation()

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await register({
        email: data.email,
        password: data.password,
        username: data.username,
      }).unwrap()
      reset()
    } catch (e) {
      console.error('Registration failed', e)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
          <Typography variant="link1">Terms of Service </Typography> and
          <Typography variant="link1">Privacy Policy</Typography>
        </Typography>
      </div>

      <Button disabled={isLoading} fullWidth type="submit">
        Submit
      </Button>
      {isLoading && <Loader />}
      <Typography variant="body1">Do you have an account?</Typography>
      <Typography as="h3" variant="link2">
        Sign In
      </Typography>
    </form>
  )
}
