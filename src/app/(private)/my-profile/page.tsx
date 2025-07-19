'use client'
import React, { useRef, useState, useCallback } from 'react'
import { Button } from '@/shared/ui/button/Button'
import Link from 'next/link'
import { privateRoutes } from '@/shared/config/routes/routes'
import styles from './muProfile.module.scss'
import { Typography } from '@/shared/ui/typography/Typography'
import { Scroll } from '@/shared/ui/scroll/Scroll'
import Image from 'next/image'
import { Loader } from '@/shared/ui/loader/Loader'
import { useGetUserPostsQuery } from '@/features/postApi/model/postApi'
import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/model/user/userSlice'

const MyProfile = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const userMe = useSelector(selectUser)

  const pageSize = 8
  const userId = userMe?.userId ? parseInt(userMe.userId) : undefined

  //We use a single request for all pages
  const { data, isFetching, isLoading } = useGetUserPostsQuery(
    {
      userId: userId!,
      pageNumber: currentPage,
      pageSize,
    },
    {
      skip: !userId,
      // Do not reboot the data when re -mount the component
      refetchOnMountOrArgChange: false,
    }
  )

  // handler for endless scrolling
  const observer = useRef<IntersectionObserver | null>(null)
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setCurrentPage(prev => prev + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [isFetching, hasMore]
  )

  // Update  hasMore when receiving new data
  React.useEffect(() => {
    if (data) {
      setHasMore(currentPage < data.pagesCount)
    }
  }, [data, currentPage])

  //Show the download if the user data is not yet loaded
  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    )
  }

  return (
    <div className={styles.container}>
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
                {data?.totalCount || 0}
              </Typography>
              <Typography as="span" variant="subtitle2">
                Publications
              </Typography>
            </div>
          </div>
          <Typography as="p" variant="body1" className={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco{' '}
            <Typography as="a" variant="link1">
              laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Typography>
        </div>
      </div>

      <Scroll className={styles.scrollContainer} maxWidth="100%" maxHeight="400px">
        <div className={styles.wrapperUserPhoto}>
          {data?.items.map((post, index) => {
            const isLast = index === data.items.length - 1
            return (
              <div key={post.id} ref={isLast ? lastPostRef : null} className={styles.userPhoto}>
                {post.imageUrl && post.imageUrl[0] ? (
                  <Image
                    src={post.imageUrl[0]}
                    alt={post.description}
                    width={234}
                    height={228}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography as="span" variant="body2">
                      There is no image
                    </Typography>
                  </div>
                )}
              </div>
            )
          })}

          {/* Show the message if there are no posts */}
          {!isFetching && (!data?.items || data.items.length === 0) && userId && (
            <Typography as="span" variant="body1" className={styles.noPostsText}>
              There are no posts yet
            </Typography>
          )}

          {/* Show the download indicator */}
          {isFetching && <Loader />}
        </div>
      </Scroll>
    </div>
  )
}

export default MyProfile
