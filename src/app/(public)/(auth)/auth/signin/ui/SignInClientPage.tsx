import { Cards } from '@/shared/ui/cards/Cards'
import { Typography } from '@/shared/ui/typography/Typography'
import styles from './signIn.module.scss'
import { SignUpSocialButtons } from '@/features/ui/signUpSocialButtons/SignUpSocialButtons'
import { SignInForm } from '@/features/ui/signInForm/SignInForm'
import React from 'react'

export const SignInClientPage = () => {
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
