import React, { useState } from 'react';
import styles from './index.module.less';
import assetsweb2logo from 'src/assets/images/usercenter-assets-web2logo.png';
import assetsweb3logo from 'src/assets/images/usercenter-assets-web3logo.png';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import { use } from 'echarts';
import { runtime } from 'webpack';
interface CompanyBoxProps {
  type: number;
  time: number;
  amount: number;
  state: string;
}

const data:Array<any>= [];

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
  const pageMax = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const handleNextPage = () => {
    if (currentPage >= Math.ceil(data.length / pageMax)) {
      console.log('到头了');
      return;
    }
    setCurrentPage(currentPage + 1);
  };
  const handlePrePage = () => {
    if (currentPage === 1) {
      console.log('到头了');
      return;
    }
    setCurrentPage(currentPage - 1);
  };
  return (
    <div className={styles['container']}>
      <p className={styles['title']}>{i18n[lang]['usercenter.transactionRecord']}</p>
      <div className={styles['transaction-inner']}>
        {data?.slice((currentPage - 1) * pageMax, currentPage * pageMax).map((item) => (
          <TransactionBox type={1} time={item?.time} amount={item.amount} state={'入账确认中'} />
        ))}
        <div className={styles['transaction-inner-page']}>
          {data.length!==0 && (
            <>
              <button onClick={handlePrePage}>{i18n[lang]['usercenter.pre']}</button>
              <p>
                {currentPage}/{Math.ceil(data.length / pageMax)}
              </p>
              <button onClick={handleNextPage}>{i18n[lang]['usercenter.next']}</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
