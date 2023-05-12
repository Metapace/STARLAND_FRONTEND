import React from 'react';
import styles from './index.module.less';
import userlogo from 'src/assets/images/usercenter-userlogo.png';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';

const index = () => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles['container']}>
      <div className={styles['basic-info']}>
        <img src={userlogo} alt="user-logo" />
        <div className={styles['basic-info-group1']}>
          <p>{i18n[lang]['usercenter.accountID']}：1234354556</p>
          <p>{i18n[lang]['usercenter.registrationTime']}：2021-10-29</p>
        </div>
        <div className={styles['basic-info-group2']}>
          <p>{i18n[lang]['usercenter.secureBinding']}：已绑定钱包</p>
          <p>{i18n[lang]['usercenter.username']}：邮箱/钱包地址</p>
        </div>
      </div>
      <div className={styles['assets-info']}>
        <span className={styles['assets-info-span1']}>
          {i18n[lang]['usercenter.totalAssets']}：<span style={{ color: '#2D70F1', fontSize: '20px' }}>$3721.23 </span>
          <span style={{ color: '#33B803', fontSize: '12px' }}>USD</span>
        </span>
        <span>
          {i18n[lang]['usercenter.totalAssetsAvaiable']}：
          <span style={{ color: '#F2A534', fontSize: '20px' }}>$3721.23 </span>
          <span style={{ color: '#33B803', fontSize: '12px' }}>USD</span>
        </span>
      </div>
    </div>
  );
};
export default index;
