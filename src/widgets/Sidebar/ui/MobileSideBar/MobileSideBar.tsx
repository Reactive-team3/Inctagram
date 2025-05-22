import styles from './MobileSideBar.module.scss'
import { SidebarItem } from '@/widgets/Sidebar/ui/SidebarItem/SidebarItem'
import { BASIC_NAVIGATION } from '../../model/const/const'

const MobileSideBar = () => {
  return (
    <footer className={styles.sidebar}>
      <nav className={styles.nav}>
        <ul className={styles.navGroup}>
          {BASIC_NAVIGATION.map(config => {
            return (
              <SidebarItem
                isText={false}
                path={config.path}
                text={config.text}
                Icon={config.Icon}
                key={config.text}
              />
            )
          })}
        </ul>
      </nav>
    </footer>
  )
}

export default MobileSideBar
