import { Cards } from '@/shared/ui/cards/Cards'
import { Typography } from '@/shared/ui/typography/Typography'
import styles from './signUp.module.scss'
import { SignUpSocialButtons } from '@/features/ui/signUpSocialButtons/SignUpSocialButtons'
import { SignUpForm } from '@/features/ui/signUpForm/SignUpForm'

export const SignUpClientPage = () => {
  return (
    <div>
      <Cards>
        <Typography as="h1" variant="h1" className={styles.title}>
          Sign Up
        </Typography>
        <SignUpSocialButtons />
        <SignUpForm />
      </Cards>
    </div>
  )
}
