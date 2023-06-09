import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import locale from './locales';
import { IconLeft } from '@arco-design/web-react/icon';
import { Form, Message } from '@arco-design/web-react';
import useI18n from 'src/ahooks/useI18n';
import { ReturnRemandItem, DemandType, MaterialItem, AllMaterialItem, useMutationUpdateMaterial } from 'apis';
import dayjs from 'dayjs';
import FormStep from 'src/app/CreateDemand/FormStep';
import { useNavigate, useSearchParams } from 'react-router-dom';
import UploadMaterial from 'src/app/CreateDemand/UploadMaterial';
import { UploadItem } from 'src/types/arco';
import Sbutton from 'src/components/Sbutton';
import { useGetActivityDataByUrlId } from 'src/ahooks/index';

const DesItem = ({ topText, bottomText, isRed = false }: { topText: string; bottomText?: string; isRed?: boolean }) => {
  return (
    <div className={styles['des-item']}>
      <div className={classNames(styles['top-item'], isRed && styles['red'])}>{topText}</div>
      <div className={styles['bottom-item']}>{bottomText}</div>
    </div>
  );
};

const EditProgress: React.FC<ReturnRemandItem> = ({
  status,
  create_time,
  pay_time,
  end_time,
  deliver_time,
  design_time,
}) => {
  const { lang, i18n } = useI18n(locale);
  const BlueDot = () => {
    return <div className={classNames(styles['blue-dot'], status === DemandType.Finished && styles['end-dot'])}></div>;
  };
  const descriptText = useMemo(() => {
    if (status === DemandType.NeedPay || status === DemandType.NeedDeposite) {
      return [
        { title: 'create.success', time: dayjs.unix(create_time).format('YYYY-MM-DD hh:mm:ss') },
        { title: 'waite.auth', timeText: 'in.progress' },
      ];
    }
    if (status === DemandType.NeedVerify) {
      return [
        { title: 'Authorization.successful', time: dayjs.unix(pay_time).format('YYYY-MM-DD hh:mm:ss') },
        { title: 'wait.review', timeText: 'in.progress' },
      ];
    }
    if (status === DemandType.Channel) {
      const reviewTime = Math.max(design_time, deliver_time);
      return [
        { title: 'Review.successful', time: dayjs.unix(reviewTime).format('YYYY-MM-DD hh:mm:ss') },
        { title: 'Channel.Distribution', timeText: 'in.progress' },
      ];
    }
    if (status === DemandType.Finished) {
      return [{ title: 'r.ended', time: dayjs.unix(end_time).format('YYYY-MM-DD hh:mm:ss') }];
    }
    return [];
  }, [status, create_time, pay_time, end_time]);
  return (
    <div className={styles['edit-container']}>
      <div className={styles['edit-container-inner']}>
        {(status === DemandType.NeedPay ||
          status === DemandType.NeedVerify ||
          status === DemandType.NeedDeposite ||
          status === DemandType.Channel) && (
          <div className={styles['line-progress']}>
            <BlueDot />
            <div className={styles['blue-line']}></div>
            <BlueDot />
          </div>
        )}
        {status === DemandType.Finished && <BlueDot />}
        <div className={styles['descript']}>
          {descriptText.map((item) => (
            <DesItem
              key={item.title}
              topText={i18n[lang][item.title]}
              bottomText={item.timeText ? i18n[lang][item.timeText] : item.time}
              isRed={status === DemandType.Finished}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { data, id } = useGetActivityDataByUrlId();
  const [params] = useSearchParams();
  const isFromReVerify = parseInt(params.getAll('reVerify')[0]) === 1;
  const [fileList, setFileList] = useState<Array<UploadItem>>([]);
  const { mutateAsync: updataMaterial, isLoading } = useMutationUpdateMaterial();
  const handleBack = () => {
    navigate(-1);
  };
  const handleEdit = async () => {
    const formValues = form.getFieldsValue() as Omit<MaterialItem, 'materials_url' | 'country' | 'age'> & {
      country: Array<string>;
      age: Array<number>;
    };
    const realFormValue = form.getFieldsValue() as Omit<MaterialItem, 'materials_url' | 'age'> & { age: string };
    if (formValues.country.length > 0) {
      realFormValue.country = formValues.country.join(',');
    }
    if (formValues.age.length > 0) {
      realFormValue.age = formValues.age.join(',');
    }
    const materials_url = fileList.map((item) => item.response.Location).join(',');
    const params: AllMaterialItem = { id, ...realFormValue, materials_url };
    if (isFromReVerify) {
      params.status = 9;
    }
    await updataMaterial(params);
    Message.success('Success !');
  };

  useEffect(() => {
    if (data?.materials_url) {
      const urlList = data.materials_url.split(',');
      const files: Array<UploadItem> = urlList.map((v: string, index: number) => {
        const ll = decodeURI(v).split('/');
        return { status: 'done', name: ll[ll.length - 1], response: { Location: v }, uid: index.toString(), url: v };
      });
      setFileList(files);
    }
  }, [data]);
  const isDisableEdit = data?.status !== DemandType.NeedPay && data?.status !== DemandType.NeedDeposite;
  return (
    <div className={styles.container}>
      <div className={styles['left-icon']} onClick={handleBack}>
        <IconLeft className={styles['left-icon-inner']} />
      </div>
      <div className={styles.title}>{i18n[lang]['current.progress']}</div>
      {data && <EditProgress {...data} />}
      <div className={styles.content}>
        <div className={styles['left-content']}>
          <div className={styles['sub-title']}>{i18n[lang]['basic.info']}</div>
          <FormStep form={form} isDisable={isDisableEdit} initialValues={data}></FormStep>
        </div>
        <div className={styles['right-content']}>
          <div className={styles['sub-title']}>{i18n[lang]['material.info']}</div>
          <UploadMaterial
            fileList={fileList}
            setFileList={setFileList}
            isEdit
            isDisable={isDisableEdit}
          ></UploadMaterial>
        </div>
      </div>
      <div className={styles['button-wrrap']}>
        <Sbutton text={i18n[lang]['r.back']} onClick={handleBack} />
        {(data?.status == DemandType.NeedPay || data?.status == DemandType.NeedDeposite) && (
          <Sbutton text={i18n[lang]['save.changes']} onClick={handleEdit} loading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default Index;
