import { createSlice } from '@reduxjs/toolkit'

type UserState = {
  userId: string
  email: string
  username: string
}

const initialState: UserState | null = null

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (_state, action) => action.payload,
    clearUser: () => null,
  },
})
export const { setUser, clearUser } = userSlice.actions
export const selectUser = (state: UserState | null) => state

export default userSlice.reducer
