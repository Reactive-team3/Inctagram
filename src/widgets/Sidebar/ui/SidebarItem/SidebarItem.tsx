import { SidebarItemType } from '@/widgets/Sidebar/model/types/sidebar'
import styles from './SidebarItem.module.scss'
import { AppLink } from '@/shared/ui/AppLink/AppLink'

export const SidebarItem = (props: SidebarItemType) => {
  const { Icon, path, text, className, isText = true } = props

  return (
    <li>
      <AppLink href={path} className={`${styles.item} ${className}`}>
        <Icon className={styles.icon} />
        {isText && <span className={styles.link}>{text}</span>}
      </AppLink>
    </li>
  )
}
