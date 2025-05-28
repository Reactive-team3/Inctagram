import React, { ReactNode } from 'react'
import styles from './cards.module.scss'

type CardProps = {
  children: ReactNode
}

export const Cards = ({ children }: CardProps) => {
  return <article className={styles.card}>{children}</article>
}
