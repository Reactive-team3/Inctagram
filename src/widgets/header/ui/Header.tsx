'use client'
import { useState } from 'react'
import styles from './Header.module.scss'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'
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

type HeaderProps = {
  data?: {
    email?: string
    userId?: string
    username?: string
  }
}

export const Header = ({ data }: HeaderProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const isAuthenticated = !!data?.userId

  // Here you can add the logic of the change of language
  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value)
  }

  return (
    <header className={styles.header}>
      <span className={styles.name}>Instagram</span>
      <span className={styles.name}>{data?.username}</span>
      <div className={styles.buttons}>
        <SelectComponent
          defaultValue={selectedLanguage}
          onChangeAction={handleLanguageChange}
          options={languageOptions}
          variant="simple"
        />
        {!isAuthenticated && (
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
