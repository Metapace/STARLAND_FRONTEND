import React from 'react';
import styles from './index.module.less';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ShoppingCart from 'src/assets/images/shopping-cart.png';

export enum ChannelType {
  Web2 = 'web2',
  Web3 = 'web3',
}

interface IndexProps {
  title: string;
  tip: string;
  imgList: Array<string>;
  channelType: ChannelType;
  countNumber: number;
  price: string;
  buttonText?: string;
  buttonFunction: (params?: any) => void;
}

const Index: React.FC<IndexProps> = ({
  channelType,
  imgList,
  countNumber,
  price,
  buttonFunction,
  buttonText,
  title,
  tip,
}) => {
  return (
    <div className={styles['container']}>
      <div className={styles['top-title']}>
        <div className={styles['blue-bg']}>{title}</div>
        <div className={styles['top-title-text']}>{tip}</div>
      </div>
      <div className={styles['content']}>
        <div className={styles['image-list']}>
          {imgList.map((src, index) => (
            <LazyLoadImage src={src} alt={'web2'} effect="blur" key={index} />
          ))}
        </div>
        <div className={styles['count-number']}>
          <div className={styles['count-number-top']}>数量</div>
          <div className={styles['count-number-bottom']}>{countNumber}</div>
        </div>
        <div className={styles['price']}>
          <div className={styles['price-top']}>价格</div>
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
