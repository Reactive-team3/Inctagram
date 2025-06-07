'use client'

import styles from './forgotPasswordForm.module.scss'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { emailSchema, FormValues } from '@/features/model/forgotPasswordSchema'
import { Button } from '@/shared/ui/button/Button'
import { Typography } from '@/shared/ui/typography/Typography'

export const ForgotPasswordForm = () => {
  const [active, setActive] = useState<boolean>(false) // eslint-disable-line @typescript-eslint/no-unused-vars

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(emailSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data: FormValues) => {
    reset()
    return data
  }

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label}>Email</label>
      <ControlledInput name="email" control={control} placeholder="example@example.com" />

      <Typography as="p" variant="subtitle2" className={styles.instructions}>
        Enter your email address and we will send you further instructions
      </Typography>
      {!active ? (
        <>
          <Button type="submit" className={styles.sendButton} disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Link'}
          </Button>

          <Button type="button" className={styles.backButton}>
            Back to Sign In
          </Button>

          <div className={styles.checkBlock}>
            <Checkbox label="I'm not a robot" />
            <div className={styles.captchaIcon}>🤖</div>
          </div>
        </>
      ) : (
        <>
          <Typography as="p" variant="subtitle2" className={styles.instructionsActive}>
            The link has been sent by email.
            <br />
            If you don’t receive an email send link again
          </Typography>
          <Button type="submit" className={styles.sendButton} disabled={isSubmitting}>
            Send Link Again
          </Button>

          <Button type="button" className={styles.backButton}>
            Back to Sign In
          </Button>
        </>
      )}
    </form>
  )
}
