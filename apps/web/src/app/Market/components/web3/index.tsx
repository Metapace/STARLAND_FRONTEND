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
          <div className={classNames('active-button', 'common-button', styles['web3-button'])}>
            {i18n[lang]['create.material']}
          </div>
        </div>
        <div className={styles['top-middle']}></div>
        <div className={styles['top-right']}>
          <div className={classNames(styles['step-text'])}>Step2</div>
          <LazyLoadImage src={'src/assets/images/web3-step2.png'} effect="blur" alt=""></LazyLoadImage>
          <div className={styles['shop-cart-content']}>
            <div className={styles['cart-top']}>
              {i18n[lang]['all.pay']}： <span>$23,217.00</span>
            </div>
            <div className={styles['cart-middle']}>
              {i18n[lang]['have.selected1']}12 {i18n[lang]['have.selected2']}
            </div>
            <div className={classNames('common-button', styles['to-pay-button'])} onClick={handleToShoppingCart}>
              {i18n[lang]['go.pay']}
            </div>
          </div>
        </div>
      </div>
      <CreateItem
        title={i18n[lang]['news.paper']}
        tip={i18n[lang]['market-web3-describe']}
        imgList={[web2Banner, web2Banner]}
        countNumber={21}
        price="$5,400.00"
        channelType={ChannelType.Web3}
        buttonFunction={() => console.log(1111)}
      />
      <CreateItem
        title={i18n[lang]['ads.line']}
        tip={i18n[lang]['market-web3-describe']}
        imgList={[web2Banner, web2Banner, web2Banner, web2Banner]}
        countNumber={21}
        price="$5,400.00"
        channelType={ChannelType.Web3}
        buttonFunction={() => console.log(1111)}
      />
      <CreateItem
        title={i18n[lang]['social.media']}
        tip={i18n[lang]['market-web3-describe']}
        imgList={[web2Banner, web2Banner, web2Banner]}
        countNumber={21}
        price="$5,400.00"
        channelType={ChannelType.Web3}
        buttonFunction={() => console.log(1111)}
      />
      <div className={styles['bottom']}>
        <div className={styles['flag']}>{i18n[lang]['market.launch.example']}</div>
      </div>
    </div>
  );
};

export default Index;
