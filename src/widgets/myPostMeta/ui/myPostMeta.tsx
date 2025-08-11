'use client'

import styles from './myPostMeta.module.scss'
import { Button } from '@/shared/ui/button/Button'
import Icon from '@/shared/ui/icon/Icon'
import Image from 'next/image'
import { Typography } from '@/shared/ui/typography/Typography'
import React from 'react'

const MyPostMeta = () => {
  return (
    <div className={styles.statisticsBlock}>
      <div className={styles.PostActionsWrapper}>
        <div className={styles.buttonLikeMail}>
          <Button as="button" variant="transparent" className={styles.btnIcon}>
            <Icon name="heart-outline" width={24} height={24} />
          </Button>
          <Button as="button" variant="transparent" className={styles.btnIcon}>
            <Icon name="paper-plane" width={24} height={24} />
          </Button>
        </div>
        <Button as="button" variant="transparent" className={styles.btnIcon}>
          <Icon name="bookmark-outline" width={24} height={24} />
        </Button>
      </div>
      <div className={styles.visualInformationWrapper}>
        <div className={styles.fotoBlock}>
          <div className={styles.avatarGroup}>
            <div className={styles.avatar}>
              <Image src="/user-images/image.png" alt="photo" width={24} height={24} />
            </div>
            <div className={styles.avatar}>
              <Image src="/user-images/image.png" alt="photo" width={24} height={24} />
            </div>
            <div className={styles.avatar}>
              <Image src="/user-images/image.png" alt="photo" width={24} height={24} />
            </div>
          </div>
          <Typography as="span" variant="subtitle1" className={styles.data}>
            July 3, 2021
          </Typography>
        </div>
        <Typography as="span" variant="body1" className={styles.likeBlock}>
          2 243 Like
        </Typography>
      </div>
    </div>
  )
}
export default MyPostMeta
