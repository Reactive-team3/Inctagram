import { baseApi } from '@/shared/api/baseApi'
import {
  EmailResendingRequest,
  RegisterRequest,
  SignInRequest,
  SignInResponse,
} from '@/features/auth/model/types'

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
      query: ({ email, recaptchaToken }) => ({
        url: '/auth/registration-email-resending',
        method: 'POST',
        body: { email, recaptchaToken },
      }),
    }),
    confirmEmail: builder.mutation<void, { code: string }>({
      query: ({ code }) => ({
        url: `/auth/registration-confirmation`,
        method: 'POST',
        body: { code },
      }),
    }),
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    refreshToken: builder.mutation<SignInResponse, void>({
      query: body => ({
        url: '/auth/refresh-token',
        method: 'POST',
        body, // empty object {}
      }),
    }),
  }),
})

export const {
  useRegisterMutation,
  useEmailResendingMutation,
  useConfirmEmailMutation,
  useSignInMutation,
  useRefreshTokenMutation,
} = authApi
