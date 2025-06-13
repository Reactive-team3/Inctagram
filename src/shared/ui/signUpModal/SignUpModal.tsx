'use client'

import styles from '@/features/ui/signUpForm/signUpForm.module.scss'
import { Typography } from '@/shared/ui/typography/Typography'
import { Button } from '@/shared/ui/button/Button'
import { Modal, ModalProps } from '@/shared/ui/modal/Modal'

type SignUpModalProps = ModalProps & {
  email: string
}

const SignUpModal = (props: SignUpModalProps) => {
  const { open, onClose, email, ...rest } = props

  return (
    <Modal {...rest} open={open} onClose={onClose} modalTitle="Email sent">
      <div className={styles.modal}>
        <Typography variant="body1">
          We have sent a link to confirm your email to {email}
        </Typography>
        <Button className={styles.button} onClick={onClose}>
          Ok
        </Button>
      </div>
    </Modal>
  )
}

export default SignUpModal
