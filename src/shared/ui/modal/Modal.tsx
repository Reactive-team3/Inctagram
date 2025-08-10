import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'
import { Dialog } from 'radix-ui'
import s from './modal.module.scss'
import { clsx } from 'clsx'
import Icon from '@/shared/ui/icon/Icon'

type ModalSize = 'xl' | 'lg' | 'md' | 'sm'

export type ModalProps = {
  /** The controlled open state of the Modal*/
  open: boolean
  /** Close modal handler*/
  onClose: () => void
  /** Modal title*/
  modalTitle?: string
  /** 'sm' | 'md' | 'lg':
   * sm - 378px,
   * md - 438px,
   * lg - 764px,
   * xl- 940px,
   * Default: 'md
   * For other values use className */
  size?: ModalSize
  hideCloseButton?: boolean
  hideDivider?: boolean
} & ComponentPropsWithoutRef<'div'>

export const Modal = ({
  modalTitle,
  open,
  children,
  onClose,
  size = 'md',
  className,
  hideCloseButton = false,
  hideDivider = false,
  ...rest
}: ModalProps) => (
  <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.Overlay} />
      <Dialog.Content className={clsx(s.Content, s[size])} aria-describedby={undefined}>
        <Dialog.Title className={s.Title}>{modalTitle}</Dialog.Title>
        {!hideDivider && <hr className={s.divider} />}
        <div className={className}>{children}</div>
        {!hideCloseButton && (
          <Dialog.Close asChild>
            <button className={s.IconButton}>
              <Icon name={'close'} />
            </button>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
)
