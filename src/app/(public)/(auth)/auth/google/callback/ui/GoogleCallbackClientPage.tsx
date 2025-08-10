'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { privateRoutes, publicRoutes } from '@/shared/config/routes/routes'
import { useMeQuery } from '@/features/auth/model/authApi'
import { Loader } from '@/shared/ui/loader/Loader'
import { setUser } from '@/shared/model/user/userSlice'

export default function GoogleCallbackClientPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  const { data, isLoading, isError } = useMeQuery()

  useEffect(() => {
    if (!isLoading && data) {
      // сохраняем данные пользователя в стор
      dispatch(setUser(data))
      router.push(privateRoutes.MY_PROFILE)
    }

    if (!isLoading && isError) {
      router.push(publicRoutes.auth.SIGNIN)
    }
  }, [isLoading, data, isError, router, dispatch])

  return <>{isLoading && <Loader />}</>
}
