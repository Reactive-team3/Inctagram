import * as React from 'react'
import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Dialog } from 'radix-ui'
import s from './modalCreatePost.module.scss'
import { clsx } from 'clsx'

export type ModalSize = 'lg' | 'md' | 'sm'

// Define size configurations
const MODAL_SIZES: Record<ModalSize, { width: number; height: number }> = {
  sm: { width: 400, height: 300 },
  md: { width: 492, height: 550 },
  lg: { width: 972, height: 550 },
}

export type ModalProps = {
  open: boolean
  onClose: () => void
  modalTitle: string | ReactNode
  size: ModalSize
} & ComponentPropsWithoutRef<'div'>

export const ModalCreatePost = ({
  modalTitle,
  open,
  children,
  onClose,
  size = 'md',
  className,
  ...rest
}: ModalProps) => {
  const sizeConfig = MODAL_SIZES[size]

  const getContentStyle = (): React.CSSProperties => {
    return {
      width: `${sizeConfig.width}px`,
      height: `${sizeConfig.height}px`,
      maxWidth: `${sizeConfig.width}px`,
      maxHeight: `${sizeConfig.height}px`,
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.Overlay} />
        <Dialog.Content
          className={clsx(s.Content)}
          style={getContentStyle()}
          aria-describedby={undefined}
        >
          <Dialog.Title className={s.Title}>{modalTitle}</Dialog.Title>
          <hr className={s.divider} />
          <div className={className}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
