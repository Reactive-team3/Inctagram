'use client'

import styles from './forgotPasswordForm.module.scss'
import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { emailSchema, FormValues } from '@/features/model/forgotPasswordSchema'
import { Button } from '@/shared/ui/button/Button'
import { Typography } from '@/shared/ui/typography/Typography'
import Link from 'next/link'
import { ReCaptcha } from '@/shared/ui/recaptcha/ReCaptcha'

export const ForgotPasswordForm = () => {
  const [active, setActive] = useState<boolean>(false)
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
    reValidateMode: 'onBlur',
    defaultValues: {
      email: '',
    },
  })

  // Отслеживаем значение email поля
  const emailValue = watch('email')

  // Проверяем, валидна ли форма и подтвержден ли reCAPTCHA
  const isFormValid = emailValue && !errors.email && !!captchaToken
  const isButtonDisabled = isSubmitting || !isFormValid

  const onSubmit = async (data: FormValues) => {
    reset()
    setActive(true)
    setCaptchaToken(null) // Сбрасываем токен после отправки
    return data
  }

  const handleRecaptchaVerify = (token: string) => {
    setCaptchaToken(token)
  }

  const handleRecaptchaExpired = () => {
    setCaptchaToken(null)
  }

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
            {isSubmitting ? 'Sending...' : 'Send Link'}
          </Button>

          <Button as={Link} variant="text" className={styles.backButton} href="/signin">
            Back to Sign In
          </Button>

          {/* ReCaptcha компонент */}
          <div className={styles.recaptchaContainer}>
            <ReCaptcha onVerify={handleRecaptchaVerify} onExpired={handleRecaptchaExpired} />
          </div>
        </>
      ) : (
        <>
          <Typography as="p" variant="subtitle2" className={styles.instructionsActive}>
            The link has been sent by email.
            <br />
            If you dont receive an email send link again
          </Typography>
          <Button fullWidth type="submit" className={styles.sendButton} disabled={isSubmitting}>
            Send Link Again
          </Button>

          <Button type="button" variant="text" className={styles.backButton}>
            Back to Sign In
          </Button>
        </>
      )}
    </form>
  )
}
