'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styles from './createNewPasswordForm.module.scss'
import { ControlledInput } from '@/shared/ui/controlled/ControlledInput'
import { Button } from '@/shared/ui/button/Button'
import { Typography } from '@/shared/ui/typography/Typography'
import {
  createNewPasswordSchema,
  createNewPasswordSchemaFormValues,
} from '@/features/model/createNewPasswordSchema'

export const CreateNewPasswordForm = () => {
  const { control, handleSubmit, reset } = useForm<createNewPasswordSchemaFormValues>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const onSubmit = (data: createNewPasswordSchemaFormValues) => {
    reset()
    return data
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        placeholder="Password"
        control={control}
        name="password"
        label="New Password"
        type="password"
      />
      <ControlledInput
        placeholder="Password confirmation"
        control={control}
        name="passwordConfirmation"
        label="Password confirmation"
        type="password"
      />
      <Typography as="p" variant="subtitle1" className={styles.text}>
        Your password must be between 6 and 20 characters
      </Typography>

      <Button fullWidth type="submit" className={styles.buttonSubmit}>
        Create New Password
      </Button>
    </form>
  )
}
