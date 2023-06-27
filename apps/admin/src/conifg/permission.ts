type PermissionData = {
  title: string;
  key: string;
  children?: PermissionData[];
};

const permissionData: PermissionData[] = [
  {
    title: '权限管理',
    key: '/permission-manage',
    children: [
      {
        title: '角色管理',
        key: '/permission-manage/role-manage',
        children: [
          {
            title: '角色菜单',
            key: '/api/role/list',
          },
          {
            title: '增加角色',
            key: '/api/role/add',
          },
          {
            title: '编辑',
            key: '/api/role/menu_update',
          },
        ],
      },
      {
        title: '用户管理',
        key: '/permission-manage/user-manage',
        children: [
          {
            title: '用户菜单',
            key: '/api/user/list',
          },
          {
            title: '增加用户',
            key: '/api/user/regist',
          },
          {
            title: '编辑用户',
            key: '/api/user/update_role',
          },
          {
            title: '更改用户状态',
            key: '/api/user/update_status',
          },
        ],
      },
    ],
  },
  {
    title: '财务审核',
    key: '/finance-verify',
    children: [
      {
        title: '财务审核列表',
        key: '/api/admin/recharge/list',
      },
      {
        title: '财务充值审核',
        key: '/api/admin/recharge/verify',
      },
    ],
  },
  {
    title: '物料审核',
    key: '/material-verify',
    children: [
      {
        title: '物料审核列表',
        key: '/api/admin/act/list',
      },
      {
        title: '设计部物料审核',
        key: '/api/admin/activity/update2',
      },
      {
        title: '投放部物料审核',
        key: '/api/admin/activity/update1',
      },
    ],
  },
];

export const findKey = (arr: PermissionData[]) => {
  let aa: Array<string> = [];
  arr.forEach((item) => {
    aa.push(item.key);
    if (item.children) {
      const back = findKey(item.children);
      aa = [...aa, ...back];
    }
  });
  return aa;
};

export default permissionData;
