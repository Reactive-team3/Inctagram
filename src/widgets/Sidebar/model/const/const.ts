import Home from '@/assets/icons/Home.svg'
import Plus from '@/assets/icons/Plus.svg'
import Profile from '@/assets/icons/Profile.svg'
import Message from '@/assets/icons/Message.svg'
import Search from '@/assets/icons/Search.svg'
import Trending from '@/assets/icons/Trending.svg'
import Bookmark from '@/assets/icons/Bookmark.svg'
import { SidebarItemType } from '@/widgets/Sidebar/model/types/sidebar'

export const BASIC_NAVIGATION: SidebarItemType[] = [
  {
    path: '/',
    text: 'Главная',
    Icon: Home,
  },
  {
    path: '/create',
    text: 'Создать',
    Icon: Plus,
  },
  {
    path: '/profile',
    text: 'Мой профиль',
    Icon: Profile,
  },
  {
    path: '/message',
    text: 'Сообщения',
    Icon: Message,
  },
  {
    path: '/search',
    text: 'Поиск',
    Icon: Search,
  },
]

export const ADDITIONALLY: SidebarItemType[] = [
  {
    path: '/statistics',
    text: 'Статистика',
    Icon: Trending,
  },
  {
    path: '/favourites',
    text: 'Избранное',
    Icon: Bookmark,
  },
]

export const EXIT: SidebarItemType = {
  path: '/favourites',
  text: 'Выход',
  Icon: Bookmark,
}
