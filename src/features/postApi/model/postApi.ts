import { baseApi } from '@/shared/api/baseApi'
import type {
  CreatePostResponse,
  GetPostByIdResponse,
  GetUserPostsRequest,
  GetUserPostsResponse,
} from './types'
import { UpdatePost } from '@/features/auth/model/types'

export const postApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: builder => ({
    createPost: builder.mutation<CreatePostResponse, FormData>({
      query: formData => ({
        url: '/posts',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Posts'],
    }),
    getUserPosts: builder.query<GetUserPostsResponse, GetUserPostsRequest>({
      query: ({
        userId,
        pageNumber = 1,
        pageSize = 8,
        sortDirection = 'desc',
        sortBy = 'createdAt',
      }) => ({
        url: `/posts/user/${userId}`,
        method: 'GET',
        params: {
          pageNumber,
          pageSize,
          sortDirection,
          sortBy,
        },
      }),
      keepUnusedDataFor: 600,
      serializeQueryArgs: ({ queryArgs }) => {
        const { ...rest } = queryArgs
        return `userId:${rest.userId}-pageSize:${rest.pageSize}-sort:${rest.sortBy}-dir:${rest.sortDirection}`
      },
      merge: (currentCache, newItems, { arg }) => {
        const pageNumber = arg.pageNumber ?? 1

        if (pageNumber === 1) {
          return newItems
        }

        return {
          ...newItems,
          items: [...currentCache.items, ...newItems.items],
        }
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        const currentPage = currentArg?.pageNumber ?? 1
        const previousPage = previousArg?.pageNumber ?? 1
        return currentPage !== previousPage
      },
      providesTags: ['Posts'],
    }),
    updatePost: builder.mutation<void, UpdatePost>({
      query: ({ id, ...description }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: description,
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
    getPostById: builder.query<GetPostByIdResponse, number>({
      query: id => ({ url: `/posts/${id}`, method: 'GET' }),
    }),
  }),
})

export const {
  useCreatePostMutation,
  useGetUserPostsQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostByIdQuery,
  useLazyGetPostByIdQuery,
} = postApi
