'use client'

import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import styles from './Button.module.scss'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'text'
  fullWidth?: boolean
  width?: string | number // ← Add this
  className?: string
} & ComponentPropsWithoutRef<T>

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    variant = 'primary',
    fullWidth,
    width,
    className,
    as: Component = 'button',
    style,
    ...rest
  } = props

  const classes = [styles.button, styles[variant], fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(' ')

  const customStyle = {
    ...style,
    ...(width && !fullWidth && { width }), // Only apply if not fullWidth
  }

  return <Component className={classes} style={customStyle} {...rest} />
}
