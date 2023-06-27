import React, { useState } from 'react';
import styles from './index.module.less';
import dayjs from 'dayjs';
import { Button, TableColumnProps, Table } from '@arco-design/web-react';
import { useToggle } from 'ahooks';
import { useRequestRoleList, AdminRole } from 'apis';
import AddRole from './addRole';

const Index = () => {
  const [selectItem, setSelectItem] = useState<AdminRole>();
  const { data, isLoading, refetch } = useRequestRoleList();
  const [open, { toggle }] = useToggle(false);
  const handleCloseAddmodal = () => {
    toggle();
  };
  const columns: TableColumnProps[] = [
    {
      title: 'ID',
      dataIndex: 'data',
      render: (_, col: AdminRole) => {
        return col.id;
      },
    },
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '创建日期',
      dataIndex: 'status',
      render: (_, col: AdminRole) => {
        return dayjs.unix(col.createTime).format('YYYY-MM-DD');
      },
    },
    {
      title: '操作',
      dataIndex: 'email',
      render: (_, col: AdminRole) => {
        return (
          <Button
            type="outline"
            onClick={() => {
              setSelectItem(col);
              toggle();
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
          新增角色
        </Button>
      </div>
      <div className={styles['table-body']}>
        <Table columns={columns} data={data || []} loading={isLoading} pagination={false}></Table>
      </div>
      <AddRole open={open} handlCloseModal={handleCloseAddmodal}></AddRole>
    </div>
  );
};

export default Index;
