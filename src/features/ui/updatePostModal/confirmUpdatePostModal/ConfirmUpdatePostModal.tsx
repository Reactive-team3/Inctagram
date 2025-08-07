import React from 'react'
import { Modal } from '@/shared/ui/modal/Modal'

type ConfirmUpdatePostModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
}

export const ConfirmUpdatePostModal = ({
  open,
  children,
  onClose,
  className,
}: ConfirmUpdatePostModalProps) => {
  return (
    <Modal open={open} onClose={onClose} modalTitle={'Close Post'} className={className}>
      {children}
    </Modal>
  )
}
