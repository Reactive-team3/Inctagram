import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
  userEmail: string
}

const initialState: AuthState = {
  accessToken: null,
  userEmail: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload
    },
    clearAuth: state => {
      state.accessToken = null
      state.userEmail = ''
    },
  },
})

export const { setAccessToken, setUserEmail, clearAuth } = authSlice.actions

// Selectors
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken
export const selectUserEmail = (state: { auth: AuthState }) => state.auth.userEmail
// export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.accessToken !== null

export default authSlice.reducer
