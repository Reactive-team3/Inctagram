import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
  isLoggingOut: boolean
}

const initialState: AuthState = {
  accessToken: null,
  isLoggingOut: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
      state.isLoggingOut = false
    },
    clearAuth: state => {
      state.accessToken = null
      state.isLoggingOut = true
    },
  },
})

export const { setAccessToken, clearAuth } = authSlice.actions

// Selectors
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.accessToken !== null
export const selectIsLoggingOut = (state: { auth: AuthState }) => state.auth.isLoggingOut

export default authSlice.reducer
