'use client'
import styles from './Header.module.scss'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectAccessToken } from '@/shared/model/auth/authSlice'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const token = useSelector(selectAccessToken)
  const pathname = usePathname()
  const isAuthPage = pathname === '/signin' || pathname === '/signup'
  console.warn('Token exists:', !!token)
  return (
    <header className={styles.header}>
      <span className={styles.name}>Instagram</span>
      <div className="flex items-center gap-4">
        <button>🌐 Change language</button>
        {!token && !isAuthPage && (
          <>
            <Button as={Link} variant="secondary" href={'/signin'}>
              Log In
            </Button>
            <Button as={Link} variant="primary" href={'/signup'}>
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
