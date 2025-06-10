'use client'

import { useEffect } from 'react'
import { useConfirmEmailMutation } from '@/features/auth/model/authApi'
import { useRouter, useSearchParams } from 'next/navigation'
import { ServerErrorPayload } from '@/shared/listeners/globalErrorListeners'

export const useEmailConfirmation = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const code = searchParams.get('code')
  const [confirmEmail] = useConfirmEmailMutation()

  useEffect(() => {
    if (!code) return

    const confirm = async () => {
      try {
        await confirmEmail({ code }).unwrap()
        router.replace('/congratulations')
      } catch (e) {
        const error = e as ServerErrorPayload
        const message = error?.data?.errorsMessages?.[0]?.message

        if (message?.includes('already been applied')) {
          router.replace('/congratulations')
        } else {
          router.replace('/verification')
        }
      }
    }

    confirm()
  }, [code, confirmEmail, router])
}
