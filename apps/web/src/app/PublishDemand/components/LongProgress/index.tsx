import React from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import { IconCheck } from '@arco-design/web-react/icon';
interface StepItemProps {
  title: string;
  describe: string;
  isActive?: boolean;
  isDone?: boolean;
  stepIndex: number;
}

const StepItem: React.FC<StepItemProps> = ({ title, describe, isActive = false, stepIndex, isDone = false }) => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles['item-wrrape']}>
      <div className={classNames(styles['item-left'], !isActive && styles['item-left-active'])}>
        {!isDone ? stepIndex : <IconCheck className={styles['check-icon']}></IconCheck>}
      </div>
      <div className={styles['item-right']}>
        <div className={styles['item-title']}>{i18n[lang][title]}</div>
        <div className={styles['item-describe']}>{i18n[lang][describe]}</div>
      </div>
    </div>
  );
};

interface LongProgress {
  step?: number;
}

const StepItemList: Array<Pick<StepItemProps, 'title' | 'describe'>> = [
  {
    title: 'material.upload',
    describe: 'create.material.info',
  },
  {
    title: 'deposite.pay',
    describe: 'going.deposit.pay',
  },
  {
    title: 'wait.review',
    describe: 'wait.review.descibe',
  },
  {
    title: 'channel.launch',
    describe: 'channel.launch.describe',
  },
  {
    title: 'launage.porgress',
    describe: 'launage.porgress.describe',
  },
];

const Index: React.FC<LongProgress> = ({ step = 1 }) => {
  return (
    <div className={styles.container}>
      {StepItemList.map((item, index) => (
        <StepItem {...item} stepIndex={index + 1} key={index} isActive={index + 1 === step} isDone={index + 1 < step} />
      ))}
    </div>
  );
};

export default Index;
