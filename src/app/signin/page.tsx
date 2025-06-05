import React from 'react'
import Image from 'next/image'
import { Input } from '@/shared/ui/Input/Input'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'
import styles from './page.module.scss'

const SingIn = () => {
  return (
    <div className={styles.container}>
      <h1>SingIn</h1>
      <div className={styles.socialLink}>
        <Image src={'/icons/google.svg'} alt={'Git hub'} width={36} height={36} />
        <Image src={'/icons/github.svg'} alt={'Git hub'} width={36} height={36} />
      </div>
      <div>
        <Input name={'Email'} label={'Email'} />
        <Input name={'Password'} label={'Password'} />
      </div>
      <div className={styles.buttons}>
        <Button as={Link} href="/signup" variant={'text'} style={{ color: 'grey' }}>
          Forgot Password
        </Button>
        <Button>Sign In</Button>
        <Button as={Link} href="/signup" variant={'text'}>
          Sign up!
        </Button>
        <Button as={Link} href="/signup" variant={'text'} style={{ color: 'white' }}>
          Don’t have an account?
        </Button>
      </div>
    </div>
  )
}

export default SingIn
