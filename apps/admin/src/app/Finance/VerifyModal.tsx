import React, { useMemo } from 'react';
import { Modal, List } from '@arco-design/web-react';
import styles from './index.module.less';
import { FinanceVerifyListReturnItem } from 'apis';

export interface FVerifyProps {
  open: boolean;
  handlCloseModal: () => void;
  item?: FinanceVerifyListReturnItem;
}

const Index: React.FC<FVerifyProps> = ({ open, item, handlCloseModal }) => {
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
      </div>
    </Modal>
  );
};

export default Index;
