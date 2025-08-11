export type ProfileData = {
  userId: number
  userName: string
  firstName: string
  lastName: string
  dataOfBirth: string
  country: string
  city: string
  aboutMe: string
  avatar: Avatar
  createdAt: string
}
type Avatar = {
  url: string
  createdAt: string
}
