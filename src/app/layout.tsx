import '@/shared/config/styles/index.scss'
import { ReactNode } from 'react'
import styles from './layout.module.scss'
import '@/shared/config/styles/index.scss'
import { inter } from '../../public/fonts/inter'
import { Providers } from '@/app/providers'
import { NotificationContainer } from '@/widgets/notifications/ui/NotificationContainer'
import { HeaderWrapper } from '@/widgets/headerWrapper/ui/HeaderWrapper'
// eslint-disable-next-line react-refresh/only-export-components
export { metadata } from './metadata'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={styles.root}>
        <Providers>
          <main className={styles.main}>
            <HeaderWrapper />
            {children}
            <NotificationContainer />
          </main>
        </Providers>
      </body>
    </html>
  )
}
