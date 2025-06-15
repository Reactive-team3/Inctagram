'use client'
import styles from './Header.module.scss'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectAccessToken } from '@/shared/model/auth/authSlice'
import { usePathname } from 'next/navigation'
import { publicRoutes } from '@/shared/config/routes/routes'
import Image from 'next/image'

export const Header = () => {
  const token = useSelector(selectAccessToken)
  const pathname = usePathname()
  const isAuthPage = pathname === publicRoutes.auth.SIGNIN || pathname === publicRoutes.auth.SIGNUP
  console.warn('Token exists:', !!token)
  return (
    <header className={styles.header}>
      <span className={styles.name}>Instagram</span>
      <div className="flex items-center gap-4">
        {/*todo:   here should <SelectComponent/> component*/}
        <Button variant="outline">
          <Image src="../../icons/flag-united-kingdom.svg" alt="google" width={24} height={24} />
          English
        </Button>
        {!token && !isAuthPage && (
          <>
            <Button as={Link} variant="secondary" href={publicRoutes.auth.SIGNIN}>
              Log In
            </Button>
            <Button as={Link} variant="primary" href={publicRoutes.auth.SIGNUP}>
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
