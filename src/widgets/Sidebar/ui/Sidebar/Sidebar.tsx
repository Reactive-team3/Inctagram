import styles from './Sidebar.module.scss'
import { SidebarItem } from '@/widgets/Sidebar/ui/SidebarItem/SidebarItem'
import { ADDITIONALLY, BASIC_NAVIGATION, EXIT } from '../../model/const/const'

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
                Icon={config.Icon}
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
                Icon={config.Icon}
                key={config.text}
              />
            )
          })}
        </ul>

        <ul className={`${styles.navGroup} ${styles.exit}`}>
          <SidebarItem path={EXIT.path} text={EXIT.text} Icon={EXIT.Icon} key={EXIT.text} />
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
