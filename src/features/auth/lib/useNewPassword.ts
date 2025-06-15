import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNewPasswordMutation } from '@/features/auth/model/authApi'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import {
  createNewPasswordSchema,
  createNewPasswordSchemaFormValues,
} from '@/features/model/createNewPasswordSchema'
import { publicRoutes } from '@/shared/config/routes/routes'
import { addNotification } from '@/shared/model/notifications/notificationsSlice'

type useNewPasswordProps = {
  code?: string
}

export const useNewPassword = ({ code }: useNewPasswordProps) => {
  const router = useRouter()
  const handleRedirect = () => {
    router.push(publicRoutes.auth.SIGNIN)
  }
  const form = useForm<createNewPasswordSchemaFormValues>({
    resolver: zodResolver(createNewPasswordSchema),
    mode: 'onBlur',
  })

  const [newPassword, { isLoading }] = useNewPasswordMutation()
  const dispatch = useDispatch()

  const onSubmit = async (data: createNewPasswordSchemaFormValues) => {
    const result = await newPassword({
      newPassword: data.password,
      recoveryCode: code!,
    })

    if (!('error' in result)) {
      dispatch(
        addNotification({
          id: nanoid(),
          message: 'Password has been changed',
          variant: 'success',
          duration: 4000,
        })
      )
      form.reset()
      handleRedirect()
    }
  }

  return {
    ...form,
    onSubmit,
    isLoading,
  }
}
