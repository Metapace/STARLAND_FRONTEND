import React from 'react';
import styles from './index.module.less';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import web2Banner from 'src/assets/images/web2-banner.png';
import CreateItem, { ChannelType } from '../createItem/index';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  const navigate = useNavigate();
  const handleToShoppingCart = () => {
    navigate('/shopping-cart');
  };
  return (
    <div className={styles['container']}>
      <div className={styles['top']}>
        <div className={styles['top-left']}>
          <div className={classNames(styles['step-text'])}>Step1</div>
          <LazyLoadImage src={'src/assets/images/web3-step1.png'} effect="blur" alt=""></LazyLoadImage>
          <div className={classNames('active-button', 'common-button', styles['web3-button'])}>创建物料</div>
        </div>
        <div className={styles['top-middle']}></div>
        <div className={styles['top-right']}>
          <div className={classNames(styles['step-text'])}>Step2</div>
          <LazyLoadImage src={'src/assets/images/web3-step2.png'} effect="blur" alt=""></LazyLoadImage>
          <div className={styles['shop-cart-content']}>
            <div className={styles['cart-top']}>
              总额： <span>$23,217.00</span>
            </div>
            <div className={styles['cart-middle']}>已选中12件商品</div>
            <div className={classNames('common-button', styles['to-pay-button'])} onClick={handleToShoppingCart}>
              去结算
            </div>
          </div>
        </div>
      </div>
      <CreateItem
        title="新闻稿"
        tip="新闻稿/区块链与加密货币"
        imgList={[web2Banner, web2Banner]}
        countNumber={21}
        price="$5,400.00"
        channelType={ChannelType.Web3}
        buttonFunction={() => console.log(1111)}
      />
      <CreateItem
        title="横幅广告"
        tip="新闻稿/区块链与加密货币"
        imgList={[web2Banner, web2Banner, web2Banner, web2Banner]}
        countNumber={21}
        price="$5,400.00"
        channelType={ChannelType.Web3}
        buttonFunction={() => console.log(1111)}
      />
      <CreateItem
        title="社交媒体"
        tip="新闻稿/区块链与加密货币"
        imgList={[web2Banner, web2Banner, web2Banner]}
        countNumber={21}
        price="$5,400.00"
        channelType={ChannelType.Web3}
        buttonFunction={() => console.log(1111)}
      />
      <div className={styles['bottom']}>
        <div className={styles['flag']}>投放示例</div>
      </div>
    </div>
  );
};

export default Index;
