import React from 'react';
import styles from './index.module.less';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import CreateItem, { ChannelType } from '../createItem/index';
import 'react-lazy-load-image-component/src/effects/blur.css';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import web31 from 'src/assets/images/dashbord/web3-1.png';
import web32 from 'src/assets/images/dashbord/web3-2.png';
import web33 from 'src/assets/images/dashbord/web3-3.png';
import web39 from 'src/assets/images/dashbord/web3-9.png';
import web310 from 'src/assets/images/dashbord/web3-10.png';

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
          <div className={classNames(styles['step-text'], styles['step-text-1'])}>Step1</div>
          <div className={classNames('active-button', 'common-button', styles['web3-button'])}>
            {i18n[lang]['create.material']}
          </div>
        </div>
        <div className={styles['top-middle']}></div>
        <div className={styles['top-right']}>
          <div className={classNames(styles['step-text'], styles['step-text-2'])}>Step2</div>
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
        imgList1={[web31, web32, web33, web39, web310]}
        countNumber={20}
        price="$5,400.00"
        channelType={ChannelType.Web3}
        buttonFunction={() => console.log(1111)}
      />
      <CreateItem
        title={i18n[lang]['ads.line']}
        tip={i18n[lang]['market-web3-describe']}
        imgList1={[web31, web32, web33, web39, web310]}
        countNumber={20}
        price="$5,400.00"
        channelType={ChannelType.Web3}
        buttonFunction={() => console.log(1111)}
      />
      <CreateItem
        title={i18n[lang]['social.media']}
        tip={i18n[lang]['market-web3-describe']}
        imgList1={[web31, web32, web33, web39, web310]}
        countNumber={20}
        price="$5,400.00"
        channelType={ChannelType.Web3}
        buttonFunction={() => console.log(1111)}
      />
    </div>
  );
};

export default Index;
