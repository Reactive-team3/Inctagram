export type NotificationVariant = 'success' | 'error'

export type Notification = {
  id: number
  message: string
  variant: NotificationVariant
  duration?: number
}
