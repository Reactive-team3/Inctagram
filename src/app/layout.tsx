import './globals.css'
import { ReactNode } from 'react'
import { Header } from '@/widgets/header'
import styles from './layout.module.css'
// eslint-disable-next-line react-refresh/only-export-components
export { metadata } from './metadata'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className={styles.root}>
        <div className={styles.wrapper}>
          <div className={styles.stickyHeader}>
            <Header />
          </div>
          <main className={styles.main}>
            <div className="w-full max-w-[1280px] px-4">{children}</div>
          </main>
        </div>
      </body>
    </html>
  )
}
