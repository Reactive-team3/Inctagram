'use client'
import { Button } from '@/shared/ui/button/Button'
import Icon from '@/shared/ui/icon/Icon'
import { useState } from 'react'
import { LogOutModal } from '@/features/ui/logOutModal/LogOutModal'

export type LogOutButtonProps = {
  className?: string
}

export const LogOutButton = ({ className }: LogOutButtonProps) => {
  // const [logout] = useLogoutMutation()
  // const router = useRouter()
  // const handleLogout = async () => {
  //   try {
  //     await logout({ refreshtoken: 'some-token' }).unwrap()
  //     router.push('/signin')
  //   } catch (error) {
  //     console.log('some error')
  //   }
  // }
  const [openModal, setOpenModal] = useState(false)
  const handleClose = () => setOpenModal(false)
  const handleOpen = () => setOpenModal(true)

  return (
    <div className={className}>
      <Button variant="transparent" onClick={handleOpen} style={{ padding: '0' }}>
        <Icon name={'log-out'} />
        <span>Log Out</span>
      </Button>
      <LogOutModal open={openModal} onClose={handleClose} emailName={'JsDeveloper@gmail.com'} />
    </div>
  )
}
