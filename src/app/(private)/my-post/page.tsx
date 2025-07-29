'use client'
import React, { useEffect, useMemo, useState } from 'react'
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
import { useUpdatePostMutation } from '@/features/postApi/model/postApi'
import { TextArea } from '@/shared/ui/textArea/TextArea'
import { Button } from '@/shared/ui/button/Button'
import { UpdatePostModal } from '@/features/ui/updatePostModal/UpdatePostModal'
import { ConfirmUpdatePostModal } from '@/features/ui/updatePostModal/confirmUpdatePostModal/ConfirmUpdatePostModal'

type Post = {
  id: number
  imageUrl?: string[]
  description?: string
}

type MyPostProps = {
  isOpen: boolean
  onClose: () => void
  onEdit: boolean
  posts: Post[]
  currentIndex: number
  onIndexChange: (index: number) => void
  onEditPost?: (postId: number) => void
  onDeletePost?: (postId: number) => void
}

const MyPost = ({
  isOpen,
  onClose,
  onEdit,
  posts,
  currentIndex,
  onIndexChange,
  onDeletePost,
}: MyPostProps) => {
  const [Edit, setEdit] = useState(onEdit)
  const [inputValue, setInputValue] = useState('')
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [openConfirmUpdateModal, setOpenConfirmUpdateModal] = useState(false)
  useEffect(() => {
    setEdit(onEdit)
  }, [onEdit])
  const [updatePost] = useUpdatePostMutation()
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

  const slidesForUpdate = useMemo(() => {
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
              height={503}
              className={styles.imagUpdateModal}
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

  // const handleEditPost = () => {
  //   const currentPost = posts[currentIndex]
  //   if (currentPost && onEditPost) {
  //     onEditPost(currentPost.id)
  //   }
  // }

  const handleDeletePost = () => {
    const currentPost = posts[currentIndex]
    if (currentPost && onDeletePost) {
      onDeletePost(currentPost.id)
    }
  }
  const handleEditPostText = () => {
    const currentPost = posts[currentIndex]
    const id = currentPost.id
    if (currentPost) {
      updatePost({ id, description: inputValue })
      setEdit(!Edit)
      closeConfirmUpModal()
      closeModal()
    }
  }
  const handleTextareaChange = (value: string) => {
    setInputValue(value)
  }
  const openModal = () => {
    setOpenUpdateModal(true)
  }
  const closeModal = () => {
    setOpenUpdateModal(false)
  }
  const openConfirmUpModal = () => {
    setOpenConfirmUpdateModal(true)
  }
  const closeConfirmUpModal = () => {
    setOpenConfirmUpdateModal(false)
  }
  if (!isOpen || slides.length === 0) {
    return null
  }
  const currentPost = posts[currentIndex]
  const childrenForUpdateModal = (
    <div style={{ display: 'flex', marginTop: '12px' }}>
      <div className={styles.wrapperSlider}>
        <Slider
          slides={slidesForUpdate}
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
        <div className={styles.updateMainTextArea}>
          <div className={styles.updateWrapper}>
            <div className={styles.userPhoto}>
              <Image src="/user-images/image.png" alt="photo" width={36} height={36} />
            </div>
            <Typography as="span" variant="h3" className={styles.userUrl}>
              {userMe?.username}
            </Typography>
          </div>
          <div className={styles.textAreaContainer}>
            <TextArea
              label="Add publication descriptions"
              name="Add publication descriptions"
              maxLength={500}
              width="100%"
              initialValue={currentPost.description}
              onChange={value => handleTextareaChange(value)}
            />
            <Button onClick={openConfirmUpModal}>save change</Button>
          </div>
        </div>
      </div>
    </div>
  )
  const childrenForConfirmUpdate = (
    <div>
      <Typography variant={'body1'} className={styles.text}>
        Do you really want to close the edition of the publication? If you close changes won’t be
        saved
      </Typography>
      <div className={styles.btn_field}>
        <Button variant={'outline'} onClick={handleEditPostText} className={styles.btn_1}>
          Yes
        </Button>
        <Button variant={'primary'} onClick={closeConfirmUpModal} className={styles.btn_2}>
          No
        </Button>
      </div>
    </div>
  )

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
            onEditClick={openModal}
            onDeleteClick={handleDeletePost}
          />
        </div>
        <div>
          {currentPost?.description && (
            <Typography as="p" variant="body1">
              {currentPost.description}
            </Typography>
          )}
          <UpdatePostModal
            open={openUpdateModal}
            onClose={closeModal}
            className={styles.modalProfile}
          >
            {childrenForUpdateModal}
          </UpdatePostModal>
          <ConfirmUpdatePostModal
            open={openConfirmUpdateModal}
            onClose={closeConfirmUpModal}
            className={styles.confirmModal}
          >
            {childrenForConfirmUpdate}
          </ConfirmUpdatePostModal>
        </div>
      </div>
    </Modal>
  )
}
export default MyPost
