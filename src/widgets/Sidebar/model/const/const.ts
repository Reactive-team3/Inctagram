import { SidebarItemType } from '@/widgets/Sidebar/model/types/sidebar'
import { privateRoutes } from '@/shared/config/routes/routes'

export const FirstNav: SidebarItemType[] = [
  {
    name: 'home-outline',
    text: 'Home',
    path: '/',
  },
  {
    name: 'plus-square-outline',
    text: 'Plus',
    path: '/plus-square',
  },
]

export const BASIC_NAVIGATION: SidebarItemType[] = [
  {
    path: privateRoutes.FEED,
    text: 'Feed',
    name: 'home-outline',
  },
  {
    path: privateRoutes.CREATE,
    text: 'Create',
    name: 'plus-square-outline',
  },
  {
    path: privateRoutes.MY_PROFILE,
    text: 'My Profile',
    name: 'person-outline',
  },
  {
    path: privateRoutes.MESSENGER,
    text: 'Messenger',
    name: 'message-circle-outline',
  },
  {
    path: privateRoutes.SEARCH,
    text: 'Search',
    name: 'search',
  },
]

export const ADDITIONALLY: SidebarItemType[] = [
  {
    path: privateRoutes.STATISTICS,
    text: 'Statistics',
    name: 'trending-up',
  },
  {
    path: privateRoutes.FAVORITES,
    text: 'Favorites',
    name: 'bookmark-outline',
  },
]

export const EXIT: SidebarItemType = {
  path: '/favourites',
  text: 'Log Out',
  name: 'log-out',
}
