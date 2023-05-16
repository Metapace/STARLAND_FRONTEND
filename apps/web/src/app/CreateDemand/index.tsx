import React, { useState } from 'react';
import { useToggle } from 'ahooks';
import styles from './index.module.less';
import classNames from 'classnames';
import FormStep from './FormStep';
import UploadMaterial from './UploadMaterial';
import { Form } from '@arco-design/web-react';
import PayModal from 'src/components/PayModal';
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
  const [step, setStep] = useState<number>(2);
  const [open, { toggle, setLeft, setRight }] = useToggle(true);
  const [form] = Form.useForm();
  const handleNextStep = () => {
    form?.validate().then((res: any) => {
      console.log(res);
      setStep(2);
    });
  };
  const handleCloseModal = () => {
    setLeft();
  };

  return (
    <div className={styles.container}>
      <PayModal open={open} handleCloseModal={handleCloseModal} />
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
      {step === 1 && <FormStep form={form} handleNextStep={handleNextStep} />}
      {step === 2 && <UploadMaterial />}
    </div>
  );
};

export default Index;
