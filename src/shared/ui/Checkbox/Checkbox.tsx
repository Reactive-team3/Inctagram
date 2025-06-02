'use client'

import { ChangeEvent } from 'react'
import styles from './checkbox.module.scss'

type CheckboxProps = {
  checked?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  label?: string
}

export const Checkbox = ({ checked, onChange, disabled, label }: CheckboxProps) => {
  return (
    <label className={disabled ? styles.containerDisabled : styles.container}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={styles.checkbox}
      />
      <span className={styles.checkmark}></span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
