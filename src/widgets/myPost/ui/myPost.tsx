'use client'
import React, { useMemo } from 'react'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography/Typography'
import { Modal } from '@/shared/ui/modal/Modal'
import { Dialog } from 'radix-ui'
import Icon from '@/shared/ui/icon/Icon'
import { Slider } from '@/shared/ui/slider/slider'
import styles from './myPost.module.scss'
import { DropdownMenu } from '@/shared/ui/dropdownMenu/dropdownMenu'
import { useSelector } from 'react-redux'
import { selectUser } from '@/shared/model/user/userSlice'

type Post = {
  id: number
  imageUrl?: string[]
  description?: string
}

type MyPostProps = {
  isOpen: boolean
  onClose: () => void
  posts: Post[]
  currentIndex: number
  onIndexChange: (index: number) => void
  onEditPost?: (postId: number) => void
  onDeletePost?: (postId: number) => void
}

const MyPost = ({
  isOpen,
  onClose,
  posts,
  currentIndex,
  onIndexChange,
  onEditPost,
  onDeletePost,
}: MyPostProps) => {
  const userMe = useSelector(selectUser)
  // Подготавливаем слайды для всех постов
  const slides = useMemo(() => {
    return posts.map((post, index) => ({
      id: `post-${post.id}`,
      content: (
        <div>
          {/* Основное изображение поста */}
          {post.imageUrl && post.imageUrl[0] ? (
            <Image
              src={post.imageUrl[0]}
              alt={post.description || `Post ${index + 1}`}
              width={490}
              height={562}
              className={styles.imagModal}
            />
          ) : (
            <Typography as="span" variant="body2">
              No image available
            </Typography>
          )}
        </div>
      ),
    }))
  }, [posts])

  const handleEditPost = () => {
    const currentPost = posts[currentIndex]
    if (currentPost && onEditPost) {
      onEditPost(currentPost.id)
    }
  }

  const handleDeletePost = () => {
    const currentPost = posts[currentIndex]
    if (currentPost && onDeletePost) {
      onDeletePost(currentPost.id)
    }
  }

  if (!isOpen || slides.length === 0) {
    return null
  }

  const currentPost = posts[currentIndex]

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className={styles.modalProfile}
      size="xl"
      hideCloseButton={true}
      hideDivider={true}
    >
      <Dialog.Close asChild>
        <button className={styles.customCloseButton}>
          <Icon name="close" />
        </button>
      </Dialog.Close>
      <div className={styles.wrapperSlider}>
        <Slider
          slides={slides}
          currentIndex={currentIndex}
          onIndexChangeAction={onIndexChange}
          showDots={slides.length > 1}
          customStyles={{
            sliderArrowPrev: styles.customArrowPrev,
            sliderArrowNext: styles.customArrowNext,
          }}
        />
      </div>
      <div className={styles.informationBlockPost}>
        <div className={styles.userBlock}>
          <div className={styles.wrapper}>
            <div className={styles.userPhoto}>
              <Image src="/user-images/image.png" alt="photo" width={36} height={36} />
            </div>
            <Typography as="span" variant="h3" className={styles.userUrl}>
              {userMe?.username}
            </Typography>
          </div>
          <DropdownMenu
            className={styles.buttonIcon}
            onEditClick={handleEditPost}
            onDeleteClick={handleDeletePost}
          />
        </div>
        <div>
          {currentPost?.description && (
            <Typography as="p" variant="body1">
              {currentPost.description}
            </Typography>
          )}
        </div>
      </div>
    </Modal>
  )
}
export default MyPost
