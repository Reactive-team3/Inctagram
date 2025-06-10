'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useConfirmEmailMutation } from '@/features/auth/model/authApi'
import styles from './emailConfirmation.module.scss'
import { Loader } from '@/shared/ui/loader/Loader'

type Props = {
  code?: string
}

export const EmailConfirmationClient = ({ code }: Props) => {
  const router = useRouter()
  const [confirmEmail] = useConfirmEmailMutation()

  useEffect(() => {
    if (!code) return

    const confirm = async () => {
      try {
        await confirmEmail({ code }).unwrap()
        router.replace('/congratulations')
      } catch {
        router.replace('/verification')
      }
    }

    confirm()
  }, [code, confirmEmail, router])

  return (
    <div className={styles.confirm}>
      <Loader />
    </div>
  )
}
