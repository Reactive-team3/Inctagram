import { CreateNewPasswordClientPage } from '@/app/(public)/(auth)/auth/create-new-password/ui/CreateNewPasswordClientPage'

const CreateNewPasswordPage = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) => {
  const params = await searchParams
  const code = typeof params.code === 'string' ? params.code : undefined

  return <CreateNewPasswordClientPage code={code} />
}

export default CreateNewPasswordPage
