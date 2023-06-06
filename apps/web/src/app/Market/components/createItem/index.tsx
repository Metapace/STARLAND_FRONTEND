import React, { CSSProperties } from 'react';
import styles from './index.module.less';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ShoppingCart from 'src/assets/images/shopping-cart.png';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import { MarketItem } from 'src/app/Dashboard/WorkPlace/WorkPlace';
export enum ChannelType {
  Web2 = 'web2',
  Web3 = 'web3',
}

interface IndexProps {
  title: string;
  tip: string;
  imgList1: Array<string>;
  imgList2?: Array<string>;
  channelType: ChannelType;
  countNumber: number;
  price: string;
  buttonText?: string;
  style?: CSSProperties;
  buttonFunction: (params?: unknown) => void;
}

const Index: React.FC<IndexProps> = ({
  channelType,
  imgList1,
  imgList2,
  countNumber,
  price,
  buttonFunction,
  buttonText,
  title,
  tip,
  style,
}) => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles['container']} style={style}>
      <div className={styles['top-title']}>
        <div className={styles['blue-bg']}>{title}</div>
        <div className={styles['top-title-text']}>{tip}</div>
      </div>
      <div className={styles['content']}>
        <div className={styles['image-list']}>
          <div className={styles['image-list-inner']}>
            {imgList1.map((src) => (
              <MarketItem src={src} key={src} width="72px"></MarketItem>
            ))}
          </div>
          {imgList2 && (
            <div className={styles['image-list-inner']}>
              {imgList2.map((src) => (
                <MarketItem src={src} key={src} width="72px"></MarketItem>
              ))}
            </div>
          )}
        </div>

        <div className={styles['count-number']}>
          <div className={styles['count-number-top']}>{i18n[lang]['market.count']}</div>
          <div className={styles['count-number-bottom']}>{countNumber}</div>
        </div>
        <div className={styles['price']}>
          <div className={styles['price-top']}>{i18n[lang]['market.price']}</div>
          <div className={styles['price-bottom']}>{price}</div>
        </div>
        <div className={styles['right-button']} onClick={() => buttonFunction()}>
          {buttonText && buttonText}
          {channelType === ChannelType.Web3 && <img src={ShoppingCart} />}
        </div>
      </div>
    </div>
  );
};

export default Index;
