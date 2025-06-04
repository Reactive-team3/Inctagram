import { Cards } from '@/shared/ui/cards/Cards'
import { SignUpForm } from '@/features/ui/signUpForm/SignUpForm'
import styles from './signUp.module.scss'
import { Typography } from '@/shared/ui/typography/Typography'

const SingUp = () => {
  return (
    <div>
      <Cards>
        <Typography as="h1" variant="h1" className={styles.title}>
          Sign Up
        </Typography>
        <div>Button group</div>
        <SignUpForm />
      </Cards>
    </div>
  )
}

export default SingUp
