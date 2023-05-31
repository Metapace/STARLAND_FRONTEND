import React, { useState } from 'react';
import styles from './index.module.less';
import { Form, Grid, Select, Button, TableColumnProps, Tag, Table } from '@arco-design/web-react';
import { useToggle } from 'ahooks';
import VerifyModal from './VerifyModal';
import {
  useMutationReviewFinance,
  useRequestFinanceVerifyList,
  FinanceDataEnum,
  FinanceVerifyStatusEnum,
  FinanceDataEnumMap,
  FinanceVerifyStatusEnumMap,
  FinanceVerifyListParams,
  FinanceVerifyListReturn,
  FinanceVerifyListReturnItem,
} from 'apis';

const initialValues = {
  date_type: FinanceDataEnum.LastHalfYear,
  status: FinanceVerifyStatusEnum.All,
  page_no: 1,
  page_size: 10,
};

const Option = Select.Option;
const Index = () => {
  const [form] = Form.useForm();
  const [selectItem, setSelectItem] = useState<FinanceVerifyListReturnItem>();
  const [SearchValue, setSearchValue] = useState<FinanceVerifyListParams>(initialValues);
  const { data, isLoading, refetch } = useRequestFinanceVerifyList(SearchValue);
  const [open, { toggle }] = useToggle(false);
  const handleSearch = async () => {
    const res = await form.getFieldsValue();
    const tempValue: FinanceVerifyListParams = {
      page_no: 1,
      page_size: SearchValue.page_size,
      date_type: +res.date_type || FinanceDataEnum.LastHalfYear,
      status: +res.status || FinanceVerifyStatusEnum.All,
    };
    setSearchValue(tempValue);
  };
  const columns: TableColumnProps[] = [
    {
      title: '日期时间',
      dataIndex: 'data',
      render: (_, col: FinanceVerifyListReturnItem) => {
        return col.date;
      },
    },
    {
      title: '充值主体',
      dataIndex: 'user_name',
    },
    {
      title: '主体类别',
      dataIndex: 'user_type',
      render: (_, col: FinanceVerifyListReturnItem) => {
        return col.user_type === 1 ? '个人' : '公司';
      },
    },
    {
      title: '充值金额',
      dataIndex: 'amount',
      render: (_, col: FinanceVerifyListReturnItem) => {
        return `$${col.amount}`;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (_, col: FinanceVerifyListReturnItem) => {
        if (col.status === 1) {
          return <Tag color="orange">待审核</Tag>;
        }
        if (col.status === 2) {
          return <Tag color="green">已通过</Tag>;
        }
        if (col.status === 3) {
          return <Tag color="red">已驳回</Tag>;
        }
      },
    },
    {
      title: '具体信息',
      dataIndex: 'email',
      render: (_, col: FinanceVerifyListReturnItem) => {
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
  ];
  const handlePageChange = (page: number) => {
    const tempSearchProps = { ...SearchValue };
    tempSearchProps.page_no = page;
    setSearchValue(tempSearchProps);
  };

  const handleClose = () => {
    refetch();
    toggle();
  };
  return (
    <div className={styles['container']}>
      {open && <VerifyModal open={open} handlCloseModal={handleClose} item={selectItem}></VerifyModal>}

      <div className={styles['search-area']}>
        <Form
          form={form}
          layout="horizontal"
          initialValues={{ status: initialValues.status.toString(), date_type: initialValues.date_type.toString() }}
        >
          <Grid.Row gutter={24}>
            <Grid.Col span={8}>
              <Form.Item label="时间" field="date_type" labelAlign="left" labelCol={{ span: 2 }}>
                <Select placeholder="请选择时间">
                  {Object.keys(FinanceDataEnumMap).map((key) => (
                    <Option key={key} value={key}>
                      {FinanceDataEnumMap[key as unknown as FinanceDataEnum]}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Grid.Col>
            <Grid.Col span={8}>
              <Form.Item label="审核状态" field="status">
                <Select placeholder="请选择审核状态">
                  {Object.keys(FinanceVerifyStatusEnumMap).map((key) => (
                    <Option key={key} value={key}>
                      {FinanceVerifyStatusEnumMap[key as unknown as FinanceVerifyStatusEnum]}
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
          data={data?.list}
          loading={isLoading}
          pagination={{
            total: data?.num,
            pageSize: SearchValue.page_size,
            onChange: handlePageChange,
            current: SearchValue.page_no,
          }}
        ></Table>
      </div>
    </div>
  );
};

export default Index;
