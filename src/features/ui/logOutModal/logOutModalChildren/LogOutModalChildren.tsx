import { Typography } from '@/shared/ui/typography/Typography'
import { Button } from '@/shared/ui/button/Button'
import { useRouter } from 'next/navigation'
import s from './logOutModalChildren.module.scss'
import { useDispatch } from 'react-redux'
import { useLogoutMutation } from '@/features/auth/model/authApi'
import { clearAuth } from '@/shared/model/auth/authSlice'
import { baseApi } from '@/shared/api/baseApi'
import {
  addNotification,
  clearNotifications,
} from '@/shared/model/notifications/notificationsSlice'
import { nanoid } from 'nanoid'
import { publicRoutes } from '@/shared/config/routes/routes'

type logOutModalChildrenProps = {
  onClick: () => void
  emailName: string | undefined
}

export const LogOutModalChildren = ({ onClick, emailName }: logOutModalChildrenProps) => {
  const [logout] = useLogoutMutation()
  const dispatch = useDispatch()
  const router = useRouter()
  const handleLogout = async () => {
    try {
      await logout().unwrap()
      dispatch(clearAuth())
      dispatch(baseApi.util.resetApiState())
      dispatch(
        addNotification({
          id: nanoid(),
          message: 'Successfully Logout',
          variant: 'success',
          duration: 4000,
        })
      )
      router.push(publicRoutes.MAIN_PAGE)
    } catch (e) {
      if (e) {
        dispatch(clearNotifications())
        dispatch(
          addNotification({
            id: nanoid(),
            message: 'Failed Logout',
            variant: 'error',
            duration: 4000,
          })
        )
      }
    }
  }
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
        <Button variant={'outline'} onClick={handleLogout} className={s.btn_1}>
          Yes
        </Button>
        <Button variant={'primary'} onClick={onClick} className={s.btn_2}>
          No
        </Button>
      </div>
    </div>
  )
}
