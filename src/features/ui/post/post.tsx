'use client'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography/Typography'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'
import { privateRoutes } from '@/shared/config/routes/routes'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/model/user/userSlice'
import styles from '@/features/ui/post/post.module.scss'

const Post = () => {
  const userMe = useSelector(selectUser)
  return (
    <div className={styles.wrapperPhotoProfile}>
      <div className={styles.photo}>
        <Image
          src="/user-images/image.png"
          alt="Profile photo"
          width={204}
          height={204}
          className={styles.noPostsImage}
          style={{ borderRadius: '100px' }}
        />
      </div>
      <div className={styles.wrapperProfilleInformation}>
        <div className={styles.profileBlock}>
          <Typography as="h1" variant="h1">
            {userMe?.username || 'Пользователь'}
          </Typography>
          <Button as={Link} href={privateRoutes.PROFILE_SETTINGS} variant="secondary">
            Profile Settings
          </Button>
        </div>
        <div className={styles.wrapperStatistics}>
          <div className={styles.statisticsBlock}>
            <Typography as="span" variant="subtitle2">
              2 218
            </Typography>
            <Typography as="span" variant="subtitle2">
              Following
            </Typography>
          </div>
          <div className={styles.statisticsBlock}>
            <Typography as="span" variant="subtitle2">
              2 358
            </Typography>
            <Typography as="span" variant="subtitle2">
              Followers
            </Typography>
          </div>
          <div className={styles.statisticsBlock}>
            <Typography as="span" variant="subtitle2">
              2 746
            </Typography>
            <Typography as="span" variant="subtitle2">
              Publications
            </Typography>
          </div>
        </div>
        <Typography as="p" variant="body1" className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco{' '}
          <Typography as="a" variant="link1">
            laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>
        </Typography>
      </div>
    </div>
  )
}
export default Post
