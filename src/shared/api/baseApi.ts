import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/app/store'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pickandstore.com/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      // you can take accessToken from localStorage/sessionStorage/RTK
      const token = (getState() as RootState).auth.accessToken

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  }),
  endpoints: () => ({}),
})
