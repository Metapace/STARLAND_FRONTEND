import React, { useState } from 'react';
import styles from './index.module.less';
import assetsweb2logo from 'src/assets/images/usercenter-assets-web2logo.png';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';

interface DataDetailBoxProps {
  startTime: string;
  endTime: string;
  channel: string;
  state: string;
  op: string;
}

const DataDetailBox: React.FC<DataDetailBoxProps> = ({ startTime, endTime, channel, state, op }) => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles['datadetail-content-inner']}>
      <div className={styles['datadetail-content-inner-left']}>
        <div>{startTime}</div>
        <div>{endTime}</div>
        <div className={styles['datadetail-content-inner-left-channel']} >{channel}</div>
      </div>
      <div className={styles['datadetail-content-inner-right']}>
        <div className={styles['datadetail-content-inner-right-state']}>{state}</div>
        <div className={styles['datadetail-content-inner-right-btn']}>{op}</div>
      </div>
    </div>
  );
};

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles['container']}>
      <div className={styles['datadetail-top']}>{i18n[lang]['datainfo.detailedData']}</div>
      <div className={styles['datadetail-content']}>
        {/* 表头 */}
        <div className={styles['datadetail-content-header']}>
          <div className={styles['datadetail-content-header-left']}>
            <p>{i18n[lang]['datainfo.placementTime']}</p>
            <p>{i18n[lang]['datainfo.deadline']}</p>
            <p>{i18n[lang]['datainfo.placementChannel']}</p>
          </div>
          <div className={styles['datadetail-content-header-right']}>
            <p>{i18n[lang]['datainfo.status']}</p>
            <p>{i18n[lang]['datainfo.operation']}</p>
          </div>
        </div>
        <DataDetailBox
          startTime="2023-02-14"
          endTime="2023-02-14"
          channel="TTTTTTTTTTTTTTTTTTTTTTTTTT"
          state="投放中"
          op="关闭投放"
        />
        <DataDetailBox
          startTime="2023-02-14"
          endTime="2023-02-14"
          channel="TTTTTTTTTTTTTTTTTTTTTTTTTT"
          state="投放中"
          op="关闭投放"
        />
        <DataDetailBox
          startTime="2023-02-14"
          endTime="2023-02-14"
          channel="TTTTTTTTTTTTTTTTTTTTTTTTTT"
          state="投放中"
          op="关闭投放"
        />
        <DataDetailBox
          startTime="2023-02-14"
          endTime="2023-02-14"
          channel="TTTTTTTTTTTTTTTTTTTTTTTTTT"
          state="投放中"
          op="关闭投放"
        />
        <DataDetailBox
          startTime="2023-02-14"
          endTime="2023-02-14"
          channel="TTTTTTTTTTTTTTTTTTTTTTTTTT"
          state="投放中"
          op="关闭投放"
        />
        <div className={styles['datadetail-content-page']}>
          <button>{i18n[lang]['datainfo.pre']}</button>
          <p>2/5</p>
          <button>{i18n[lang]['datainfo.next']}</button>
        </div>
      </div>
    </div>
  );
};

export default Index;
