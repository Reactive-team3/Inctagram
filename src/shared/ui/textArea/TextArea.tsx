'use client'

import React, { ChangeEvent, useState } from 'react'
import styles from './textArea.module.scss'
import { clsx } from 'clsx'

interface TextAreaProps {
  label: string
  name: string
  initialValue?: string
  maxLength?: number
  error?: string
  required?: boolean
  placeholder?: string
  disabled?: boolean
  rows?: number
  className?: string
  width?: string
  onChange?: (value: string) => void
}

export const TextArea = ({
  label,
  name,
  initialValue = '',
  maxLength,
  placeholder = 'text-area',
  disabled = false,
  rows = 4,
  className = '',
  width,
  onChange,
}: TextAreaProps) => {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState('')

  const currentLength = value.length

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value
    setValue(newValue)
    onChange?.(newValue)
    if (error) {
      setError('')
    }
  }

  const handleBlur = () => {
    const trimmedValue = value.trim()
    if (trimmedValue === '') {
      setError('Error text')
    }
    setValue(trimmedValue)
  }
  const textareaClassName = clsx(
    styles.textareaInput,
    error && styles.textareaError,
    disabled && styles.textareaDisabled,
    className
  )
  return (
    <div className={`${styles.textareaContainer} ${className}`} style={{ width }}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>

      <div className={styles.textareaWrapper}>
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={textareaClassName}
        />

        <div className={styles.containerCounterError}>
          {error && <span className={styles.errorMessage}>{error}</span>}
          {maxLength && (
            <span className={styles.counter}>
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
