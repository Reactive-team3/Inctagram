import { EmailConfirmationClient } from '@/features/auth/ui/emailConfirmation/emailConfirmation'

const EmailConfirmation = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) => {
  const params = await searchParams
  const code = typeof params.code === 'string' ? params.code : undefined

  return <EmailConfirmationClient code={code} />
}

export default EmailConfirmation
