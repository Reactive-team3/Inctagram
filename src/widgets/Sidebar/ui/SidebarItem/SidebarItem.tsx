import { SidebarItemType } from '@/widgets/Sidebar/model/types/sidebar'
import styles from './SidebarItem.module.scss'
import { AppLink } from '@/shared/ui/AppLink/AppLink'
import Icon from '@/shared/ui/icon/Icon'
import { clsx } from 'clsx'

export const SidebarItem = (props: SidebarItemType) => {
  const { name, path, text, className, isText = true } = props

  return (
    <li>
      <AppLink href={path} className={clsx(styles.item, className)}>
        <Icon className={styles.icon} name={name} />
        {isText && <span className={styles.link}>{text}</span>}
      </AppLink>
    </li>
  )
}
