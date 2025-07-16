import React from 'react'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'
import { privateRoutes } from '@/shared/config/routes/routes'

const MyProfile = () => {
  return (
    <div>
      Photo
      <Button as={Link} href={privateRoutes.PROFILE_SETTINGS} variant="secondary">
        Profile Settings
      </Button>
    </div>
  )
}

export default MyProfile
