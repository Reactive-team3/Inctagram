export type CreatePostRequest = {
  description: string
  images: File[]
}

export type CreatePostResponse = {
  id: number
  username: string
  description: string
  imageUrl: string[]
  createdAt: string
}

// Types of posts
export type Post = {
  id: number
  username: string
  description: string
  imageUrl: string[]
  createdAt: string
}

export type GetUserPostsResponse = {
  totalCount: number
  pagesCount: number
  page: number
  pageSize: number
  items: Post[]
}

export type GetUserPostsRequest = {
  userId: number
  pageNumber?: number
  pageSize?: number
  sortDirection?: 'asc' | 'desc'
  sortBy?: 'createdAt'
}
