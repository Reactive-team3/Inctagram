import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'
import { Dialog } from 'radix-ui'
import s from './modal.module.scss'
import { clsx } from 'clsx'
import Icon from '@/shared/ui/icon/Icon'

type ModalSize = 'lg' | 'md' | 'sm'

export type ModalProps = {
  /** The controlled open state of the Modal*/
  open: boolean
  /** Close modal handler*/
  onClose: () => void
  /** Modal title*/
  modalTitle: string
  /** 'sm' | 'md' | 'lg':
   * sm - 378px,
   * md - 438px,
   * lg - 764px.
   * Default: 'md
   * For other values use className */
  size?: ModalSize
} & ComponentPropsWithoutRef<'div'>

export const Modal = ({
  modalTitle,
  open,
  children,
  onClose,
  size = 'md',
  className,
  ...rest
}: ModalProps) => (
  <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.Overlay} />
      <Dialog.Content className={clsx(s.Content, s[size])}>
        <Dialog.Title className={s.Title}>{modalTitle}</Dialog.Title>
        <hr />
        <div className={className}>{children}</div>
        <Dialog.Close asChild>
          <button className={s.IconButton}>
            <Icon name={'close'} />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
