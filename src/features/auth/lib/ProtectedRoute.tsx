'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { selectAccessToken } from '@/shared/model/auth/authSlice'
import { useRefreshTokenMutation } from '@/features/auth/model/authApi'
import { Loader } from '@/shared/ui/loader/Loader'

interface Props {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: Props) {
  const token = useSelector(selectAccessToken)
  const router = useRouter()
  const [checked, setChecked] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const [refreshToken] = useRefreshTokenMutation()

  useEffect(() => {
    const checkAuth = async () => {
      // If token exists, user is authenticated
      if (token) {
        setChecked(true)
        return
      }

      // No token, try to refresh
      setIsRefreshing(true)

      try {
        // const result = await refreshToken().unwrap()

        // Refresh successful - Redux should be updated by RTK Query
        // The token selector will update, triggering another useEffect
        setChecked(true)
      } catch (error) {
        // Refresh failed - redirect to login
        console.warn('Refresh token failed:', error)
        router.replace('/')
      } finally {
        setIsRefreshing(false)
      }
    }

    checkAuth()
  }, [token, router, refreshToken])

  // Show loading while checking auth or refreshing
  if (!checked || isRefreshing) {
    return <Loader />
  }

  return <>{children}</>
}

//
// import { useSelector } from 'react-redux'
// import { useRouter } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { selectAccessToken } from '@/shared/model/auth/authSlice' // если store лежит в shared/lib
//
// interface Props {
//   children: React.ReactNode
// }
//
// export function ProtectedRoute({ children }: Props) {
//   const token = useSelector(selectAccessToken)
//   const router = useRouter()
//   const [checked, setChecked] = useState(false)
//
//   useEffect(() => {
//     if (!token) {
//       router.replace('/') // гость → на /
//     } else {
//       setChecked(true)
//     }
//   }, [token, router])
//
//   if (!checked) return null
//
//   return <>{children}</>
// }
