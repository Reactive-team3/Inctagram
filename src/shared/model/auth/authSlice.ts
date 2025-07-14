import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
  isLoggingIn: boolean
  authChecked: boolean
}

const initialState: AuthState = {
  accessToken: null,
  isLoggingIn: false,
  authChecked: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
    },
    setIsLoggingIn: (state, action) => {
      state.isLoggingIn = action.payload
    },
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.authChecked = action.payload
    },
    clearAuth: state => {
      state.accessToken = null
    },
  },
})

export const { setAccessToken, clearAuth, setAuthChecked, setIsLoggingIn } = authSlice.actions

// Selectors
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.accessToken !== null
export const selectIsLoggingIn = (state: { auth: AuthState }) => state.auth.isLoggingIn

export default authSlice.reducer
