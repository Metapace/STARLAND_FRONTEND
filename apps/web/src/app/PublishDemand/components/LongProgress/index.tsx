import React from 'react';
import styles from './index.module.less';
import classNames from 'classnames';

interface StepItemProps {
  title: string;
  describe: string;
  isActive?: boolean;
  stepIndex: number;
}

const StepItem: React.FC<StepItemProps> = ({ title, describe, isActive = false, stepIndex }) => {
  return (
    <div className={styles['item-wrrape']}>
      <div className={classNames(styles['item-left'], !isActive && styles['item-left-active'])}>{stepIndex}</div>
      <div className={styles['item-right']}>
        <div className={styles['item-title']}>{title}</div>
        <div className={styles['item-describe']}>{describe}</div>
      </div>
    </div>
  );
};

interface LongProgress {
  step?: number;
}

const StepItemList: Array<Pick<StepItemProps, 'title' | 'describe'>> = [
  {
    title: '素材信息上传',
    describe: '创建渠道物料活动信息',
  },
  {
    title: '充值支付',
    describe: '进行充值及预付费用',
  },
  {
    title: '等待审核',
    describe: '资料及渠道分发审核',
  },
  {
    title: '渠道投放',
    describe: '渠道审核及数据测试',
  },
  {
    title: '广告上线',
    describe: '查看相关投放数据明细',
  },
];

const Index: React.FC<LongProgress> = ({ step = 1 }) => {
  return (
    <div className={styles.container}>
      {StepItemList.map((item, index) => (
        <StepItem {...item} stepIndex={index + 1} key={index} isActive={index < step} />
      ))}
    </div>
  );
};

export default Index;
