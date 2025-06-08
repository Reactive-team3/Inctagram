export type NotificationVariant = 'success' | 'error'

export type Notification = {
  id: string
  message: string
  variant: NotificationVariant
  duration?: number
}
