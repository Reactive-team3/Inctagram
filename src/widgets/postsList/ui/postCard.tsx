'use client'
import React, { useEffect, useRef, useState } from 'react'
import styles from './postsList.module.scss'
import { Cards } from '@/shared/ui/cards/Cards'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography/Typography'
import { Button } from '@/shared/ui/button/Button'
import { Slider } from '@/shared/ui/slider/slider'
import { Post } from '@/widgets/postsList/model/types/posts'

type PostCardProps = {
  post: Post
  currentIndex: number
  onIndexChangeAction: (index: number) => void
}

export const PostCard = ({ post, currentIndex, onIndexChangeAction }: PostCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [contentOffset, setContentOffset] = useState(0)
  const textRef = useRef<HTMLParagraphElement>(null)
  const hiddenTextRef = useRef<HTMLDivElement>(null)

  const maxVisibleChars = 84
  const shouldToggleWork = post.content.text.length > maxVisibleChars

  // Вычисляем разницу в высоте между полным и обрезанным текстом
  useEffect(() => {
    if (!shouldToggleWork || !textRef.current || !hiddenTextRef.current) {
      setContentOffset(0)
      return
    }

    const visibleHeight = textRef.current.offsetHeight
    const fullHeight = hiddenTextRef.current.offsetHeight
    const heightDifference = fullHeight - visibleHeight

    // Устанавливаем смещение только если есть разница в высоте
    const extraOffset = Math.max(0, heightDifference * 1.3)
    setContentOffset(extraOffset)
  }, [post.content.text, shouldToggleWork])

  const handleClick = () => {
    if (!shouldToggleWork) return
    setIsExpanded(!isExpanded)
  }

  const truncatedText =
    post.content.text.length > maxVisibleChars && !isExpanded
      ? post.content.text.slice(0, maxVisibleChars) + '...'
      : post.content.text

  return (
    <div className={styles.cardsPostContainer}>
      <Cards key={post.id} className={styles.card}>
        <div
          className={styles.cardContent}
          style={{
            transform: isExpanded ? `translateY(-${contentOffset}px)` : 'translateY(0)',
            transition: 'transform 0.3s ease',
          }}
        >
          {post.slides.length > 0 && (
            <div className={styles.sliderWrapper}>
              <Slider
                slides={post.slides}
                currentIndex={currentIndex}
                onIndexChangeAction={onIndexChangeAction}
                showDots={true}
              />
            </div>
          )}
          <div className={styles.profileContainer}>
            <Image
              className={styles.imageSmall}
              src={post.userProfile.avatar}
              alt="avatar"
              width={36}
              height={36}
            />
            <Typography as="h1" variant="h1" className={styles.title}>
              {post.userProfile.name}
            </Typography>
          </div>

          <Typography as="time" variant="subtitle1" className={styles.time}>
            {post.timestamp}
          </Typography>

          {/* Видимый текст с правильной логикой кнопок */}
          <div ref={textRef} className={styles.textWrapper}>
            <Typography as="p" variant="subtitle1" className={styles.text}>
              {truncatedText}
              {!isExpanded && (
                <Button
                  variant={'text'}
                  className={styles.showMore}
                  onClick={handleClick}
                  disabled={!shouldToggleWork}
                >
                  Show more
                </Button>
              )}
              {isExpanded && shouldToggleWork && (
                <Button variant={'text'} className={styles.hide} onClick={handleClick}>
                  Hide
                </Button>
              )}
            </Typography>
          </div>
        </div>

        {/* Скрытый элемент для измерения полной высоты текста */}
        <div ref={hiddenTextRef} className={styles.hiddenText} aria-hidden="true">
          <Typography as="p" variant="subtitle1" className={styles.text}>
            {post.content.text}
          </Typography>
        </div>
      </Cards>
    </div>
  )
}
