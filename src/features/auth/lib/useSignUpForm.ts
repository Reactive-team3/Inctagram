import { useForm } from 'react-hook-form'
import { SignUpFormValues, signUpSchema } from '@/features/model/signUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation } from '@/features/auth/model/authApi'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { addNotification } from '@/shared/model/notifications/notificationsSlice'
import { useState } from 'react'

export const useSignUpForm = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    defaultValues: { agreeToTerms: false },
  })

  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [register, { isLoading }] = useRegisterMutation()
  const dispatch = useDispatch()

  const onModalClose = () => {
    setModalOpen(false)
  }

  const onSubmit = async (data: SignUpFormValues) => {
    const result = await register({
      email: data.email,
      password: data.password,
      username: data.username,
    })

    if (!('error' in result)) {
      dispatch(
        addNotification({
          id: nanoid(),
          message: 'Successfully registered',
          variant: 'success',
          duration: 4000,
        })
      )
      form.reset()
      setEmail(data.email)
      setModalOpen(true)
    }
  }

  return {
    ...form,
    onSubmit,
    isLoading,
    modalOpen,
    onModalClose,
    email,
  }
}
