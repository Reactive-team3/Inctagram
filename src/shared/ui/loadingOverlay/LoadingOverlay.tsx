import { Loader } from '@/shared/ui/loader/Loader'
import styles from './loadingOverlay.module.scss'
export const LoadingOverlay = () => {
  return (
    <div className={styles.globalLoaderOverlay}>
      <Loader />
    </div>
  )
}
