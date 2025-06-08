import { z } from 'zod'

export const verificationSchema = z.object({
  email: z.string().email({ message: 'The email must match the format example@example.com' }),
})

export type VerificationValues = z.infer<typeof verificationSchema>
