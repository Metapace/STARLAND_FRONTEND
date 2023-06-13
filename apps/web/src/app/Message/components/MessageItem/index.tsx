import React, { useMemo, useState } from 'react';
import styles from './index.module.less';
import { IconUp } from '@arco-design/web-react/icon';
import dayjs from 'dayjs';
import { AlertReturnItem, AlertReturnType, useUpdateAlterStatus } from 'apis';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useToggle } from 'ahooks';

export const useTransformInfoContent = (type?: AlertReturnType, create_time?: number) => {
  const { lang, i18n } = useI18n(locale);
  const content = useMemo(() => {
    let showTime;
    if (create_time) {
      showTime = dayjs.unix(create_time).format('YYYY-MM-DD');
    }
    if (type === AlertReturnType.PassReview) {
      return `${i18n[lang]['notifiaction.1.1']} ${showTime} ${i18n[lang]['notifiaction.1.2']}`;
    }
    if (type === AlertReturnType.FailReview) {
      return `${i18n[lang]['notifiaction.2.1']} ${showTime} ${i18n[lang]['notifiaction.2.2']}`;
    }
    if (type === AlertReturnType.Going) {
      return `${i18n[lang]['notifiaction.3.1']} ${showTime} ${i18n[lang]['notifiaction.3.2']}`;
    }
    if (type === AlertReturnType.DepositSuccess) {
      return `${i18n[lang]['notifiaction.4.1']} ${showTime} ${i18n[lang]['notifiaction.4.2']}`;
    }
    if (type === AlertReturnType.DepositFail) {
      return `${i18n[lang]['notifiaction.5.1']} ${showTime} ${i18n[lang]['notifiaction.5.2']}`;
    }
    if (type === AlertReturnType.ActivityEnd) {
      return `${i18n[lang]['notifiaction.6.1']} ${showTime} ${i18n[lang]['notifiaction.6.2']}`;
    }
    return '';
  }, [type, create_time, lang]);
  return content;
};

const Index: React.FC<AlertReturnItem> = ({ create_time, msg_type, info_type, reason, status, id, action_id }) => {
  const { lang, i18n } = useI18n(locale);
  const showContent = useTransformInfoContent(msg_type, create_time);
  const [open, { toggle }] = useToggle(false);
  const [innerStatus, setInnerStatus] = useState(status);
  const { mutateAsync } = useUpdateAlterStatus();
  const navigate = useNavigate();
  const handleOpenDetail = async () => {
    toggle();
    if (innerStatus === 1) {
      await mutateAsync(id);
      setInnerStatus(2);
    }
  };
  return (
    <div className={styles.container}>
      <div
        className={classNames(styles['top-item'], open && styles['item-active'], status === 1 && styles.unread)}
        onClick={handleOpenDetail}
      >
        <div className={styles['top-content']}>
          <IconUp className={classNames(styles['icon-top'], open && styles['open-icon'])}></IconUp>
          <div className={styles['top-content-inner']}>{showContent}</div>
        </div>
        <div className={styles['top-time']}>{dayjs.unix(create_time).format('YYYY-MM-DD')}</div>
        <div className={styles['top-type']}>
          {info_type === 1 ? i18n[lang]['r.notifiaction'] : i18n[lang]['r.notifiaction']}
        </div>
      </div>
      {open && (
        <div className={styles['bottom-item']}>
          {msg_type === AlertReturnType.PassReview && (
            <div
              className={classNames('common-button', styles['opreate-button'])}
              onClick={() => navigate('/publish-demand')}
            >
              {i18n[lang]['enter.orders']}
            </div>
          )}
          {msg_type === AlertReturnType.FailReview && (
            <div
              className={classNames('common-button', styles['opreate-button'])}
              onClick={() => navigate(`/verify-fail?id=${action_id}`)}
            >
              {i18n[lang]['enter.detail']}
            </div>
          )}
          {msg_type === AlertReturnType.Going && (
            <div
              className={classNames('common-button', styles['opreate-button'])}
              onClick={() => navigate('/dashboard/workplace')}
            >
              {i18n[lang]['enter.dashbord']}
            </div>
          )}
          {msg_type === AlertReturnType.DepositSuccess && (
            <div
              className={classNames('common-button', styles['opreate-button'])}
              onClick={() => navigate('/usercenter')}
            >
              {i18n[lang]['enter.person.center']}
            </div>
          )}
          {msg_type === AlertReturnType.ActivityEnd && (
            <div
              className={classNames('common-button', styles['opreate-button'])}
              onClick={() => navigate('/datainfo')}
            >
              {i18n[lang]['enter.data.info']}
            </div>
          )}
          {msg_type === AlertReturnType.DepositFail && (
            <div className={classNames(styles['alter-reason'])}>{`${i18n[lang]['fail.reason']}${reason}`} </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
