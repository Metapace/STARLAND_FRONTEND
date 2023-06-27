import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import { Button, TableColumnProps, Table, Switch } from '@arco-design/web-react';
import { useToggle } from 'ahooks';
import { useRequestUserList, UserListItem, UserStatus, useMutationEditUserStatus } from 'apis';
import AddUser from './AddUser';
import EditUser from './editUser';

const StatusSwitch = (props: { status: UserStatus; user_id: number }) => {
  const [innerStatus, setInnerStatus] = useState(false);
  const { mutateAsync, isLoading } = useMutationEditUserStatus();
  useEffect(() => {
    setInnerStatus(props.status === UserStatus.Normal);
  }, [props.status]);
  const handelChange = async (res: boolean) => {
    await mutateAsync({ user_id: props.user_id, status: res ? UserStatus.Normal : UserStatus.Forbidden });
    setInnerStatus(res);
  };
  return (
    <Switch checkedText="启用" uncheckedText="禁用" checked={innerStatus} onChange={handelChange} loading={isLoading} />
  );
};

const Index = () => {
  const [selectItem, setSelectItem] = useState<UserListItem>();
  const { data, isLoading, refetch } = useRequestUserList();
  const [open, { toggle }] = useToggle(false);
  const [EditOpen, { toggle: Edittoggle }] = useToggle(false);
  const handleCloseAddmodal = () => {
    toggle();
    refetch();
  };
  const handleCloseEditModal = () => {
    Edittoggle();
  };
  const columns: TableColumnProps[] = [
    {
      title: '账户',
      key: 'data',
      dataIndex: 'data',
      render: (_, col: UserListItem) => {
        return col.account;
      },
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色名称',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (_, col: UserListItem) => {
        return <StatusSwitch status={col.status} user_id={col.user_id}></StatusSwitch>;
      },
    },
    {
      title: '创建日期',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '操作',
      dataIndex: 'email',
      key: 'email',
      render: (_, col: UserListItem) => {
        return (
          <Button
            type="outline"
            onClick={() => {
              setSelectItem(col);
              Edittoggle();
            }}
          >
            编辑
          </Button>
        );
      },
    },
  ];

  return (
    <div className={styles['container']}>
      <div>
        <Button type="primary" onClick={toggle}>
          新增用户
        </Button>
      </div>
      <div className={styles['table-body']}>
        <Table columns={columns} data={data || []} loading={isLoading} pagination={false}></Table>
      </div>
      <AddUser open={open} handlCloseModal={handleCloseAddmodal}></AddUser>

      {EditOpen && (
        <EditUser
          open={EditOpen}
          handlCloseModal={handleCloseEditModal}
          selectItem={selectItem as UserListItem}
        ></EditUser>
      )}
    </div>
  );
};

export default Index;
