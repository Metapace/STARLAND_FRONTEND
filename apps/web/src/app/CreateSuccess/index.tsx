import React from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { IconCheck } from '@arco-design/web-react/icon';
import useI18n from 'src/ahooks/useI18n';
import locale from './locales';
import LongProgress from 'src/app/PublishDemand/components/LongProgress';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  const [params] = useSearchParams();
  const id = parseInt(params.getAll('id')[0]);
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{i18n[lang]['posting-requirements']}</div>
      <LongProgress step={2}></LongProgress>
      <div className={styles.content}>
        <div className={styles['top-icon']}>
          <IconCheck className={styles['check-icon']}></IconCheck>
        </div>
        <div className={styles['content-title']}>{i18n[lang]['posting-requirements']}</div>
        <div className={styles['button-wrrap']}>
          <div
            className={classNames('common-button', styles['create-sccuess-button'])}
            onClick={() => navigate(`/edit-demand?id=${id}`)}
          >
            {i18n[lang]['review-detail']}
          </div>

          <div
            className={classNames('common-button', styles['create-sccuess-button'])}
            onClick={() => navigate('/publish-demand')}
          >
            {i18n[lang]['continue-to-create']}
          </div>
          <div
            className={classNames('common-button', styles['create-sccuess-button'])}
            onClick={() => navigate('/channel-market')}
          >
            {i18n[lang]['go-to-channel-market']}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
