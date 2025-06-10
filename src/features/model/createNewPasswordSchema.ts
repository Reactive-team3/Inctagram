import { z } from 'zod'

export const createNewPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(20, { message: 'Password must not be more then 20 characters' })
      .regex(/^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/, {
        message:
          'Password must contain a-z, A-Z,! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
      }),
    passwordConfirmation: z.string(),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (passwordConfirmation.length < 6) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        type: 'string',
        inclusive: true,
        minimum: 6,
        message: 'Password confirmation must be at least 6 characters',
        path: ['passwordConfirmation'],
      })
    }

    if (passwordConfirmation.length > 20) {
      ctx.addIssue({
        code: z.ZodIssueCode.too_big,
        type: 'string',
        inclusive: true,
        maximum: 20,
        message: 'Password confirmation must not be more than 20 characters',
        path: ['passwordConfirmation'],
      })
    }

    if (!/^[a-zA-Z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/.test(passwordConfirmation)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Password confirmation must contain a-z, A-Z,! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
        path: ['passwordConfirmation'],
      })
    }

    if (password !== passwordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords must match',
        path: ['passwordConfirmation'],
      })
    }
  })

export type createNewPasswordSchemaFormValues = z.infer<typeof createNewPasswordSchema>
