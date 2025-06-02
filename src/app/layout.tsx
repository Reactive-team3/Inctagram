import './globals.css'
import { ReactNode } from 'react'
import styles from './layout.module.css'
import '@/shared/config/styles/index.scss'
import { inter } from '../../public/fonts/inter'
// eslint-disable-next-line react-refresh/only-export-components
export { metadata } from './metadata'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className={styles.root}>
        <main className={styles.main}>{children}</main>
      </body>
    </html>
  )
}
