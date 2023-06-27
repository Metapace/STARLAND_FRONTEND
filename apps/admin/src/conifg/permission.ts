type PermissionData = {
  title: string;
  key: string;
  children?: PermissionData[];
};

const permissionData: PermissionData[] = [
  {
    title: '权限管理',
    key: '0-0',
    children: [
      {
        title: '角色管理',
        key: '0-0-1',
        children: [
          {
            title: '增加角色',
            key: '0-0-1-1',
          },
          {
            title: '编辑',
            key: '0-0-1-1',
          },
        ],
      },
      {
        title: '用户管理',
        key: '0-0-2',
        children: [
          {
            title: '增加用户',
            key: '0-0-2-1',
          },
          {
            title: '编辑',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];

export default permissionData;
