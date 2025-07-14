import { baseApi } from '@/shared/api/baseApi'
import {
  EmailResendingRequest,
  NewPassword,
  RegisterRequest,
  SignInRequest,
  SignInResponse,
  User,
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
    newPassword: builder.mutation<void, NewPassword>({
      query: ({ newPassword, recoveryCode }) => ({
        url: `/auth/new-password`,
        method: 'POST',
        body: { newPassword, recoveryCode },
      }),
    }),
    signIn: builder.mutation<SignInResponse, SignInRequest>({
      invalidatesTags: ['me'],
      query: body => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    passwordRecovery: builder.mutation<void, EmailResendingRequest>({
      query: ({ email, recaptchaToken }) => ({
        url: '/auth/password-recovery',
        method: 'POST',
        body: {
          email,
          recaptchaToken,
        },
      }),
    }),
    logout: builder.mutation<void, void>({
      invalidatesTags: ['me'],
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      }),
    }),
    me: builder.query<User, void>({
      providesTags: ['me'],
      query: () => '/auth/me',
    }),
  }),
})

export const {
  useRegisterMutation,
  useMeQuery,
  useEmailResendingMutation,
  useConfirmEmailMutation,
  useSignInMutation,
  usePasswordRecoveryMutation,
  useNewPasswordMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
} = authApi
