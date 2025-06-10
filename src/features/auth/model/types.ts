export type RegisterRequest = {
  username: string
  email: string
  password: string
}
export type SignInRequest = {
  usernameOrEmail: string
  password: string
}
export type SignInResponse = {
  accessToken: string
}
