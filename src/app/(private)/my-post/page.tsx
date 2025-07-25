'use client'
import React, { useMemo, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography/Typography'
import { Modal } from '@/shared/ui/modal/Modal'
import { Dialog } from 'radix-ui'
import Icon from '@/shared/ui/icon/Icon'
import { Slider } from '@/shared/ui/slider/slider'
import { Button } from '@/shared/ui/button/Button'
import styles from './myPost.module.scss'
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
}

const MyPost = ({ isOpen, onClose, posts, currentIndex, onIndexChange }: MyPostProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  const userMe = useSelector(selectUser)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  // Закрытие меню при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  // Закрытие меню при закрытии модального окна
  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false)
    }
  }, [isOpen])

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

  if (!isOpen || slides.length === 0) {
    return null
  }

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
          <div ref={buttonRef}>
            <Button as="button" variant="text" className={styles.buttonIcon} onClick={toggleMenu}>
              <Icon name="more-horizontal" className={styles.icon} />
            </Button>
          </div>
          {isMenuOpen && (
            <div className={styles.menu} ref={menuRef}>
              <div className={styles.edit}>
                <Icon name="edi-2-outline" />
                <Button as="button" variant="transparent">
                  Edit Post
                </Button>
              </div>
              <div className={styles.delete}>
                <Icon name="trash-outline" />
                <Button as="button" variant="transparent">
                  Delete Post
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
export default MyPost
