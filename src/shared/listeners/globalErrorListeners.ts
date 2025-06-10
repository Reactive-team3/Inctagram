import { isRejectedWithValue, TypedStartListening } from '@reduxjs/toolkit'
import { AppDispatch, listenerMiddleware, RootState } from '@/app/store'
import { addNotification } from '@/shared/model/notifications/notificationsSlice'
import { nanoid } from 'nanoid'

export type ServerErrorPayload = {
  status: number
  data?: {
    errorsMessages?: { field: string; message: string }[]
  }
  error?: string
}

const typedListener = listenerMiddleware as {
  startListening: TypedStartListening<RootState, AppDispatch>
}

typedListener.startListening({
  matcher: isRejectedWithValue,
  effect: async (action, api) => {
    const error = action.payload as ServerErrorPayload

    const firstMessage =
      error?.data?.errorsMessages?.[0]?.message ||
      error?.error ||
      'Something went wrong. Please try again.'
    api.dispatch(
      addNotification({
        id: nanoid(),
        message: firstMessage,
        variant: 'error',
        duration: 4000,
      })
    )
  },
})
