import React, { useState } from 'react';
import styles from './index.module.less';
import assetsweb2logo from 'src/assets/images/usercenter-assets-web2logo.png';

interface DataDetailBoxProps {
  startTime: string;
  endTime: string;
  channel: string;
  state: string;
  op: string;
}

const DataDetailBox: React.FC<DataDetailBoxProps> = ({ startTime, endTime, channel, state, op }) => {
  return (
    <div className={styles['datadetail-content-inner']}>
      <div className={styles['datadetail-content-inner-left']}>
        <div>{startTime}</div>
        <div>{endTime}</div>
        <div>{channel}</div>
      </div>
      <div className={styles['datadetail-content-inner-right']}>
        <div className={styles['datadetail-content-inner-right-state']}>{state}</div>
        <div className={styles['datadetail-content-inner-right-btn']}>{op}</div>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className={styles['container']}>
      <div className={styles['datadetail-top']}>详细数据</div>
      <div className={styles['datadetail-content']}>
        {/* 表头 */}
        <div className={styles['datadetail-content-header']}>
          <div className={styles['datadetail-content-header-left']}>
            <p>投放时间</p>
            <p>截止时间</p>
            <p>投放渠道</p>
          </div>
          <div className={styles['datadetail-content-header-right']}>
            <p>状态</p>
            <p>操作</p>
          </div>
        </div>
        <DataDetailBox startTime="2023-02-14" endTime="2023-02-14" channel="TTTTTTTTTTTTTTTTTTTTTTTTTT" state="投放中" op="关闭投放" />
        <DataDetailBox startTime="2023-02-14" endTime="2023-02-14" channel="TTTTTTTTTTTTTTTTTTTTTTTTTT" state="投放中" op="关闭投放" />
        <DataDetailBox startTime="2023-02-14" endTime="2023-02-14" channel="TTTTTTTTTTTTTTTTTTTTTTTTTT" state="投放中" op="关闭投放" />
        <DataDetailBox startTime="2023-02-14" endTime="2023-02-14" channel="TTTTTTTTTTTTTTTTTTTTTTTTTT" state="投放中" op="关闭投放" />
        <DataDetailBox startTime="2023-02-14" endTime="2023-02-14" channel="TTTTTTTTTTTTTTTTTTTTTTTTTT" state="投放中" op="关闭投放" />
        <div className={styles['transaction-inner-page']}>
          <button>上一页</button>
          <p>2/5</p>
          <button>下一页</button>
        </div>
      </div>
    </div>
  );
};

export default Index;
