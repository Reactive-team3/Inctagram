export type RegisterRequest = {
  username: string
  email: string
  password: string
}

export type EmailResendingRequest = {
  email: string
  recaptchaToken: string
}
