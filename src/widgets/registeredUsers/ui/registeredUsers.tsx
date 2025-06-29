import styles from './registeredUusers.module.scss'
import { Typography } from '@/shared/ui/typography/Typography'
import React from 'react'

export const RegisteredUsers = () => (
  <div className={styles.registredContainer}>
    <Typography as="div" variant="h2">
      Registered users:
    </Typography>
    <div className={styles.numberContainer}>
      <ul>
        <li>0</li>
        <li>0</li>
        <li>9</li>
        <li>2</li>
        <li>1</li>
        <li>3</li>
      </ul>
    </div>
  </div>
)
