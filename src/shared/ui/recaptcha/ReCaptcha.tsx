'use client'
import ReCAPTCHA from 'react-google-recaptcha'

type Props = {
  onVerify?: (token: string) => void
  onExpired?: () => void
  onError?: () => void
}
export const ReCaptcha = ({ onVerify, onExpired }: Props) => {
  const handleCaptchaChange = (token: string | null) => {
    if (token) {
      // eslint-disable-next-line no-console
      console.log('reCAPTCHA verified successfully')
      onVerify?.(token)
    } else {
      console.error('reCAPTCHA cleared or expired')
    }
  }

  const handleExpired = () => {
    console.error('reCAPTCHA expired')
    onExpired?.()
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  if (!siteKey) {
    console.error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not defined')
    return (
      <div style={{ color: 'red', padding: '10px', border: '1px solid red' }}>
        Error: reCAPTCHA site key is not configured
      </div>
    )
  }

  return (
    <div>
      {/*Challenge (v2)< "I'm not a robot" Checkbox < https://www.google.com/recaptcha/admin/create*/}
      <ReCAPTCHA
        sitekey={siteKey}
        onChange={handleCaptchaChange}
        onExpired={handleExpired}
        theme="dark"
      />
    </div>
  )
}
