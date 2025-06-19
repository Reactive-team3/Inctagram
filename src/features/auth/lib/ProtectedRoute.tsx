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
  const [refreshToken, { isLoading: refreshLoading }] = useRefreshTokenMutation()

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

  if (!checked || refreshLoading) return <Loader />

  return <>{children}</>
}
// 'use client'
// import { useSelector } from 'react-redux'
// import { useRouter } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { selectAccessToken } from '@/shared/model/auth/authSlice'
// import { Loader } from '@/shared/ui/loader/Loader'
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
//       // router.replace(publicRoutes.auth.SIGNIN)
//       router.replace('/')
//     } else {
//       setChecked(true)
//     }
//   }, [token, router])
//
//   if (!checked) return <Loader />
//
//   return <>{children}</>
// }
