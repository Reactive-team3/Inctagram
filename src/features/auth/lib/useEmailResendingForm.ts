import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEmailResendingMutation } from '@/features/auth/model/authApi'
import { verificationSchema, VerificationValues } from '@/features/model/verificationSchema'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { publicRoutes } from '@/shared/config/routes/routes'

export const useEmailResendingForm = () => {
  const form = useForm<VerificationValues>({
    resolver: zodResolver(verificationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const [verification, { isLoading }] = useEmailResendingMutation()
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const router = useRouter()

  const onModalClose = () => {
    setModalOpen(false)
    router.replace(publicRoutes.auth.SIGNIN)
  }

  const onSubmit = async (data: VerificationValues) => {
    const result = await verification({
      email: data.email,
      recaptchaToken: captchaToken!,
    })

    if (!('error' in result)) {
      form.reset()
      setEmail(data.email)
      setModalOpen(true)
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
  }
}
