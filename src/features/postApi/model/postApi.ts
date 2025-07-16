import { baseApi } from '@/shared/api/baseApi'
import type { CreatePostResponse } from './types'

export const postApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    createPost: builder.mutation<CreatePostResponse, FormData>({
      query: formData => ({
        url: '/posts',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
})

export const { useCreatePostMutation } = postApi
