'use client'

import { useMeQuery } from '@/features/auth/model/authApi'
import { Header } from '@/widgets/header'
import { useSelector } from 'react-redux'
import { selectIsLoggingIn } from '@/shared/model/auth/authSlice'

export const HeaderWrapper = () => {
  const isLoggedIn = useSelector(selectIsLoggingIn)

  const { data } = useMeQuery(undefined, { skip: isLoggedIn })
  return (
    <>
      <Header data={data} />
    </>
  )
}
