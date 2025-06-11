import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
}

const initialState: AuthState = {
  accessToken: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    clearAuth: state => {
      state.accessToken = null
    },
  },
})

export const { setAccessToken, clearAuth } = authSlice.actions

// Selectors
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.accessToken !== null

export default authSlice.reducer
