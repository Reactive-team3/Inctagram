import { EmailConfirmationClient } from '@/app/(public)/(auth)/auth/email-confirmation/ui/EmailConfirmationClientPage'

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
