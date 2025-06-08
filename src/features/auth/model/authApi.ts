import { baseApi } from '@/shared/api/baseApi'
import { RegisterRequest } from '@/features/auth/model/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<void, RegisterRequest>({
      query: body => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useRegisterMutation } = authApi
