import './globals.css'
import { ReactNode } from 'react'
import styles from './layout.module.scss'
import '@/shared/config/styles/index.scss'
import { inter } from '../../public/fonts/inter'
import { Header } from '@/widgets/header'
// eslint-disable-next-line react-refresh/only-export-components
export { metadata } from './metadata'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={styles.root}>
        <main className={styles.main}>
          <div className={styles.stickyHeader}>
            <Header />
          </div>
          {children}
        </main>
      </body>
    </html>
  )
}
