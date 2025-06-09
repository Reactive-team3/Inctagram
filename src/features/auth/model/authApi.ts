import { baseApi } from '@/shared/api/baseApi'
import { EmailResendingRequest, RegisterRequest } from '@/features/auth/model/types'

export const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    register: builder.mutation<void, RegisterRequest>({
      query: body => ({
        url: '/auth/registration',
        method: 'POST',
        body,
      }),
    }),
    emailResending: builder.mutation<void, EmailResendingRequest>({
      query: body => ({
        url: '/auth/registration-email-resending',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useRegisterMutation, useEmailResendingMutation } = authApi
