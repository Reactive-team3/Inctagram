import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pickandstore.com/api/v1',
    credentials: 'include',
  }),
  endpoints: () => ({}),
})
