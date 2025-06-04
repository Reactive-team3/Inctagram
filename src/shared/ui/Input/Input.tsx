'use client'

import { ChangeEvent, forwardRef, useState } from 'react'
import styles from './input.module.scss'
import { clsx } from 'clsx'

export interface InputProps {
  label?: string
  type?: 'text' | 'email' | 'password' | 'search'
  name: string
  value?: string
  placeholder?: string
  error?: string
  disabled?: boolean
  className?: string
  showPasswordIcon?: boolean
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
      showPasswordIcon = false,
      onChange,
      onBlur,
      onValueChange,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const handleBlur = () => {
      onBlur?.()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    const toggleShowPassword = () => {
      setShowPassword(!showPassword)
    }

    const inputType = type === 'password' && showPassword ? 'text' : type

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
            type={inputType}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClassName}
            ref={ref}
            {...rest}
          />

          {type === 'password' && showPasswordIcon && (
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={toggleShowPassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {/* Здесь должна быть иконка глаза, но пока оставим заглушку */}
              {showPassword ? '👁️' : '👁️'}
            </button>
          )}
        </div>

        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
