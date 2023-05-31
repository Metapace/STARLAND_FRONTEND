import React, { useMemo } from 'react';
import { Modal, List, Divider, Input, Button, Form, Popconfirm, Message } from '@arco-design/web-react';
import { IconCheckCircle } from '@arco-design/web-react/icon';
import styles from './index.module.less';
import { FinanceVerifyListReturnItem, useMutationReviewFinance } from 'apis';
const TextArea = Input.TextArea;

const FormItem = Form.Item;
export interface FVerifyProps {
  open: boolean;
  handlCloseModal: () => void;
  item?: FinanceVerifyListReturnItem;
}

const Index: React.FC<FVerifyProps> = ({ open, item, handlCloseModal }) => {
  const [form] = Form.useForm();
  const { mutateAsync, isLoading } = useMutationReviewFinance();
  const dataSource = useMemo(() => {
    if (item) {
      return [
        { title: '充值金额', description: `$ ${item.amount}` },
        { title: '支付凭证下载', description: '支付凭证', link: item.image_url },
        { title: '公司/个人名字', description: item.user_name },
        { title: '公司/个人地址', description: item.address },
        { title: '公司/个人邮箱', description: item.email },
        { title: '公司注册号码(如为公司代表)', description: item.reg_number },
        { title: '公司/个人资质下载', description: '营业执照', link: item.license },
      ];
    }
    return [];
  }, [item]);

  const handlePass = async () => {
    if (item?.id) {
      await mutateAsync({ recharge_id: item?.id, status: 'success', amount: item.amount });
      Message.success('操作成功！');
      handlCloseModal();
    }
  };

  const handleReject = async () => {
    form.validate().then(async (res) => {
      if (item) {
        await mutateAsync({ recharge_id: item?.id, status: 'failure', amount: item.amount, remark: res.reason });
        Message.success('操作成功！');
        handlCloseModal();
      }
    });
  };
  return (
    <Modal visible={open} title="凭证及相关信息" footer={null} onCancel={handlCloseModal} style={{ width: '800px' }}>
      <div className={styles['modal-inner']}>
        <List
          style={{ width: 600 }}
          dataSource={dataSource}
          render={(item, index) => (
            <List.Item key={index}>
              <div className={styles['list-item-inner']}>
                <div>{item.title}</div>
                {item.link ? (
                  <a href={item.link} download>
                    {item.description}
                  </a>
                ) : (
                  <div>{item.description}</div>
                )}
              </div>
            </List.Item>
          )}
        />
        {/* <Divider></Divider> */}
        {item?.status === 1 && (
          <div className={styles['opreate-area']}>
            <div className={styles['red-alert']}>若不通过，请输入驳回理由:</div>
            <Form wrapperCol={{ span: 24 }} form={form}>
              <FormItem field="reason" rules={[{ required: true, message: '驳回操作请填入驳回理由' }]}>
                <TextArea placeholder="请输入驳回的理由" style={{ width: '600px' }} />
              </FormItem>
            </Form>

            <div className={styles['verify-button']}>
              <Button style={{ width: '200px' }} status="danger" onClick={handleReject} loading={isLoading}>
                驳回
              </Button>
              <Popconfirm
                focusLock
                title="提醒"
                content={`请确认来自${item?.user_name}的该笔充值金额$${item?.amount}已成功入账`}
                onOk={handlePass}
                okText="确认通过"
              >
                <Button type="secondary" status="success" style={{ width: '200px' }} loading={isLoading}>
                  通过
                </Button>
              </Popconfirm>
            </div>
          </div>
        )}
        {item?.status === 2 && (
          <Button
            icon={<IconCheckCircle />}
            type="secondary"
            status="success"
            style={{ width: '200px', marginTop: '12px' }}
            disabled
          >
            已通过
          </Button>
        )}
        {item?.status === 3 && (
          <div className={styles['reject-area']}>
            <div className={styles['red-alert']}>驳回理由</div>
            <TextArea value={item.remark} disabled></TextArea>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default Index;
