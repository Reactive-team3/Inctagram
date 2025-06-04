import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import s from './typography.module.scss'

type VariantType =
  | 'large'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'body1'
  | 'body2'
  | 'subtitle1'
  | 'subtitle2'
  | 'caption'
  | 'overline'
  | 'link1'
  | 'link2'
  | 'error'

export type TypographyPropsType<T extends ElementType = 'p'> = {
  as?: T
  children: ReactNode
  variant: VariantType
  className?: string
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>(props: TypographyPropsType<T>) => {
  const { as: Component = 'p', variant = 'body1', className, children, ...rest } = props

  const classes = clsx(s.text, s[variant], className)

  return (
    <Component className={classes} {...rest}>
      {children}
    </Component>
  )
}
