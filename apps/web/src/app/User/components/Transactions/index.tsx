import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
import assetsweb2logo from 'src/assets/images/usercenter-assets-web2logo.png';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import dayjs from 'dayjs';
import { useRequestTransactionsInfo } from 'apis';
import { DataDetailNoData } from 'src/app/DataInfo/components/DataDetail';
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
        <p>{dayjs.unix(time).format('YYYY-MM-DD HH:mm:ss')}</p>
      </div>
      <div className={styles['transactionbox-right']}>
        {type === 1 ? (
          state === 1 || state === 3 ? (
            <div style={{ color: '#F12D50', width: '50px' }}>+{amount.substring(0, amount.indexOf('.') + 3)}USD</div>
          ) : (
            <div style={{ color: '#16C4A7', width: '50px' }}>+{amount.substring(0, amount.indexOf('.') + 3)}USD</div>
          )
        ) : state === 1 || state === 3 ? (
          <div style={{ color: '#F12D50', width: '50px' }}>+{amount.substring(0, amount.indexOf('.') + 3)}USDT</div>
        ) : (
          <div style={{ color: '#16C4A7', width: '50px' }}>+{amount.substring(0, amount.indexOf('.') + 3)}USDT</div>
        )}

        {state === 1 ? (
          type === 1 ? (
            <div style={{ color: '#F2A534', width: '130px' }}>{i18n[lang]['usercenter.depositConfirmation']}</div>
          ) : (
            <div style={{ color: '#F2A534', width: '130px' }}>{i18n[lang]['usercenter.on-chainCIP']}</div>
          )
        ) : state === 2 ? (
          <div style={{ color: '#16C4A7', width: '130px' }}>{i18n[lang]['usercenter.successfulTop-up']}</div>
        ) : (
          <div style={{ color: '#F12D50', width: '130px' }}>{i18n[lang]['usercenter.failureTop-up']}</div>
        )}
      </div>
    </div>
  );
};

interface TransactionsProps {
  refresh: boolean;
}
const index: React.FC<TransactionsProps> = ({ refresh }) => {
  const { lang, i18n } = useI18n(locale);
  const pageMax = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: transactionsInfoData, isLoading: trIsloadind, refetch } = useRequestTransactionsInfo();
  // console.log('transactionsInfoData', transactionsInfoData);
  const handleNextPage = () => {
    if (transactionsInfoData && currentPage >= Math.ceil(transactionsInfoData.length / pageMax)) {
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

  useEffect(() => {
    refetch();
  }, [refresh]);

  return (
    <div className={styles['container']}>
      <p className={styles['title']}>{i18n[lang]['usercenter.transactionRecord']}</p>
      <div className={styles['transaction-inner']}>
        {trIsloadind ? (
          <DataDetailNoData type="loading" />
        ) : transactionsInfoData?.length === 0 ? (
          <DataDetailNoData type="norecord" />
        ) : (
          transactionsInfoData
            ?.slice((currentPage - 1) * pageMax, currentPage * pageMax)
            .map((item) => (
              <TransactionBox
                key={item?.id}
                type={item?.recharge_chan}
                time={item?.create_time}
                amount={item.amount}
                state={item?.status}
              />
            ))
        )}
        <div className={styles['transaction-inner-page']}>
          <button onClick={handlePrePage}>{i18n[lang]['usercenter.pre']}</button>
          <p>
            {transactionsInfoData?.length == 0 ? (
              <>
                {' '}
                <span style={{ color: '#3776F2' }}>0</span>/0
              </>
            ) : (
              <>
                {' '}
                <span style={{ color: '#3776F2' }}>{currentPage}</span>/
                {transactionsInfoData?.length && Math.ceil(transactionsInfoData?.length / pageMax)}
              </>
            )}
          </p>
          <button onClick={handleNextPage}>{i18n[lang]['usercenter.next']}</button>
        </div>
      </div>
    </div>
  );
};

export default index;
