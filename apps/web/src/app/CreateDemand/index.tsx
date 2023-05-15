import React, { useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';

interface CircleItemProps {
  index: number;
  step: number;
  title: string;
}

const CircleItem: React.FC<CircleItemProps> = ({ index, step, title }) => {
  return (
    <div className={styles['circle-item-wrrape']}>
      <div
        className={classNames(
          styles['circle-item'],
          index === step && styles['circle-active'],
          index < step && styles['circle-done'],
        )}
      >
        {index < step ? '勾' : index}
      </div>
      <div className={styles['circle-item-text']}>{title}</div>
    </div>
  );
};

const ProgressLine = () => {
  return (
    <div className={styles['progress-line']}>
      <div className={styles['line']}></div>
      <div className={styles['dot']}></div>
    </div>
  );
};

const Index = () => {
  const [step, setStep] = useState<number>(1);
  return (
    <div className={styles.container}>
      <div className={styles.title}>创建表单</div>
      <div className={styles['progress-container']}>
        <div className={styles['progress-container-inner']}>
          <CircleItem title="选择基础信息" index={1} step={step} />
          <ProgressLine />
          <CircleItem title="上传基础物料" index={2} step={step} />
          <ProgressLine />
          <CircleItem title="选择基础信息" index={3} step={step} />
        </div>
      </div>
    </div>
  );
};

export default Index;
