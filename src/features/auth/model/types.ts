export type RegisterRequest = {
  username: string
  email: string
  password: string
}
export type EmailResendingRequest = {
  email: string
  recaptchaToken: string
}
export type SignInRequest = {
  usernameOrEmail: string
  password: string
}
export type SignInResponse = {
  accessToken: string
}

export type NewPassword = {
  newPassword: string
  recoveryCode: string
}
