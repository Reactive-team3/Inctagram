export type UserProfile = {
  avatar: string
  name: string
}

export type Slide = {
  id: string
  content: React.ReactNode
}

export type PostContent = {
  text: string
  images?: Array<{ url: string }>
}

export type Post = {
  id: string
  userId: string
  userProfile: UserProfile
  content: PostContent
  timestamp: string
  slides: Slide[]
}
