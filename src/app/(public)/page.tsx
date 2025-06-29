import styles from './page.module.scss'
import { RegisteredUsers } from '@/widgets/registeredUsers/ui/registeredUsers'
import { PostsList } from '@/widgets/postsList/ui/postsList'

export default function HomePage() {
  return (
    <main className={styles.container}>
      <RegisteredUsers />
      <PostsList />
    </main>
  )
}
