'use client'

import styles from './forgotPasswordForm.module.scss'
import { Checkbox } from '@/shared/ui/Checkbox/Checkbox'
import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useState } from 'react'
import { emailSchema, FormValues } from '@/features/model/forgotPasswordSchema'
import { Button } from '@/shared/ui/button/Button'
import { Typography } from '@/shared/ui/typography/Typography'
import Image from 'next/image'

export const ForgotPasswordForm = () => {
  const [active, setActive] = useState<boolean>(false)
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState<boolean>(false)

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
  const isFormValid = emailValue && !errors.email && isRecaptchaVerified
  const isButtonDisabled = isSubmitting || !isFormValid

  const onSubmit = async (data: FormValues) => {
    reset()
    setActive(true)
    return data
  }

  const handleRecaptchaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsRecaptchaVerified(e.target.checked)
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

          <Button type="button" variant="text" className={styles.backButton}>
            Back to Sign In
          </Button>

          <div className={styles.checkBlock}>
            <Checkbox
              label="I'm not a robot"
              onChange={handleRecaptchaChange}
              checked={isRecaptchaVerified}
            />
            <Image
              src="/icons/recaptcha.svg"
              alt="recaptcha"
              width={44}
              height={55}
              priority={false}
              className={styles.captchaIcon}
            />
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
