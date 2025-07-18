import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { SignInFormValues, signInSchema } from '@/features/model/signInSchema'
import { nanoid } from 'nanoid'
import { addNotification } from '@/shared/model/notifications/notificationsSlice'
import { useSignInMutation } from '@/features/auth/model/authApi'
import { setIsLoggingIn } from '@/shared/model/auth/authSlice'
import { privateRoutes } from '@/shared/config/routes/routes'
import { useRouter } from 'next/navigation'

export const useSignInForm = () => {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  })

  const [signIn, { isLoading }] = useSignInMutation()
  const dispatch = useDispatch()
  const router = useRouter()
  const onSubmit = async (data: SignInFormValues) => {
    const result = await signIn({
      usernameOrEmail: data.email,
      password: data.password,
    })

    if (!('error' in result)) {
      // Store access token in Redux
      // dispatch(setAccessToken(result.data.accessToken))
      dispatch(setIsLoggingIn(true))
      dispatch(
        addNotification({
          id: nanoid(),
          message: 'Successfully Log In',
          variant: 'success',
          duration: 4000,
        })
      )
      form.reset()
      // Redirect to create profile page
      router.push(privateRoutes.PROFILE_SETTINGS)
    }
  }

  return {
    ...form,
    onSubmit,
    isLoading,
  }
}
