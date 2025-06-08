'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/app/store'
import { Alert } from '@/shared/ui/alert/Alert'
import { removeNotification } from '@/shared/model/notifications/notificationsSlice'

export const NotificationContainer = () => {
  const dispatch = useDispatch()
  const notifications = useSelector((state: RootState) => state.notifications.notifications)

  const handleClose = (id: string) => {
    dispatch(removeNotification(id))
  }

  return <Alert notifications={notifications} onCloseAction={handleClose} />
}
