import styles from './page.module.scss'
import { Cards } from '@/shared/ui/cards/Cards'
import { Typography } from '@/shared/ui/typography/Typography'
import React from 'react'

export default function HomePage() {
  return (
    <main className={styles.container}>
      Public page content
      <Cards>
        <Cards>Photo</Cards>
        <Typography as="h1" variant="h1" className={styles.title}>
          URL profile
        </Typography>
        <Typography as="p" variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. At cupiditate fuga in, mollitia
          nesciunt nisi praesentium ratione saepe sed vel?
        </Typography>
      </Cards>
    </main>
  )
}
