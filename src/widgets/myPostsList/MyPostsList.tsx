import { Post } from '@/features/postApi/model/types'
import { Scroll } from '@/shared/ui/scroll/Scroll'
import styles from '@/widgets/myPostsLlist/myPostsLlist.module.scss'
import { Typography } from '@/shared/ui/typography/Typography'
import { Loader } from '@/shared/ui/loader/Loader'
import React, { forwardRef } from 'react'
import { ExtendedPicture } from '@/shared/ui/extendedPicture/ExtendedPicture'

type MyPostsListProps = {
  posts?: Post[]
  loading: boolean
  fetching: boolean
  handleOpenModal: (id: number) => void
}

export const MyPostsList = forwardRef<HTMLDivElement, MyPostsListProps>(
  ({ posts, loading, fetching, handleOpenModal }, ref) => {
    if (loading) {
      return (
        <div className={styles.container}>
          <Loader />
        </div>
      )
    }

    return (
      <Scroll className={styles.scrollContainer}>
        <div className={styles.wrapperUserPhoto}>
          {posts?.map(post => {
            return (
              <div key={post.id} className={styles.userPhoto}>
                <ExtendedPicture
                  src={post.imageUrl[0]}
                  alt={post.description}
                  width={234}
                  height={228}
                  onClick={() => handleOpenModal(post.id)}
                />
              </div>
            )
          })}
          <div ref={ref as React.RefObject<HTMLDivElement>} />
          {!fetching && (!posts || posts.length === 0) && (
            <Typography as="span" variant="body1" className={styles.noPostsText}>
              There are no posts yet
            </Typography>
          )}

          {fetching && <Loader />}
        </div>
      </Scroll>
    )
  }
)

MyPostsList.displayName = 'MyPostsList'
