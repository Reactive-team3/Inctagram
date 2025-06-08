import { Typography } from '@/shared/ui/typography/Typography'
import { Button } from '@/shared/ui/button/Button'
import { useRouter } from 'next/navigation'
import s from './logOutModalChildren.module.scss'

type logOutModalChildrenProps = {
  onClick: () => void
  emailName: string
}

export const LogOutModalChildren = ({ onClick, emailName }: logOutModalChildrenProps) => {
  const router = useRouter()
  return (
    <div className={s.main}>
      <Typography variant={'body1'} className={s.text}>
        Are you really want to log out of your account
      </Typography>
      <Typography variant={'body1'} className={s.text}>
        {`"`}
        <span className={s.span}>${emailName}</span>
        {`"`}
      </Typography>
      <div className={s.btn_field}>
        <Button variant={'outline'} onClick={() => router.push('/signin')} className={s.btn_1}>
          Yes
        </Button>
        <Button variant={'primary'} onClick={onClick} className={s.btn_2}>
          No
        </Button>
      </div>
    </div>
  )
}
