'use client'

import { ChangeEvent, ComponentProps, forwardRef, useState } from 'react'
import styles from './input.module.scss'
import { clsx } from 'clsx'
import Icon from '@/shared/ui/icon/Icon'
import { Button } from '@/shared/ui/button/Button'

export interface InputProps {
  label?: string
  type?: 'text' | 'email' | 'password' | 'search'
  name: string
  value?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  className?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  onValueChange?: (value: string) => void
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      type = 'text',
      name,
      value = '',
      placeholder = '',
      error = '',
      disabled = false,
      className = '',
      onChange,
      onBlur,
      onValueChange,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)
    const isShowPasswordButtonShown = type === 'password'

    const finalType = getFinalType(type, showPassword)
    const handleBlur = () => {
      onBlur?.()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    const inputClassName = clsx(
      styles.input,
      error && styles.error,
      disabled && styles.disabled,
      className
    )

    return (
      <div className={styles.inputContainer}>
        {label && (
          <label className={styles.label} htmlFor={name}>
            {label}
          </label>
        )}

        <div className={styles.inputWrapper}>
          <input
            id={name}
            name={name}
            type={finalType}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName}
            ref={ref}
            {...rest}
          />

          {isShowPasswordButtonShown && (
            <Button
              type="button"
              variant="transparent"
              className={styles.passwordToggle}
              onClick={() => setShowPassword(prev => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <Icon name="eye-outline" /> : <Icon name="eye-off-outline" />}
            </Button>
          )}
        </div>

        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    )
  }
)

function getFinalType(type: ComponentProps<'input'>['type'], showPassword: boolean) {
  if (type === 'password' && showPassword) {
    return 'text'
  }
  return type
}

Input.displayName = 'Input'
