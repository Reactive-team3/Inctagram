'use client'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { selectAccessToken } from '@/shared/model/auth/authSlice'
import { Loader } from '@/shared/ui/loader/Loader'

interface Props {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const token = useSelector(selectAccessToken)
  const router = useRouter()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!token) {
      // router.replace(publicRoutes.auth.SIGNIN)
      router.replace('/')
    } else {
      setChecked(true)
    }
  }, [token, router])

  if (!checked) return <Loader />

  return <>{children}</>
}
