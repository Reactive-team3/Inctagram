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
      merge: (currentCache, newPage, { arg }) => {
        const pageNumber = arg.pageNumber ?? 1
        if (pageNumber === 1 || !currentCache?.items?.length) return newPage

        const merged = [...currentCache.items]
        const idxById = new Map(merged.map((p, i) => [p.id, i]))

        for (const item of newPage.items) {
          const i = idxById.get(item.id)
          if (i !== undefined) merged[i] = item
          else merged.push(item)
        }

        return { ...newPage, items: merged }
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        const currentPage = currentArg?.pageNumber ?? 1
        const previousPage = previousArg?.pageNumber ?? 1
        return currentPage !== previousPage
      },
      providesTags: result =>
        result
          ? [
              { type: 'Posts', id: 'LIST' },
              ...result.items.map(p => ({ type: 'Posts' as const, id: p.id })),
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    updatePost: builder.mutation<void, UpdatePost>({
      query: ({ id, ...description }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: description,
      }),
      invalidatesTags: (res, err, { id }) => [
        { type: 'Posts', id },
        { type: 'Posts', id: 'LIST' },
      ],
    }),
    deletePost: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({ url: `/posts/${id}`, method: 'DELETE' }),
      invalidatesTags: (res, err, { id }) => [
        { type: 'Posts', id },
        { type: 'Posts', id: 'LIST' },
      ],
    }),
    getPostById: builder.query<GetPostByIdResponse, number>({
      query: id => ({ url: `/posts/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: 'Posts', id }],
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
