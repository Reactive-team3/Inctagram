import styles from './postModal.module.scss'
import React, { useEffect, useMemo, useState } from 'react'
import { Typography } from '@/shared/ui/typography/Typography'
import Image from 'next/image'
import { Slider } from '@/shared/ui/slider/slider'
import { TextArea } from '@/shared/ui/textArea/TextArea'
import { Button } from '@/shared/ui/button/Button'
import { Modal } from '@/shared/ui/modal/Modal'
import { Dialog } from 'radix-ui'
import Icon from '@/shared/ui/icon/Icon'
import { DropdownMenu } from '@/shared/ui/dropdownMenu/dropdownMenu'
import FeedbackMyPost from '@/widgets/feedbackBlock/ui/feedbackMyPost'
import MyPostMeta from '@/widgets/myPostMeta/ui/myPostMeta'
import { UpdatePostModal } from '@/features/ui/updatePostModal/UpdatePostModal'
import { ConfirmUpdatePostModal } from '@/features/ui/updatePostModal/confirmUpdatePostModal/ConfirmUpdatePostModal'
import { Post } from '@/features/postApi/model/types'
import { Loader } from '@/shared/ui/loader/Loader'

type MyPostProps = {
  isOpen: boolean
  onClose: () => void
  onEdit?: boolean
  onEditPost: (id: number, description: string) => Promise<unknown>
  onEditToggle?: () => void
  onDeletePost?: (postId: number) => Promise<unknown>
  post?: Post
  loading: boolean
}

export const PostModal = ({
  isOpen,
  onClose,
  // onEditToggle,
  onDeletePost,
  post,
  loading,
  onEditPost,
}: MyPostProps) => {
  const [inputValue, setInputValue] = useState('')
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openConfirmUpdateModal, setOpenConfirmUpdateModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Resetting the image index when changing the post
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [post?.id])

  // Set the initial value of Description from the resulting post
  useEffect(() => {
    if (post?.description) {
      setInputValue(post.description)
    }
  }, [post?.description])

  // Prepare slides for images of the current post
  const slides = useMemo(() => {
    if (!post || !post.imageUrl || post.imageUrl.length === 0) {
      return [
        {
          id: 'no-image',
          content: (
            <div className={styles.contentNoImade}>
              <Typography as="span" variant="body2">
                No image available
              </Typography>
            </div>
          ),
        },
      ]
    }

    return post.imageUrl.map((imageUrl, imageIndex) => ({
      id: `post-${post.id}-image-${imageIndex}`,
      content: (
        <div>
          <Image
            src={imageUrl}
            alt={post.description || `Post Image ${imageIndex + 1}`}
            width={490}
            height={562}
            className={styles.imagModal}
          />
        </div>
      ),
    }))
  }, [post])

  const slidesForUpdate = useMemo(() => {
    if (!post || !post.imageUrl || post.imageUrl.length === 0) {
      return [
        {
          id: 'no-image',
          content: (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '503px',
              }}
            >
              <Typography as="span" variant="body2">
                No image available
              </Typography>
            </div>
          ),
        },
      ]
    }

    return post.imageUrl.map((imageUrl, imageIndex) => ({
      id: `post-${post.id}-image-${imageIndex}`,
      content: (
        <div>
          <Image
            src={imageUrl}
            alt={post.description || `Post Image ${imageIndex + 1}`}
            width={490}
            height={503}
            className={styles.imagUpdateModal}
          />
        </div>
      ),
    }))
  }, [post])

  // const handleEditPostText = () => {
  //   if (post) {
  //     onEditPost(post.id, inputValue)
  //     // onEditToggle()
  //     closeConfirmUpModal()
  //     closeModal()
  //   }
  // }

  const handleEditPostText = async () => {
    if (!post) return
    await onEditPost(post.id, inputValue)
    closeConfirmUpModal()
    closeModal()
  }

  const handleDeletePost = async () => {
    if (post && onDeletePost) {
      onClose()
      await onDeletePost(post.id)
      openCloseDeleteModal()
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

  const openCloseDeleteModal = () => {
    setOpenDeleteModal(!openDeleteModal)
  }

  const handleImageIndexChange = (newIndex: number) => {
    setCurrentImageIndex(newIndex)
  }

  if (!isOpen || slides.length === 0) {
    return null
  }

  const childrenForUpdateModal = (
    <div style={{ display: 'flex', marginTop: '12px' }}>
      <div className={styles.wrapperSlider}>
        <Slider
          slides={slidesForUpdate}
          currentIndex={currentImageIndex}
          onIndexChangeAction={handleImageIndexChange}
          showDots={slidesForUpdate.length > 1}
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
              {post?.username}
            </Typography>
          </div>
          <div className={styles.textAreaContainer}>
            <TextArea
              label="Add publication descriptions"
              name="Add publication descriptions"
              maxLength={500}
              width="100%"
              initialValue={post?.description}
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
        Do you really want to close the edition of the publication? If you close changes will not be
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

  const childrenForConfirmDelete = (
    <>
      <Typography variant={'body1'} className={styles.text}>
        Do you really want to delete post?
      </Typography>
      <div className={styles.btn_field}>
        <Button variant={'outline'} onClick={handleDeletePost} className={styles.btn_1}>
          Yes
        </Button>
        <Button variant={'primary'} onClick={openCloseDeleteModal} className={styles.btn_2}>
          No
        </Button>
      </div>
    </>
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
      {loading || !post ? (
        <div className="loader-wrapper">
          <Loader />
        </div>
      ) : (
        <>
          <Dialog.Close asChild>
            <button className={styles.customCloseButton}>
              <Icon name="close" />
            </button>
          </Dialog.Close>
          <div className={styles.wrapperSlider}>
            <Slider
              slides={slides}
              currentIndex={currentImageIndex}
              onIndexChangeAction={handleImageIndexChange}
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
                  {post?.username}
                </Typography>
              </div>
              <DropdownMenu
                className={styles.buttonIcon}
                onEditClick={openModal}
                onDeleteClick={openCloseDeleteModal}
              />
            </div>
            {post && <FeedbackMyPost post={post} />}
            <MyPostMeta />
            <div className={styles.textAreaPostBlock}>
              <TextArea
                label=""
                name="сomment"
                placeholder="Add a Comment..."
                className={styles.textAreaPost}
              />
              <Button as="button" variant="text">
                Publish
              </Button>
            </div>

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
            <ConfirmUpdatePostModal
              open={openDeleteModal}
              onClose={openCloseDeleteModal}
              className={styles.confirmModal}
            >
              {childrenForConfirmDelete}
            </ConfirmUpdatePostModal>
          </div>
        </>
      )}
    </Modal>
  )
}
