import { baseApi } from '@/shared/api/baseApi'
import { ProfileData } from '@/features/profile/model/types'

export const profileApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    uploadProfileAvatar: builder.mutation<void, FormData>({
      query: formData => ({
        url: '/users/profile/avatar',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Profile'],
    }),
    getProfile: builder.query<ProfileData, void>({
      query: () => ({
        url: '/users/profile',
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    deleteProfileAvatar: builder.mutation<void, void>({
      query: () => ({
        url: '/users/profile/avatar',
        method: 'DELETE',
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})
export const {
  useUploadProfileAvatarMutation,
  useGetProfileQuery,
  useDeleteProfileAvatarMutation,
} = profileApi
