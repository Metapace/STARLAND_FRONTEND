export interface IMenusItem {
  name: string;
  key: string;
  path: string;
  icon?: string;
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
      children: [
        {
          name: '财务审核',
          key: '/finance-verify',
          path: '/finance-verify',
        },
      ],
    },
  ],
};
