import React from 'react'
import styles from './page.module.scss'
import { Typography } from '@/shared/ui/typography/Typography'
import { Cards } from '@/shared/ui/cards/Cards'
import { SignUpSocialButtons } from '@/features/ui/signUpSocialButtons/SignUpSocialButtons'
import { SignInForm } from '@/features/ui/signInForm/SignInForm'

const SingIn = () => {
  return (
    <div>
      <Cards>
        <Typography as="h1" variant="h1" className={styles.title}>
          Sign In
        </Typography>
        <SignUpSocialButtons />
        <SignInForm />
      </Cards>
    </div>
  )
}

export default SingIn
