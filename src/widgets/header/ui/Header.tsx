'use client'
import { useState } from 'react'
import styles from './Header.module.scss'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectAccessToken } from '@/shared/model/auth/authSlice'
import { usePathname } from 'next/navigation'
import { publicRoutes } from '@/shared/config/routes/routes'
import Image from 'next/image'
import { SelectComponent } from '@/shared/ui/select/SelectComponent'

//Hardcode
const languageOptions = [
  {
    value: 'en',
    label: 'English',
    icon: <Image src="/icons/flag-united-kingdom.svg" alt="English" width={24} height={24} />,
  },
  {
    value: 'ru',
    label: 'Русский',
    icon: <Image src="/icons/flag-russian.svg" alt="Russian" width={24} height={24} />,
  },
]

export const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const token = useSelector(selectAccessToken)
  const pathname = usePathname()
  const isAuthPage = pathname === publicRoutes.auth.SIGNIN || pathname === publicRoutes.auth.SIGNUP

  // Here you can add the logic of the change of language
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
  }

  return (
    <header className={styles.header}>
      <span className={styles.name}>Instagram</span>
      <div className={styles.buttons}>
        <SelectComponent
          defaultValue={selectedLanguage}
          onChangeAction={handleLanguageChange}
          options={languageOptions}
          variant="simple"
        />
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
