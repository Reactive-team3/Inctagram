import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email({ message: 'The email must match the format example@example.com' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(20, { message: 'Password must not be more then 20 characters' }),
})

export type SignInFormValues = z.infer<typeof signInSchema>
