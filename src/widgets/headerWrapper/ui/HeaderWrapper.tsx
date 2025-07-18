'use client'

import { Header } from '@/widgets/header'
import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/model/user/userSlice'

export const HeaderWrapper = () => {
  const data = useSelector(selectUser)
  return (
    <>
      <Header data={data} />
    </>
  )
}
