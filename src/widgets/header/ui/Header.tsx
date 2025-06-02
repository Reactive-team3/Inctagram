'use client'
import styles from './Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <span className={styles.name}>Instagram</span>
      <div className="flex items-center gap-4">{/*Тут будут жить кнопки и лангсвитчер*/}</div>
    </header>
  )
}
