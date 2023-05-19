import React from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import locale from './locales';
import useI18n from 'src/ahooks/useI18n';

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {i18n[lang]['my.shopping.chart']}
        <span>【0】</span>
      </div>
      <div className={styles.content}>
        <div className={styles['content-inner']}>{i18n[lang]['r.empyty']}</div>
        <img src="src/assets/images/empty-cart.png" alt="" />
      </div>
      <div className={styles['final-amount']}>
        {i18n[lang]['total.amount']}：<span>0$</span>
      </div>
      <div className={styles['opreate-area']}>
        <div className={classNames('common-button', styles['cart-button'])}>{i18n[lang]['create.material']}</div>
        <div className={classNames('common-button', styles['cart-button'])}>{i18n[lang]['pay.order']}</div>
      </div>
    </div>
  );
};

export default Index;
