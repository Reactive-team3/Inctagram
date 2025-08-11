'use client'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '@/shared/model/user/userSlice'
import { useGetUserPostsQuery, postApi } from '@/features/postApi/model/postApi'
import { Loader } from '@/shared/ui/loader/Loader'
import { Scroll } from '@/shared/ui/scroll/Scroll'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography/Typography'
import MyPost from '@/widgets/myPost/ui/myPost'
import styles from './myPostsLlist.module.scss'
import { AppDispatch } from '@/app/store'

const MyPostsList = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [onEdit, setEdit] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const userMe = useSelector(selectUser)
  const dispatch = useDispatch<AppDispatch>()

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

  // Function for the pre -load of the post
  const prefetchPost = useCallback(
    (postId: number) => {
      dispatch(postApi.util.prefetch('getPostById', postId, { force: true }))
    },
    [dispatch]
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

  // Update hasMore when receiving new data
  useEffect(() => {
    if (data) {
      setHasMore(currentPage < data.pagesCount)
    }
  }, [data, currentPage])

  // Function for opening a modal window on a specific post
  const handleOpenModal = useCallback((postId: number) => {
    // Устанавливаем postId в URL параметры
    const currentUrl = new URL(window.location.href)
    currentUrl.searchParams.set('id', postId.toString())

    // We update the URL without reloading the page
    window.history.pushState({}, '', currentUrl.toString())

    setIsModalOpen(true)
  }, [])

  // Function for closing the modal window
  const handleCloseModal = useCallback(() => {
    // We remove the ID from the URL when closing the model
    const currentUrl = new URL(window.location.href)
    currentUrl.searchParams.delete('id')
    window.history.pushState({}, '', currentUrl.toString())

    setIsModalOpen(false)
  }, [])

  const handleEditToggle = () => {
    setEdit(!onEdit)
  }

  //Show the download if the user data is not yet loaded
  if (isLoading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    )
  }

  return (
    <>
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
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleOpenModal(post.id)}
                    onMouseEnter={() => prefetchPost(post.id)}
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

      <MyPost
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEdit={onEdit}
        onEditToggle={handleEditToggle}
      />
    </>
  )
}

export default MyPostsList
