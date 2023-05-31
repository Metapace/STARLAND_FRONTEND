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

// IconDashboard: <DashbordIcon />,
//   IconAfterData: <AfterDataIcon />,
//   IconChannel: <ChannelIcon />,
//   IconInvite: <InviteIcon />,
//   IconPublish: <PublishIcon />,
//   IconUser: <UserIcon />,

export const menuConfig: IMenu = {
  menu: [
    {
      name: '财务审核',
      key: '/finance-verify',
      path: '/finance-verify',
      icon: 'IconPublish',
      auth: [AuthRightEnum.Finance],
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
      auth: [AuthRightEnum.Delivery, AuthRightEnum.Design],
      children: [
        {
          name: '物料审核',
          key: '/material-verify',
          path: '/material-verify',
        },
      ],
    },
  ],
};
