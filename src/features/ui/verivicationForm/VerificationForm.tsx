'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { Button } from '@/shared/ui/button/Button'
import { verificationSchema, VerificationValues } from '@/features/model/verificationSchema'
import styles from './verificationForm.module.scss'

export const VerificationForm = () => {
  const { control, handleSubmit, reset } = useForm<VerificationValues>({
    resolver: zodResolver(verificationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const onSubmit = (data: VerificationValues) => {
    reset()
    return data
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput placeholder="Email" control={control} name="email" label="Email" />
      <Button fullWidth type="submit">
        Submit
      </Button>
    </form>
  )
}
