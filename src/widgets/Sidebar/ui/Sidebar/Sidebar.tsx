import styles from './Sidebar.module.scss'
import { SidebarItem } from '@/widgets/Sidebar/ui/SidebarItem/SidebarItem'
import { ADDITIONALLY, BASIC_NAVIGATION } from '../../model/const/const'
import { LogOutButton } from '@/features/ui/logOutButton/LogOutButton'
import { clsx } from 'clsx'

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.navGroup}>
          {BASIC_NAVIGATION.map(config => {
            return (
              <SidebarItem
                path={config.path}
                text={config.text}
                name={config.name}
                key={config.text}
              />
            )
          })}
        </ul>

        <ul className={styles.navGroup}>
          {ADDITIONALLY.map(config => {
            return (
              <SidebarItem
                path={config.path}
                text={config.text}
                name={config.name}
                key={config.text}
              />
            )
          })}
        </ul>
        <LogOutButton className={clsx(styles.navGroup, styles.exit)} />
      </nav>
    </aside>
  )
}

export default Sidebar
