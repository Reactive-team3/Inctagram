'use client'

import styles from './alert.module.scss'
import { Notification } from '@/shared/types/alert'

type Props = {
  notifications: Notification[]
  onCloseAction: (id: number) => void
}

export const Alert = ({ notifications, onCloseAction }: Props) => {
  return (
    <div className={styles.notificationWrapper}>
      {notifications.map(n => (
        <div
          key={n.id}
          className={`${styles.toastBox} ${styles[n.variant]}`}
          onAnimationEnd={() => onCloseAction(n.id)}
          style={{ animationDuration: `${n.duration ?? 4000}ms` }}
        >
          <div className={styles.contentWrapper}>
            {n.message}
            <button onClick={() => onCloseAction(n.id)}>X</button>
          </div>
        </div>
      ))}
    </div>
  )
}
