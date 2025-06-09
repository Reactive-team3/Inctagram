import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEmailResendingMutation } from '@/features/auth/model/authApi'
import { verificationSchema, VerificationValues } from '@/features/model/verificationSchema'

export const useEmailResendingForm = () => {
  const form = useForm<VerificationValues>({
    resolver: zodResolver(verificationSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const [verification, { isLoading }] = useEmailResendingMutation()

  const onSubmit = async (data: VerificationValues) => {
    const result = await verification({
      email: data.email,
    })

    if (!('error' in result)) {
      form.reset()
    }
  }

  return {
    ...form,
    onSubmit,
    isLoading,
  }
}
