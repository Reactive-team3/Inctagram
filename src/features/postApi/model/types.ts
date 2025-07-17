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
