import React, { useMemo } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';

import dayjs from 'dayjs';

export enum DemandType {
  NeedDeposite = 1,
  NeedPay = 2,
  NeedVerify = 3,
  VerifyFail = 4,
  Channel = 5,
  Going = 6,
  Finished = 7,
}

const DemandMap: Record<DemandType, string> = {
  [DemandType.NeedDeposite]: '待充值',
  [DemandType.NeedPay]: '待支付',
  [DemandType.NeedVerify]: '待审核',
  [DemandType.VerifyFail]: '审核失败',
  [DemandType.Channel]: '渠道分发',
  [DemandType.Going]: '投放中',
  [DemandType.Finished]: '已结束',
};

interface RemandItem {
  demandType: DemandType;
  time: number;
}

const Index: React.FC<RemandItem> = ({ demandType, time }) => {
  const tagColor: string = useMemo(() => {
    if (
      demandType === DemandType.NeedDeposite ||
      demandType === DemandType.NeedVerify ||
      demandType === DemandType.Channel
    ) {
      return 'blue';
    }
    if (demandType === DemandType.NeedPay) {
      return 'gray-green';
    }
    if (demandType === DemandType.VerifyFail) {
      return 'red';
    }
    if (demandType === DemandType.Going) {
      return 'light-green';
    }
    if (demandType === DemandType.Finished) {
      return 'gray';
    }
    return 'blue';
  }, [demandType]);

  const timeText = useMemo(() => {
    return dayjs.unix(time).format('YYYY-MM-YY HH:mm:ss');
  }, [time]);

  return (
    <div className={styles.container}>
      <div className={classNames(styles['tag'], styles[tagColor])}>{DemandMap[demandType]}</div>
      <div className={styles.title}>Web2-原生广告</div>
      <div className={styles.time}>{timeText}</div>
      <div className={styles.content}>
        <div className={styles['content-item']}>
          <span>投放国家：</span>
          <span className={styles['content-item-value']}>新加坡/美国/泰国</span>
        </div>
        <div className={styles['content-item']}>
          <span>投放国家：</span>
          <span className={styles['content-item-value']}>新加坡/美国/泰国</span>
        </div>
        <div className={styles['content-item']}>
          <span>投放国家：</span>
          <span className={styles['content-item-value']}>新加坡/美国/泰国</span>
        </div>
      </div>
      <div className={styles['bottom-button']}>
        {demandType === DemandType.Finished && (
          <div className={classNames('common-button', styles['orange-button'])}>重新投放</div>
        )}
        <div className={classNames('common-button', styles['read-detail'])}>查看详情</div>
        {demandType === DemandType.NeedDeposite && (
          <div className={classNames('common-button', styles['orange-button'])}>立即充值</div>
        )}
        {demandType === DemandType.NeedPay && (
          <div className={classNames('common-button', styles['orange-button'])}>立即支付</div>
        )}
      </div>
    </div>
  );
};

export default Index;
