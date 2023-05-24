import React from 'react';
import styles from './index.module.less';
import userlogo from 'src/assets/images/usercenter-userlogo.png';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import { useRequestUserIndfo, useRequestDashboardInfo, useRequestreportGet } from 'src/api/requestHooks';
import dayjs from 'dayjs';

const index = () => {
  const { lang, i18n } = useI18n(locale);
  const { data, isLoading } = useRequestUserIndfo();
  const { data: data2 } = useRequestDashboardInfo();
  return (
    <div className={styles['container']}>
      <div className={styles['basic-info']}>
        {isLoading ? <img src={userlogo} alt="user-logo" /> : <img src={data?.avatar_uri} alt="user-logo" />}
        <div className={styles['basic-info-group1']}>
          <p>
            {i18n[lang]['usercenter.accountID']}：{data?.card_id}
          </p>
          <p>
            {i18n[lang]['usercenter.registrationTime']}：{' '}
            {data?.create_time && dayjs.unix(data?.create_time).format('YYYY-MM-YY')}
          </p>
        </div>
        <div className={styles['basic-info-group2']}>
          {/* <p>{i18n[lang]['usercenter.secureBinding']}：已绑定钱包</p> */}
          <p>
            {i18n[lang]['usercenter.username']}：{data?.email}
          </p>
        </div>
      </div>
      <div className={styles['assets-info']}>
        <span className={styles['assets-info-span1']}>
          {i18n[lang]['usercenter.totalAssets']}：
          <span style={{ color: '#2D70F1', fontSize: '20px' }}>${data2?.balance} </span>
          <span style={{ color: '#33B803', fontSize: '12px' }}>USD</span>
        </span>
        <span>
          {i18n[lang]['usercenter.totalAssetsAvaiable']}：
          <span style={{ color: '#F2A534', fontSize: '20px' }}>${data2?.available_balance} </span>
          <span style={{ color: '#33B803', fontSize: '12px' }}>USD</span>
        </span>
      </div>
    </div>
  );
};
export default index;
