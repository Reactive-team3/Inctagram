import { Typography } from '@/shared/ui/typography/Typography'
import { Button } from '@/shared/ui/button/Button'
import s from './deleteAvatarModalChildren.module.scss'
import { useDeleteProfileAvatarMutation } from '@/features/profile/model/profileApi'

type Props = {
  onClick: () => void
}

export const DeleteAvatarModalChildren = ({ onClick }: Props) => {
  const [deleteAvatar] = useDeleteProfileAvatarMutation()
  const onDeleteAvatar = async () => {
    try {
      await deleteAvatar()
      onClick()
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className={s.main}>
      <Typography variant={'body1'} className={s.text}>
        Are you really want to log out of your account
      </Typography>
      <div className={s.btn_field}>
        <Button variant={'outline'} onClick={onDeleteAvatar} className={s.btn_1}>
          Yes
        </Button>
        <Button variant={'primary'} onClick={onClick} className={s.btn_2}>
          No
        </Button>
      </div>
    </div>
  )
}
