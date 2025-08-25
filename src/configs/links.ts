import { FaListUl, FaUserFriends } from 'react-icons/fa';

export const Links = {
  auth: {
    signin: '/auth/signin',
    signup: '/auth/signup',
    signout: '/auth/signout',
  },
  mypage: {
    favorite: '/mypage/favorite',
  },
  admin: {
    users: '/admin/users',
    themes: '/admin/themes',
    collections: '/admin/collections',
    items: '/admin/items',
  },
  home: '/',
  // error: '/error',
};

export const adminLinks = [
  {
    link: Links.admin.users,
    label: 'ユーザー管理',
    icon: FaUserFriends,
    description: '管理者ユーザーの追加、削除',
  },
  {
    link: Links.admin.themes,
    label: 'テーマ管理',
    icon: FaListUl,
    description: '作品のテーマの追加、変更、削除',
  },
  {
    link: Links.admin.collections,
    label: 'サブテーマ管理',
    icon: FaListUl,
    description: '作品のサブテーマの追加、変更、削除',
  },
  { link: Links.admin.items, label: '作品管理', icon: FaListUl, description: '作品の追加、変更、削除' },
];
