import React, { useState } from 'react';
import styles from './index.module.less';
import { Button, TableColumnProps, Table } from '@arco-design/web-react';
import { useToggle } from 'ahooks';
import { useRequestRoleList, AdminRole } from 'apis';
import usePermission from 'src/ahooks/usePermission';
import AddRole from './addRole';
import EditRole from './editRole';

const Index = () => {
  const [selectItem, setSelectItem] = useState<AdminRole>();
  const { data, isLoading, refetch } = useRequestRoleList();
  const [open, { toggle }] = useToggle(false);
  const [EditOpen, { toggle: Edittoggle }] = useToggle(false);
  const { isPermission } = usePermission();
  const handleCloseAddmodal = () => {
    toggle();
    refetch();
  };
  const handleCloseEditModal = () => {
    Edittoggle();
  };
  const columns: TableColumnProps[] = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'data',
      render: (_, col: AdminRole) => {
        return col.id;
      },
    },
    {
      title: '角色名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '创建日期',
      key: 'status',
      dataIndex: 'status',
      render: (_, col: AdminRole) => {
        return col.create_time;
      },
    },
    {
      title: '操作',
      key: 'email',
      dataIndex: 'email',
      render: (_, col: AdminRole) => {
        return (
          <Button
            type="outline"
            onClick={() => {
              setSelectItem(col);
              Edittoggle();
            }}
            disabled={!isPermission('/api/role/menu_update') || +col.id === 1}
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
        <Button type="primary" onClick={toggle} disabled={!isPermission('/api/role/add')}>
          新增角色
        </Button>
      </div>
      <div className={styles['table-body']}>
        <Table columns={columns} data={data || []} loading={isLoading} pagination={false}></Table>
      </div>
      <AddRole open={open} handlCloseModal={handleCloseAddmodal}></AddRole>
      {EditOpen && (
        <EditRole
          open={EditOpen}
          handlCloseModal={handleCloseEditModal}
          selectItem={selectItem as AdminRole}
        ></EditRole>
      )}
    </div>
  );
};

export default Index;
