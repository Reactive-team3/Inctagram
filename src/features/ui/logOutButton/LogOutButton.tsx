'use client'
import { Button } from '@/shared/ui/button/Button'
import Icon from '@/shared/ui/icon/Icon'
import { useState } from 'react'
import { LogOutModal } from '@/features/ui/logOutModal/LogOutModal'
import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/model/user/userSlice'

export type LogOutButtonProps = {
  className?: string
}

export const LogOutButton = ({ className }: LogOutButtonProps) => {
  const [openModal, setOpenModal] = useState(false)
  const handleClose = () => setOpenModal(false)
  const handleOpen = () => setOpenModal(true)
  const userData = useSelector(selectUser)
  const email = userData?.email
  return (
    <div className={className}>
      <Button variant="transparent" onClick={handleOpen} style={{ padding: '0' }}>
        <Icon name={'log-out'} />
        <span>Log Out</span>
      </Button>
      <LogOutModal open={openModal} onClose={handleClose} emailName={email} />
    </div>
  )
}
