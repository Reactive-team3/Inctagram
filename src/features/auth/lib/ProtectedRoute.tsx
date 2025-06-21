'use client'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { selectAccessToken, setAccessToken } from '@/shared/model/auth/authSlice'
import { useRefreshTokenMutation } from '@/features/auth/model/authApi'
import { Loader } from '@/shared/ui/loader/Loader'
import { publicRoutes } from '@/shared/config/routes/routes'

interface Props {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const token = useSelector(selectAccessToken)
  const dispatch = useDispatch()
  const router = useRouter()

  const [checked, setChecked] = useState(false)

  // RTK Query hook для обновления токена
  const [refreshToken, { isLoading: refreshisLoading }] = useRefreshTokenMutation()
  useEffect(() => {
    async function checkAuth() {
      if (!token) {
        try {
          const res = await refreshToken().unwrap()
          dispatch(setAccessToken(res.accessToken))
          setChecked(true)
        } catch {
          router.replace(publicRoutes.auth.SIGNIN)
        }
      } else {
        setChecked(true)
      }
    }

    checkAuth()
  }, [token, dispatch, router, refreshToken])

  if (!checked || refreshisLoading) return <Loader />

  return <>{children}</>
}
