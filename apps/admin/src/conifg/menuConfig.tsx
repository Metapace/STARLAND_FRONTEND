import { AuthRightEnum } from 'apis';
export interface IMenusItem {
  name: string;
  key: string;
  path: string;
  icon?: string;
  auth?: Array<string | number>;
  children?: {
    name: string;
    key: string;
    path: string;
    icon?: string;
  }[];
}
interface IMenu {
  menu: IMenusItem[];
}

export const menuConfig: IMenu = {
  menu: [
    {
      name: '财务审核',
      key: '/finance-verify',
      path: '/finance-verify',
      icon: 'IconPublish',
      children: [
        {
          name: '财务审核',
          key: '/finance-verify',
          path: '/finance-verify',
        },
      ],
    },
    {
      name: '物料审核',
      key: '/material-verify',
      path: '/material-verify',
      icon: 'IconChannel',
      children: [
        {
          name: '物料审核',
          key: '/material-verify',
          path: '/material-verify',
        },
      ],
    },
    {
      name: '权限管理',
      key: '/permission-manage',
      path: '/permission-manage',
      icon: 'IconChannel',
      children: [
        {
          name: '角色管理',
          key: '/permission-manage/role-manage',
          path: '/permission-manage/role-manage',
        },
        {
          name: '用户管理',
          key: '/permission-manage/user-manage',
          path: '/permission-manage/user-manage',
        },
      ],
    },
  ],
};
