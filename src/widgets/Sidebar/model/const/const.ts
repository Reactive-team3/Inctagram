import { SidebarItemType } from '@/widgets/Sidebar/model/types/sidebar'

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
    path: '/feed',
    text: 'Feed',
    name: 'home-outline',
  },
  {
    path: '/create',
    text: 'Create',
    name: 'plus-square-outline',
  },
  {
    path: '/profile',
    text: 'My Profile',
    name: 'person-outline',
  },
  {
    path: '/message',
    text: 'Messenger',
    name: 'message-circle-outline',
  },
  {
    path: '/search',
    text: 'Search',
    name: 'search',
  },
]

export const ADDITIONALLY: SidebarItemType[] = [
  {
    path: '/statistics',
    text: 'Statistics',
    name: 'trending-up',
  },
  {
    path: '/favourites',
    text: 'Favorites',
    name: 'bookmark-outline',
  },
]

export const EXIT: SidebarItemType = {
  path: '/favourites',
  text: 'Log Out',
  name: 'log-out',
}
