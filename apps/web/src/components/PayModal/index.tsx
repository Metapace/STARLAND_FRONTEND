import React, { useState } from 'react';
import styles from './index.module.less';
import { Modal } from '@arco-design/web-react';
import web2logo from 'src/assets/images/usercenter-assets-web2logo.png';
import hookIcon from 'src/assets/images/hook-icon.png';
import classNames from 'classnames';

interface PayModalProps {
  open: boolean;
  handleCloseModal: () => void;
}

const index: React.FC<PayModalProps> = ({ open, handleCloseModal }) => {
  return (
    <Modal
      wrapClassName={styles.moadlwrap}
      title="支付授权"
      visible={open}
      onCancel={() => handleCloseModal()}
      maskClosable={false}
      footer={null}
      style={{
        background: '#e9ecf4',
        border: '1px solid rgba(0, 0, 0, 0.15)',
        borderRadius: '23px',
        width: '500px',
        boxSizing: 'border-box',
        paddingInline: '62px',
        padding: '10px 39px 0 29px',
      }}
    >
      <div className={styles.content}>
        <div className={styles.amount}>
          <div className={styles['left-title']}>CPC:</div>
          <div className={styles['right-amount']}>以实际消耗为准</div>
        </div>
        <div className={styles['split-line']}></div>
        <div className={styles.account}>
          <div className={styles['left-title']}>账户余额：</div>
          <div className={styles['account-value']}>
            <img src={web2logo} alt="" />
            <div className={styles['account-value-title']}>
              <div>
                法币资产<span>(USD)</span>
              </div>
              <div>23,423</div>
            </div>
            <div className={styles['select-item']}>
              <img src={hookIcon} alt="" />
            </div>
          </div>
        </div>
        <div className={styles['split-line']}></div>
        <div className={styles['button-wrrap']}>
          <div className={classNames('common-button', styles['confirm-button'])}>确认</div>
        </div>
      </div>
    </Modal>
  );
};
export default index;
