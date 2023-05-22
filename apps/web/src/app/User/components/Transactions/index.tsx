import React, { useState } from 'react';
import styles from './index.module.less';
import assetsweb2logo from 'src/assets/images/usercenter-assets-web2logo.png';
import assetsweb3logo from 'src/assets/images/usercenter-assets-web3logo.png';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import { use } from 'echarts';
import { runtime } from 'webpack';
import dayjs from 'dayjs';
import { useRequestTransactionsInfo } from 'src/api/requestHooks';
interface CompanyBoxProps {
  type: number;
  time: number;
  amount: string;
  state: number;
}

const TransactionBox: React.FC<CompanyBoxProps> = ({ type, time, amount, state }) => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles['transactionbox']}>
      <div className={styles['transactionbox-left']}>
        <img src={assetsweb2logo} alt="assetsweb2logo" />
        <p>{dayjs.unix(time).format('YYYY-MM-YY HH:mm:ss')}</p>
      </div>
      <div className={styles['transactionbox-right']}>
        {type == 1 ? (
          <div style={{ color: '#F12D50', width: '50px' }}>+{amount}USD</div>
        ) : (
          <div style={{ color: '#16C4A7', width: '50px' }}>+{amount}USD</div>
        )}
        {state == 1 ? (
          <div style={{ color: '#F2A534' }}>{i18n[lang]['usercenter.depositConfirmation']}</div>
        ) : (
          <div style={{ color: '#16C4A7' }}>{i18n[lang]['usercenter.successfulTop-up']}</div>
        )}
      </div>
    </div>
  );
};
const index = () => {
  const { lang, i18n } = useI18n(locale);
  const pageMax = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: transactionsInfoData } = useRequestTransactionsInfo();
  console.log('transactionsInfoData', transactionsInfoData && transactionsInfoData);
  const handleNextPage = () => {
    if (currentPage >= Math.ceil(transactionsInfoData.length / pageMax)) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };
  const handlePrePage = () => {
    if (currentPage === 1) {
      return;
    }
    setCurrentPage(currentPage - 1);
  };
  return (
    <div className={styles['container']}>
      <p className={styles['title']}>{i18n[lang]['usercenter.transactionRecord']}</p>
      <div className={styles['transaction-inner']}>
        {transactionsInfoData?.slice((currentPage - 1) * pageMax, currentPage * pageMax).map((item) => (
          <TransactionBox
            type={item?.recharge_chan}
            time={item?.create_time}
            amount={item.amount}
            state={item?.status}
          />
        ))}
        <div className={styles['transaction-inner-page']}>
          {transactionsInfoData?.length !== 0 ? (
            <>
              <button onClick={handlePrePage}>{i18n[lang]['usercenter.pre']}</button>
              <p>
                {currentPage}/{transactionsInfoData && Math.ceil(transactionsInfoData?.length / pageMax)}
              </p>
              <button onClick={handleNextPage}>{i18n[lang]['usercenter.next']}</button>
            </>
          ) : (
            <div>{i18n[lang]['usercenter.noRewards']}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default index;
