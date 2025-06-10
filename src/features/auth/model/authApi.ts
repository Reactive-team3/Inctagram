import { baseApi } from '@/shared/api/baseApi'
import { RegisterRequest, SignInRequest, SignInResponse } from '@/features/auth/model/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<void, RegisterRequest>({
      query: body => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useRegisterMutation, useSignInMutation } = authApi
