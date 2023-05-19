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
      name: 'menu.dashboard',
      key: '/dashboard',
      path: '/dashboard',
      icon: 'IconDashboard',
      children: [
        {
          name: 'menu.dashboard.workplace',
          key: '/dashboard/workplace',
          path: '/dashboard/workplace',
          icon: 'IconDashboard',
        },
      ],
    },
    {
      name: 'menu.DataInfo',
      key: '/datainfo',
      path: '/datainfo',
      icon: 'IconAfterData',
      children: [
        {
          name: 'menu.DataInfo',
          key: '/datainfo',
          path: '/datainfo',
          icon: 'IconAfterData',
        },
      ],
    },
    {
      name: 'menu.market',
      key: '/channel-market',
      path: '/channel-market',
      icon: 'IconChannel',
      children: [
        {
          name: 'menu.market',
          key: '/channel-market',
          path: '/channel-market',
          icon: 'IconChannel',
        },
      ],
    },
    {
      name: 'menu.usercenter',
      key: '/usercenter',
      path: '/usercenter',
      icon: 'IconUser',
      children: [
        {
          name: 'menu.usercenter',
          key: '/usercenter',
          path: '/usercenter',
        },
      ],
    },
    {
      name: 'menu.publish.demand',
      key: '/publish-demand',
      path: '/publish-demand',
      icon: 'IconPublish',
      children: [
        {
          name: 'menu.publish.demand',
          key: '/publish-demand',
          path: '/publish-demand',
        },
      ],
    },
  ],
};
