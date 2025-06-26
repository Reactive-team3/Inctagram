import React, { ReactNode } from 'react'
import styles from './cards.module.scss'

type CardProps = {
  children: ReactNode
  className?: string
}

export const Cards = ({ children, className }: CardProps) => {
  return <article className={`${styles.card} ${className}`.trim()}>{children}</article>
}
