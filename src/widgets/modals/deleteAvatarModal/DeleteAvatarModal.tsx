import { Modal } from '@/shared/ui/modal/Modal'
import { DeleteAvatarModalChildren } from '@/widgets/modals/deleteAvatarModal/deleteAvatarModalChildren/DeleteAvatarModalChildren'

export type LogOutModalProps = {
  open: boolean
  onClose: () => void
}

export const DeleteAvatarModal = ({ open, onClose }: LogOutModalProps) => {
  return (
    <Modal open={open} onClose={onClose} modalTitle={'Delete Photo'}>
      <DeleteAvatarModalChildren onClick={onClose}></DeleteAvatarModalChildren>
    </Modal>
  )
}
