import React, { useState } from 'react';
import { useToggle } from 'ahooks';
import styles from './index.module.less';
import classNames from 'classnames';
import FormStep from './FormStep';
import UploadMaterial from './UploadMaterial';
import { Form, Message } from '@arco-design/web-react';
import PayModal from 'src/components/PayModal';
import useI18n from 'src/ahooks/useI18n';
import { IconCheck } from '@arco-design/web-react/icon';
import locales from './locales';
import { useMutationCreateMaterial } from 'apis';
import { UploadItem } from 'src/types/arco';
import { MaterialItem } from 'src/api/activity';

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
        {index < step ? <IconCheck></IconCheck> : index}
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
  const { lang, i18n } = useI18n(locales);
  const [fileList, setFileList] = useState<Array<UploadItem>>([]);
  const [step, setStep] = useState<number>(1);
  const [activityId, setActivityId] = useState<number>(0);
  const [open, { setLeft, toggle }] = useToggle(false);
  const createMutation = useMutationCreateMaterial();
  const [form] = Form.useForm();
  const handleNextStep = () => {
    form?.validate().then((res: unknown) => {
      console.log(res, 'res');
      setStep(2);
    });
  };
  const handleCloseModal = () => {
    setLeft();
  };

  const handleSubmit = async () => {
    if (fileList.length > 0) {
      const formValues = form.getFieldsValue() as Omit<MaterialItem, 'materials_url' | 'country'> & {
        country: Array<string>;
      };
      const realFormValue = form.getFieldsValue() as Omit<MaterialItem, 'materials_url'>;
      if (formValues.country.length > 0) {
        realFormValue.country = formValues.country.join(',');
      }
      const materials_url = fileList.map((item) => item.response.Location).join(',');
      const res = await createMutation.mutateAsync({ ...realFormValue, materials_url });
      setActivityId(res);
      toggle();
    } else {
      Message.warning('Please Upload Materials');
    }
  };

  return (
    <div className={styles.container}>
      <PayModal open={open} handleCloseModal={handleCloseModal} activityId={activityId} />
      <div className={styles.title}>{i18n[lang]['create.form']}</div>
      <div className={styles['progress-container']}>
        <div className={styles['progress-container-inner']}>
          <CircleItem title={i18n[lang]['chose.base.info']} index={1} step={step} />
          <ProgressLine />
          <CircleItem title={i18n[lang]['upload.base.material']} index={2} step={step} />
          <ProgressLine />
          <CircleItem title={i18n[lang]['compelte.create']} index={3} step={step} />
        </div>
      </div>
      <div style={step === 2 ? { display: 'none' } : {}}>
        <FormStep form={form} handleNextStep={handleNextStep} />
      </div>
      {step === 2 && (
        <UploadMaterial
          fileList={fileList}
          setFileList={setFileList}
          handleSubmit={handleSubmit}
          isLoading={createMutation.isLoading}
        />
      )}
    </div>
  );
};

export default Index;
