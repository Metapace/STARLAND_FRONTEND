import React, { useMemo } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';

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
  [DemandType.NeedDeposite]: 'waite.deposit',
  [DemandType.NeedPay]: 'waite.auth',
  [DemandType.NeedVerify]: 'waite.review',
  [DemandType.VerifyFail]: 'review.failtrue',
  [DemandType.Channel]: 'channel.split',
  [DemandType.Going]: 'on.progress',
  [DemandType.Finished]: 'already.finish',
};

interface RemandItem {
  demandType: DemandType;
  time: number;
}

const Index: React.FC<RemandItem> = ({ demandType, time }) => {
  const { lang, i18n } = useI18n(locale);
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

  const renderType: number = useMemo(() => {
    if (
      demandType === DemandType.NeedDeposite ||
      demandType === DemandType.NeedVerify ||
      demandType === DemandType.VerifyFail
    ) {
      return 1;
    }
    return 2;
  }, [demandType]);

  const timeText = useMemo(() => {
    return dayjs.unix(time).format('YYYY-MM-YY HH:mm:ss');
  }, [time]);

  return (
    <div className={styles.container}>
      <div className={classNames(styles['tag'], styles[tagColor])}>{i18n[lang][DemandMap[demandType]]}</div>
      <div className={styles.title}>Web2-原生广告</div>
      <div className={styles.time}>{timeText}</div>
      <div className={styles.content}>
        {renderType === 1 && (
          <>
            {/* 投放国家 */}
            <div className={styles['content-item']}>
              <span>{i18n[lang]['launch.country']}：</span>
              <span className={styles['content-item-value']}>新加坡/美国/泰国</span>
            </div>
            {/* 每日预算 */}
            <div className={styles['content-item']}>
              <span>{i18n[lang]['daily.cost']}：</span>
              <span className={styles['content-item-value']}>新加坡/美国/泰国</span>
            </div>
            {/* 投放人群 */}
            <div className={styles['content-item']}>
              <span>{i18n[lang]['launch.pepole']}：</span>
              <span className={styles['content-item-value']}>新加坡/美国/泰国</span>
            </div>
          </>
        )}
        {renderType === 2 && (
          <>
            {/* 投放金额 */}
            <div className={styles['content-item']}>
              <span>{i18n[lang]['launch.amount']}：</span>
              <span className={styles['content-item-value']}>新加坡/美国/泰国</span>
            </div>
            {/* 投放数量 */}
            <div className={styles['content-item']}>
              <span>{i18n[lang]['launch.number']}：</span>
              <span className={styles['content-item-value']}>新加坡/美国/泰国</span>
            </div>
          </>
        )}
      </div>
      <div className={styles['bottom-button']}>
        {demandType === DemandType.Finished && (
          <div className={classNames('common-button', styles['orange-button'])}>{i18n[lang]['re.launch']}</div>
        )}

        {demandType === DemandType.NeedDeposite && (
          <div className={classNames('common-button', styles['orange-button'])}>{i18n[lang]['deposite.right']}</div>
        )}
        {demandType === DemandType.NeedPay && (
          <div className={classNames('common-button', styles['orange-button'])}>{i18n[lang]['pay.auth']}</div>
        )}
        {demandType === DemandType.Going ? (
          <div className={classNames('common-button', styles['read-detail'])}>{i18n[lang]['view.data']}</div>
        ) : (
          <div className={classNames('common-button', styles['read-detail'])}>{i18n[lang]['view.detail']}</div>
        )}
      </div>
    </div>
  );
};

export default Index;
