import React, { useState } from 'react';
import styles from './index.module.less';
import { Modal } from '@arco-design/web-react';
import web2logo from 'src/assets/images/usercenter-assets-web2logo.png';
import hookIcon from 'src/assets/images/hook-icon.png';
import classNames from 'classnames';
import useI18n from 'src/ahooks/useI18n';
import locale from './locales';
import { useRequestDashboardInfo } from 'src/api/requestHooks';
import { useMutationUpdateMaterial } from 'src/api/activityHooks';
import { useNavigate } from 'react-router-dom';
import Sbutton from '../Sbutton';

const passMount = 2000;

interface PayModalProps {
  open: boolean;
  handleCloseModal: () => void;
  activityId: number;
}

const index: React.FC<PayModalProps> = ({ open, handleCloseModal, activityId }) => {
  const { lang, i18n } = useI18n(locale);
  const { data } = useRequestDashboardInfo();
  const { mutateAsync: updataMaterial, isLoading } = useMutationUpdateMaterial();
  const navigate = useNavigate();
  const handleSubmit = async () => {
    await updataMaterial({ id: activityId, status: 3, pay_time: parseInt((Date.now() / 1000).toString()) });
    navigate('/create-success');
  };
  return (
    <Modal
      wrapClassName={styles.moadlwrap}
      title={i18n[lang]['pay.auth']}
      visible={open}
      onCancel={handleCloseModal}
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
          <div className={styles['right-amount']}>{i18n[lang]['base.on.cost']}</div>
        </div>
        <div className={styles['split-line']}></div>
        <div className={styles.account}>
          <div className={styles['left-title']}>{i18n[lang]['account.balance']}：</div>
          <div className={styles['account-value']}>
            <img src={web2logo} alt="" />
            <div className={styles['account-value-title']}>
              <div>
                {i18n[lang]['fiat.assets']}
                <span>(USD)</span>
              </div>
              <div>{data?.balance}</div>
            </div>
            <div className={styles['select-item']}>
              <img src={hookIcon} alt="" />
            </div>
          </div>
        </div>
        <div className={styles['split-line']}></div>
        <div className={styles['button-wrrap']}>
          {data?.balance && data?.balance > passMount ? (
            <Sbutton
              className={classNames('common-button', styles['confirm-button'])}
              onClick={handleSubmit}
              loading={isLoading}
              text={i18n[lang]['r.confirm']}
            ></Sbutton>
          ) : (
            <div
              className={classNames('common-button', styles['confirm-button'], styles['orange'])}
              onClick={() => navigate('/usercenter')}
            >
              {i18n[lang]['go.top.up']}
            </div>
          )}
        </div>
        {data?.balance && data?.balance < passMount && (
          <div className={classNames(styles['orange'], styles['insuffient-tip'])}>{i18n[lang]['go-person-center']}</div>
        )}
      </div>
    </Modal>
  );
};
export default index;
