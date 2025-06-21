'use client'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {
  selectAccessToken,
  selectIsLoggingOut,
  setAccessToken,
} from '@/shared/model/auth/authSlice'
import { useRefreshTokenMutation } from '@/features/auth/model/authApi'
import { Loader } from '@/shared/ui/loader/Loader'
import { publicRoutes } from '@/shared/config/routes/routes'

interface Props {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const token = useSelector(selectAccessToken)
  const isLoggingOut = useSelector(selectIsLoggingOut)
  const dispatch = useDispatch()
  const router = useRouter()

  const [checked, setChecked] = useState(false)

  const [refreshToken, { isLoading: refreshisLoading }] = useRefreshTokenMutation()

  useEffect(() => {
    async function checkAuth() {
      // Don't refresh token during logout process
      if (isLoggingOut) {
        router.replace(publicRoutes.MAIN_PAGE)
        return
      }

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
  }, [token, isLoggingOut, dispatch, router, refreshToken])

  // Show loader during auth check or logout process
  if (!checked || refreshisLoading || isLoggingOut) return <Loader />

  return <>{children}</>
}
