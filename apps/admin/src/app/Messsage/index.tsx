import React from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import locale from './locales';
import useI18n from 'src/ahooks/useI18n';

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles.container}>
      <div className={styles.title}>{i18n[lang]['my.shopping.chart']}</div>
    </div>
  );
};

export default Index;
