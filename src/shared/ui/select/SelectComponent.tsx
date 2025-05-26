'use client'

import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'

import s from './select.module.scss'
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'
import { useSelectTriggerWidth } from '@/shared/hooks/useMaxOptionWidth'
import { SelectOptions } from '@/shared/types/select'

const SelectItem = forwardRef<
  ComponentRef<typeof Select.Item>,
  ComponentPropsWithoutRef<typeof Select.Item>
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item className={clsx(s.SelectItem, className)} {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  )
})

SelectItem.displayName = 'SelectItem'

export type variantType = 'simple' | 'pagination'

interface SelectComponentProps {
  defaultValue: string
  onChangeAction: (value: string) => void
  options: SelectOptions[]
  variant?: variantType
  errorMessage?: string
  className?: string
  disabled?: boolean
}

export const SelectComponent = ({
  defaultValue,
  onChangeAction,
  options,
  variant = 'simple',
  errorMessage,
  className,
  disabled,
}: SelectComponentProps) => {
  const [triggerRef, triggerWidth] = useSelectTriggerWidth(options)

  return (
    <div className={clsx(s.SelectWrapper, className)}>
      <Select.Root defaultValue={defaultValue} onValueChange={onChangeAction} disabled={disabled}>
        <Select.Trigger
          ref={triggerRef}
          className={clsx(s.SelectTrigger, s[variant])}
          style={{ minWidth: triggerWidth }}
        >
          <Select.Value placeholder={defaultValue} />
          <Select.Icon className={s.SelectIcon}>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={s.SelectContent} position="popper" sideOffset={0}>
            <Select.ScrollUpButton className={s.SelectScrollButton}>
              <ChevronUpIcon />
            </Select.ScrollUpButton>

            <Select.Viewport className={s.SelectViewport}>
              <Select.Group className={s.SelectGroup}>
                {options.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>
                    <div className={s.selectOption}>
                      {opt.icon && <span className={s.optionIcon}>{opt.icon}</span>}
                      <span className={s.selectTypography}>{opt.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {errorMessage && <span className={s.SelectError}>{errorMessage}</span>}
    </div>
  )
}
