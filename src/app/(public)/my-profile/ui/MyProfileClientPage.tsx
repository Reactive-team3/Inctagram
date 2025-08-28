'use client'

import styles from '@/app/(public)/my-profile/ui/muProfile.module.scss'
import { Post } from '@/features/ui/post/post'
import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/model/user/userSlice'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  useDeletePostMutation,
  useGetPostByIdQuery,
  useGetUserPostsQuery,
  useUpdatePostMutation,
} from '@/features/postApi/model/postApi'
import { MyPostsList } from '@/widgets/myPostsList/MyPostsList'
import { PostModal } from '@/widgets/modals/postModal/PostModal'
import { LoadingOverlay } from '@/shared/ui/loadingOverlay/LoadingOverlay'

export const MyProfileClientPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(8)
  const [hasMore, setHasMore] = useState(true)
  // const [onEdit, setEdit] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const userMe = useSelector(selectUser)
  const [currentPostId, setCurrentPostId] = useState<number | null>(null)

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
      refetchOnMountOrArgChange: true,
    }
  )

  // const [
  //   fetchPost,
  //   { data: post, isLoading: postIsLoading, isFetching: postIsFetching, isUninitialized },
  // ] = useLazyGetPostByIdQuery()
  const {
    data: post,
    isLoading: postIsLoading,
    isFetching: postIsFetching,
  } = useGetPostByIdQuery(currentPostId ?? 0, {
    skip: !isModalOpen || currentPostId === null,
  })

  const [updatePost] = useUpdatePostMutation()
  const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation()
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
    setCurrentPostId(id)
    setIsModalOpen(true)
  }

  const onClosePostModal = () => {
    setIsModalOpen(false)
  }

  const onEditPost = (id: number, description: string) => {
    return updatePost({ id, description }).unwrap()
  }

  const onDeletePost = (id: number) => {
    setCurrentPostId(null)
    return deletePost({ id }).unwrap()
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
      {deleteLoading && <LoadingOverlay />}
      <Post user={userMe} />
      <MyPostsList
        ref={lastPostRef}
        posts={allPosts?.items}
        loading={!allPosts && allPostLoading && !deleteLoading}
        fetching={allPostFetching}
        handleOpenModal={onOpenPostModal}
      />

      <PostModal
        onClose={onClosePostModal}
        isOpen={isModalOpen}
        post={!postIsFetching && currentPostId ? post : undefined}
        loading={isModalOpen && (postIsLoading || postIsFetching)}
        onEditPost={onEditPost}
        onDeletePost={onDeletePost}
      />
    </div>
  )
}
