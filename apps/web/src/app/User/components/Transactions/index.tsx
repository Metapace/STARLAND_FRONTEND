import React from 'react';
import styles from './index.module.less';
import assetsweb2logo from 'src/assets/images/usercenter-assets-web2logo.png';
import assetsweb3logo from 'src/assets/images/usercenter-assets-web3logo.png';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
interface CompanyBoxProps {
  type: number;
  time: string;
  amount: string;
  state: string;
}

const TransactionBox: React.FC<CompanyBoxProps> = ({ type, time, amount, state }) => {
  return (
    <div className={styles['transactionbox']}>
      <div className={styles['transactionbox-left']}>
        <img src={assetsweb2logo} alt="assetsweb2logo" />
        <p>{time}</p>
      </div>
      <div className={styles['transactionbox-right']}>
        <p>+500USD</p>
        <p>入账确认中</p>
      </div>
    </div>
  );
};
const index = () => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles['container']}>
      <p className={styles['title']}>{i18n[lang]['usercenter.transactionRecord']}</p>
      <div className={styles['transaction-inner']}>
        <TransactionBox type={1} time={'2023-03-02 12:23:09'} amount={'500'} state={'入账确认中'} />
        <TransactionBox type={1} time={'2023-03-02 12:23:09'} amount={'500'} state={'入账确认中'} />
        <TransactionBox type={1} time={'2023-03-02 12:23:09'} amount={'500'} state={'入账确认中'} />
        <TransactionBox type={1} time={'2023-03-02 12:23:09'} amount={'500'} state={'入账确认中'} />
        <TransactionBox type={1} time={'2023-03-02 12:23:09'} amount={'500'} state={'入账确认中'} />
        <TransactionBox type={1} time={'2023-03-02 12:23:09'} amount={'500'} state={'入账确认中'} />
        <div className={styles['transaction-inner-page']}>
          <button>{i18n[lang]['usercenter.pre']}</button>
          <p>2/5</p>
          <button>{i18n[lang]['usercenter.next']}</button>
        </div>
      </div>
    </div>
  );
};

export default index;
