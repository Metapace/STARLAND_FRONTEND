import React, { useState, useMemo } from 'react';
import styles from './index.module.less';
import { Form, Grid, Select, Button, TableColumnProps, Tag, Table, Switch } from '@arco-design/web-react';
import { useToggle } from 'ahooks';
import VerifyModal from './VerifyModal';
import usePermission from 'src/ahooks/usePermission';
import {
  useRequestMaterialVerifyList,
  MaterialVerifyListParams,
  MaterialListItem,
  FinanceDataEnum,
  FinanceDataEnumMap,
  useMutationMaterialStatus,
  DemandType,
} from 'apis';
import dayjs from 'dayjs';

const initialValues = {
  date_type: FinanceDataEnum.LastHalfYear,
  page: 1,
  page_size: 10,
};

const TableSwitch = ({ item, isSwicthPermission }: { item: MaterialListItem; isSwicthPermission: boolean }) => {
  const [innerStatus, setInnerStatus] = useState<DemandType>(item.status);
  const { mutateAsync, isLoading } = useMutationMaterialStatus();
  const handleChangeSwitch = async (value: boolean) => {
    const status = value ? 6 : 7;
    await mutateAsync({ status, id: item.id });
    setInnerStatus(status);
  };
  return (
    <div className={styles['switch-container']}>
      <Switch
        className={styles['table-switch']}
        checked={innerStatus === DemandType.Going || innerStatus === DemandType.CloseWait}
        onChange={handleChangeSwitch}
        loading={isLoading}
        disabled={!isSwicthPermission}
      ></Switch>
      {innerStatus === DemandType.CloseWait && <div className={styles['close-tag']}>用户申请关闭</div>}
    </div>
  );
};

const Option = Select.Option;
const Index = () => {
  const [form] = Form.useForm();
  const [selectItem, setSelectItem] = useState<MaterialListItem>();
  const [SearchValue, setSearchValue] = useState<MaterialVerifyListParams>(initialValues);
  const { data, isLoading, refetch } = useRequestMaterialVerifyList(SearchValue);
  const { isPermission } = usePermission();
  const [open, { toggle }] = useToggle(false);
  const isSwicthPermission = useMemo(() => {
    return isPermission('/api/admin/activity/status/update');
  }, [isPermission]);
  const handleSearch = async () => {
    const res = await form.getFieldsValue();
    const tempValue: MaterialVerifyListParams = {
      page: 1,
      page_size: SearchValue.page_size,
      date_type: +res.date_type || FinanceDataEnum.LastHalfYear,
    };
    setSearchValue(tempValue);
  };
  const columns: TableColumnProps[] = [
    {
      title: '订单创建日期',
      dataIndex: 'data',
      render: (_, col: MaterialListItem) => {
        return dayjs.unix(col.create_time).format('YYYY-MM-DD');
      },
    },
    {
      title: '项目名称',
      dataIndex: 'name',
    },
    {
      title: '投放部审核结果',
      dataIndex: 'user_type',
      render: (_, col: MaterialListItem) => {
        if (col.deliver === 0) {
          return <Tag color="gold">待审核</Tag>;
        }
        if (col.deliver === 2) {
          return <Tag color="green">已通过</Tag>;
        }
        if (col.deliver === 1) {
          return <Tag color="red">已驳回</Tag>;
        }
      },
    },
    {
      title: '设计部审核结果',
      dataIndex: 'amount',
      render: (_, col: MaterialListItem) => {
        if (col.design === 0) {
          return <Tag color="gold">待审核</Tag>;
        }
        if (col.design === 2) {
          return <Tag color="green">已通过</Tag>;
        }
        if (col.design === 1) {
          return <Tag color="red">已驳回</Tag>;
        }
      },
    },
    {
      title: '具体信息',
      dataIndex: 'emails',
      render: (_, col: MaterialListItem) => {
        return (
          <Button
            onClick={() => {
              setSelectItem(col);
              toggle();
            }}
          >
            查看详情
          </Button>
        );
      },
    },
    {
      title: '投放状态',
      dataIndex: 'status',
      render: (_, col: MaterialListItem) => {
        return <TableSwitch item={col} isSwicthPermission={isSwicthPermission || false}></TableSwitch>;
      },
    },
  ];
  const handlePageChange = (page: number) => {
    const tempSearchProps = { ...SearchValue };
    tempSearchProps.page = page;
    setSearchValue(tempSearchProps);
  };

  const handleClose = () => {
    refetch();
    toggle();
  };
  return (
    <div className={styles['container']}>
      {open && (
        <VerifyModal
          open={open}
          handlCloseModal={handleClose}
          item={selectItem}
          isPermission={isPermission}
        ></VerifyModal>
      )}

      <div className={styles['search-area']}>
        <Form form={form} layout="horizontal" initialValues={{ date_type: initialValues.date_type.toString() }}>
          <Grid.Row gutter={24}>
            <Grid.Col span={8}>
              <Form.Item label="时间" field="date_type" labelAlign="left" labelCol={{ span: 4 }}>
                <Select placeholder="请选择时间">
                  {Object.keys(FinanceDataEnumMap).map((key) => (
                    <Option key={key} value={key}>
                      {FinanceDataEnumMap[key as unknown as FinanceDataEnum]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={2} style={{ textAlign: 'right' }}>
              <Button onClick={handleSearch} type="primary">
                搜索
              </Button>
            </Grid.Col>
          </Grid.Row>
        </Form>
      </div>
      <div className={styles['table-body']}>
        <Table
          columns={columns}
          data={data?.list || []}
          loading={isLoading}
          pagination={{
            total: data?.num,
            pageSize: SearchValue.page_size,
            onChange: handlePageChange,
            current: SearchValue.page,
          }}
        ></Table>
      </div>
    </div>
  );
};

export default Index;
