import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api/baseApi'
import notificationsReducer from '@/shared/model/notifications/notificationsSlice'
import { listenerMiddleware } from '@/shared/config/listenerMiddleware/listenerMiddleware'

import '@/shared/listeners/globalErrorListeners'
import { authSlice } from '@/shared/model/auth/authSlice'

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    notifications: notificationsReducer,
    auth: authSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export { listenerMiddleware }
