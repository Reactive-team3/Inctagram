import Post from '@/features/ui/post/post'
import MyPostsLlist from '@/widgets/myPostsLlist/myPostsLlist'
import styles from './muProfile.module.scss'

const MyProfile = () => {
  return (
    <div className={styles.container}>
      <Post />
      <MyPostsLlist />
    </div>
  )
}

export default MyProfile
