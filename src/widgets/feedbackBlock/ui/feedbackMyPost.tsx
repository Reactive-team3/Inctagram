'use client'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography/Typography'
import { Button } from '@/shared/ui/button/Button'
import Icon from '@/shared/ui/icon/Icon'
import React from 'react'
import styles from './feedbackMyPost.module.scss'

type Post = {
  id?: number
  username?: string
  description?: string
  imageUrl?: string[]
  createdAt?: string
}
type FeedbackBlockProps = {
  post: Post
}

const FeedbackMyPost = ({ post }: FeedbackBlockProps) => {
  return (
    <div className={styles.userCommentBlock}>
      <div className={styles.wrapperUserComment}>
        <div className={styles.userPhoto}>
          <Image src="/user-images/image.png" alt="photo" width={36} height={36} />
        </div>
        <div className={styles.textInformationWrapper}>
          <Typography as="p" variant="body2" className={styles.discriptionWrapper}>
            {post?.username} {post?.description}
          </Typography>
          <div className={styles.hoursLikeAnswerWrapper}>
            <Typography as="span" variant="subtitle1">
              2 Hours ago
            </Typography>
            <Typography as="span" variant="subtitle1">
              Like: 1
            </Typography>
            <Typography as="span" variant="subtitle1">
              Answer
            </Typography>
          </div>
        </div>
        <Button as="button" variant="transparent" className={styles.btnIcon}>
          <Icon name="heart-outline" width={16} height={16} />
        </Button>
      </div>
      <div className={styles.wrapperUserComment}>
        <div className={styles.userPhoto}>
          <Image src="/user-images/image.png" alt="photo" width={36} height={36} />
        </div>
        <div className={styles.textInformationWrapper}>
          <Typography as="p" variant="body2" className={styles.discriptionWrapper}>
            UserName Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
          <div className={styles.hoursLikeAnswerWrapper}>
            <Typography as="span" variant="subtitle1">
              2 Hours ago
            </Typography>
            <Typography as="span" variant="subtitle1">
              Like: 1
            </Typography>
            <Typography as="span" variant="subtitle1">
              Answer
            </Typography>
          </div>
        </div>
        <Button as="button" variant="transparent" className={styles.btnIcon}>
          <Icon name="heart-outline" width={16} height={16} />
        </Button>
      </div>
      <div className={styles.wrapperUserComment}>
        <div className={styles.userPhoto}>
          <Image src="/user-images/image.png" alt="photo" width={36} height={36} />
        </div>
        <div className={styles.textInformationWrapper}>
          <Typography as="p" variant="body2" className={styles.discriptionWrapper}>
            UserName Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </Typography>
          <div className={styles.hoursLikeAnswerWrapper}>
            <Typography as="span" variant="subtitle1">
              2 Hours ago
            </Typography>
            <Typography as="span" variant="subtitle1">
              Like: 1
            </Typography>
            <Typography as="span" variant="subtitle1">
              Answer
            </Typography>
          </div>
        </div>
        <Button as="button" variant="transparent" className={styles.btnIcon}>
          <Icon name="heart-outline" width={16} height={16} />
        </Button>
      </div>
    </div>
  )
}
export default FeedbackMyPost
