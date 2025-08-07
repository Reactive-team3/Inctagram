import Post from '@/features/ui/post/post'
import MyPostsList from '@/widgets/myPostsLlist/myPostsLlist'
import styles from './muProfile.module.scss'

const MyProfile = () => {
  return (
    <div className={styles.container}>
      <Post />
      <MyPostsList />
    </div>
  )
}

export default MyProfile
