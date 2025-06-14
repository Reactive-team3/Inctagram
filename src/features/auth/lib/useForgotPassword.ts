import { useForm } from 'react-hook-form'
import { emailSchema, FormValues } from '@/features/model/forgotPasswordSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePasswordRecoveryMutation } from '@/features/auth/model/authApi'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { publicRoutes } from '@/shared/config/routes/routes'

export const useForgotPassword = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(emailSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const [passwordRecovery, { isLoading }] = usePasswordRecoveryMutation()
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [isLinkSent, setIsLinkSent] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const onModalClose = () => {
    setModalOpen(false)
    router.replace(publicRoutes.auth.SIGNIN)
  }

  const onSubmit = async (data: FormValues) => {
    const result = await passwordRecovery({
      email: data.email,
      recaptchaToken: captchaToken!,
    })

    if (!('error' in result)) {
      form.reset()
      setEmail(data.email)
      setModalOpen(true)
      setIsLinkSent(true)
    }
  }

  return {
    ...form,
    onSubmit,
    isLoading,
    setCaptchaToken,
    modalOpen,
    onModalClose,
    email,
    isLinkSent,
  }
}
