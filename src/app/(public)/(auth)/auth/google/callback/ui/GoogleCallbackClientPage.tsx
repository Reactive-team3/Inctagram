'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '@/shared/model/auth/authSlice'
import { publicRoutes } from '@/shared/config/routes/routes'
import { useGoogleOAuthCallbackQuery } from '@/features/auth/model/authApi'
import { Loader } from '@/shared/ui/loader/Loader'

export default function GoogleCallbackClientPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { data, isError, isSuccess } = useGoogleOAuthCallbackQuery()
  useEffect(() => {
    if (isSuccess && data?.accessToken) {
      dispatch(setAccessToken(data.accessToken))
      router.push(publicRoutes.MAIN_PAGE)
    }

    if (isError) {
      router.push(publicRoutes.auth.SIGNIN)
    }
  }, [isSuccess, isError, data, dispatch, router])

  return <Loader />
}
