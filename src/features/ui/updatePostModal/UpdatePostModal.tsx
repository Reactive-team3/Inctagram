import React from 'react'
import { Modal } from '@/shared/ui/modal/Modal'

type UpdatePostModalProps = {
  open: boolean
  onClose: () => void
  className?: string
  children: React.ReactNode
}
export const UpdatePostModal = ({ open, onClose, className, children }: UpdatePostModalProps) => {
  return (
    <Modal open={open} onClose={onClose} size={'xl'} modalTitle={'Edit post'} className={className}>
      {children}
    </Modal>
  )
}
