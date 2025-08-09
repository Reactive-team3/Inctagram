import styles from './loader.module.scss'

type Loader = {
  className?: string
}

export const Loader = ({ className }: Loader) => {
  return (
    <div className={styles.loaderWrapper}>
      <div className={`${styles.loader} ${className}`}></div>
    </div>
  )
}
