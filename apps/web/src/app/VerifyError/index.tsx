import React, { useMemo } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { IconClose } from '@arco-design/web-react/icon';
import useI18n from 'src/ahooks/useI18n';
import { useNavigate } from 'react-router-dom';
import { useGetActivityDataByUrlId } from 'src/ahooks/index';
import { useMutationUpdateMaterial } from 'src/api/activityHooks';
import Sbutton from 'src/components/Sbutton';
import locale from './locales';

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  const navigate = useNavigate();
  const { data, id } = useGetActivityDataByUrlId();
  const { mutateAsync, isLoading } = useMutationUpdateMaterial();
  const reasonList: Array<string> = useMemo(() => {
    return [data?.deliver_reason as string, data?.design_reason as string].filter((v) => v);
  }, [data]);
  const handleRePublish = async () => {
    await mutateAsync({ id, status: 8 });
    navigate('/publish-demand');
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles['top-icon']}>
          <IconClose className={styles['close-icon']} />
        </div>
        <div className={styles['title']}>{i18n[lang]['verify-fail']}</div>
        <div className={styles['sub-title']}>{i18n[lang]['submit-success']}</div>
        <div className={styles['button-wrrap']}>
          <Sbutton
            className={classNames('common-button', styles['review-button'])}
            onClick={handleRePublish}
            loading={isLoading}
            text={i18n[lang]['re-publish']}
          ></Sbutton>
          <div
            className={classNames('common-button', styles['review-button'])}
            onClick={() => navigate(`/edit-demand?id=${id}&reVerify=${1}`)}
          >
            {i18n[lang]['re-modify']}
          </div>
        </div>
        <div className={styles['error-reason']}>
          <div className={styles['error-reason-title']}>{i18n[lang]['error-reason']}</div>
          {reasonList.map((item: string) => (
            <div className={styles['reason-item']} key={item}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
