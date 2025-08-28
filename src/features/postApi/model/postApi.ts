import { baseApi } from '@/shared/api/baseApi'
import type {
  CreatePostResponse,
  GetPostByIdResponse,
  GetUserPostsRequest,
  GetUserPostsResponse,
} from './types'
import { UpdatePost } from '@/features/auth/model/types'
import { RootState } from '@/app/store'
import { selectUser } from '@/shared/model/user/userSlice'

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
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          postApi.util.updateQueryData('getPostById', id, draft => {
            Object.assign(draft, patch)
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
    }),
    deletePost: builder.mutation<void, { id: number }>({
      query: ({ id }) => ({ url: `/posts/${id}`, method: 'DELETE' }),
      invalidatesTags: (res, err, { id }) => [
        { type: 'Posts', id },
        { type: 'Posts', id: 'LIST' },
      ],
      async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState

        const user = selectUser(state)
        if (!user) return

        const parsedUserId = parseInt(user.userId)
        const args = { userId: parsedUserId, pageNumber: 1, pageSize: 8 }

        const patchResult = dispatch(
          postApi.util.updateQueryData('getUserPosts', args, draft => {
            draft.items = draft.items.filter(post => post.id !== id)
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
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
