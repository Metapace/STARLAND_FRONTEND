import React from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { IconClose } from '@arco-design/web-react/icon';
import useI18n from 'src/ahooks/useI18n';
import locale from './locales';

const reasonList = ['asdadsasdasd', 'asdqweqweqwesdsdsf'];

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles['top-icon']}>
          <IconClose className={styles['close-icon']} />
        </div>
        <div className={styles['title']}>{i18n[lang]['verify-fail']}</div>
        <div className={styles['sub-title']}>{i18n[lang]['submit-success']}</div>
        <div className={styles['button-wrrap']}>
          <div className={classNames('common-button', styles['review-button'])}>{i18n[lang]['re-publish']}</div>
          <div className={classNames('common-button', styles['review-button'])}>{i18n[lang]['re-modify']}</div>
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
