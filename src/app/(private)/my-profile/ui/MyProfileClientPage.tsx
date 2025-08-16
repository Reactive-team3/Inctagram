'use client'

import styles from '@/app/(private)/my-profile/ui/muProfile.module.scss'
import { Post } from '@/features/ui/post/post'
import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/model/user/userSlice'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  useGetUserPostsQuery,
  useLazyGetPostByIdQuery,
  useUpdatePostMutation,
} from '@/features/postApi/model/postApi'
import { MyPostsList } from '@/widgets/myPostsList/MyPostsList'
import { PostModal } from '@/widgets/modals/postModal/PostModal'

export const MyProfileClientPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(8)
  const [hasMore, setHasMore] = useState(true)
  // const [onEdit, setEdit] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const userMe = useSelector(selectUser)

  const userId = userMe?.userId ? parseInt(userMe.userId) : undefined

  //We use a single request for all pages
  const {
    data: allPosts,
    isFetching: allPostFetching,
    isLoading: allPostLoading,
  } = useGetUserPostsQuery(
    userId ? { userId, pageNumber: currentPage, pageSize } : { userId: 0, pageNumber: 1, pageSize },
    {
      skip: !userId,
      refetchOnMountOrArgChange: false,
    }
  )

  const [
    fetchPost,
    { data: post, isLoading: postIsLoading, isFetching: postIsFetching, isUninitialized },
  ] = useLazyGetPostByIdQuery()

  const [updatePost] = useUpdatePostMutation()
  const loadingMoreRef = useRef(false)

  const requestNextPage = useCallback(() => {
    if (loadingMoreRef.current) return
    loadingMoreRef.current = true
    setCurrentPage(p => p + 1)
  }, [])

  const observer = useRef<IntersectionObserver | null>(null)
  const lastPostRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasMore && !allPostFetching) {
            requestNextPage()
          }
        },
        {
          root: null,
          rootMargin: '100px 0px',
          threshold: 0,
        }
      )

      if (node) observer.current.observe(node)
    },
    [hasMore, allPostFetching, requestNextPage]
  )

  const onOpenPostModal = (id: number) => {
    setIsModalOpen(true)
    fetchPost(id)
  }

  const onClosePostModal = () => {
    setIsModalOpen(false)
  }

  const onEditPost = (id: number, description: string) => {
    return updatePost({ id, description }).unwrap()
  }

  useEffect(() => {
    if (allPosts) {
      setHasMore(currentPage < allPosts.pagesCount)
    }
  }, [allPosts, currentPage])

  useEffect(() => {
    if (!allPostFetching) loadingMoreRef.current = false
  }, [allPostFetching])

  return (
    <div className={styles.container}>
      <Post user={userMe} />
      {/*<MyPostsList />*/}
      <MyPostsList
        ref={lastPostRef}
        posts={allPosts?.items}
        loading={allPostLoading}
        fetching={allPostFetching}
        handleOpenModal={onOpenPostModal}
      />

      <PostModal
        onClose={onClosePostModal}
        isOpen={isModalOpen}
        post={postIsFetching ? undefined : post}
        loading={postIsLoading || postIsFetching || isUninitialized}
        onEditPost={onEditPost}
      />
    </div>
  )
}
