import React from 'react';
import styles from './index.module.less';
import classNames from 'classnames';

const Index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        我的购物车<span>【0】</span>
      </div>
      <div className={styles.content}>
        <img src="src/assets/images/empty-cart.png" alt="" />
      </div>
      <div className={styles['final-amount']}>
        总金额：<span>0$</span>
      </div>
      <div className={styles['opreate-area']}>
        <div className={classNames('common-button', styles['cart-button'])}>创建物料</div>
        <div className={classNames('common-button', styles['cart-button'])}>支付订单</div>
      </div>
    </div>
  );
};

export default Index;
