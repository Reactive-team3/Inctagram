'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { emailSchema, FormValues } from '@/features/model/forgotPasswordSchema'
import { Button } from '@/shared/ui/button/Button'
import { Typography } from '@/shared/ui/typography/Typography'
import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { ReCaptcha } from '@/shared/ui/recaptcha/ReCaptcha'

import Link from 'next/link'
import styles from './forgotPasswordForm.module.scss'
import { usePasswordRecoveryMutation } from '@/features/auth/model/authApi'

import { publicRoutes } from '@/shared/config/routes/routes'


export const ForgotPasswordForm = () => {
  const [active, setActive] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(emailSchema),
    mode: 'onBlur',
    defaultValues: { email: '' },
  })


  const [passwordRecovery, { isLoading }] = usePasswordRecoveryMutation()

  const emailValue = watch('email')

  const isFormValid = emailValue && !errors.email && !!captchaToken
  const isButtonDisabled = isSubmitting || !isFormValid

  const onSubmit = async (data: FormValues) => {

    if (!captchaToken) return

    reset()
    setActive(true)
    setCaptchaToken(null)
    return data
  }


    try {
      await passwordRecovery({
        email: data.email,
        recaptchaToken: captchaToken,
      }).unwrap()

      setActive(true)
      reset()
      setCaptchaToken(null)
    } catch (e) {
      console.error(e)
    }
  }

  const handleRecaptchaVerify = (token: string) => setCaptchaToken(token)
  const handleRecaptchaExpired = () => setCaptchaToken(null)

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        name="email"
        label="Email"
        control={control}
        placeholder="example@example.com"
      />

      <Typography as="p" variant="subtitle1" className={styles.instructions}>
        Enter your email address and we will send you further instructions
      </Typography>

      {!active ? (
        <>
          <Button
            type="submit"
            className={styles.sendButton}
            fullWidth
            variant="primary"
            disabled={isButtonDisabled}
          >
            {isLoading ? 'Sending...' : 'Send Link'}
          </Button>

          <Button
            as={Link}
            variant="text"
            className={styles.backButton}
            href={publicRoutes.auth.SIGNIN}
          >
            Back to Sign In
          </Button>

          <div className={styles.recaptchaContainer}>
            <ReCaptcha onVerify={handleRecaptchaVerify} onExpired={handleRecaptchaExpired} />
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
