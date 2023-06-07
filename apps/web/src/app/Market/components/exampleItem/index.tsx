import React from 'react';
import styles from './index.module.less';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import exampleImage from 'src/assets/images/example-bg.png';
export interface ExampleItemProps {
  title: string;
  log: string;
  src: string;
  videoHeight?: number;
  videoWidth?: number;
}

const Index: React.FC<ExampleItemProps> = ({ title, log, src, videoWidth }) => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        <div className={styles['title-left']}>
          <LazyLoadImage src={log} alt={'web2'} effect="blur" />
        </div>
        <div className={styles['title-right']}>
          <div className={styles['title-name']}>{title}</div>
          <div className={styles['title-dynamic']}>{i18n[lang]['market.dynamic']}</div>
        </div>
      </div>
      <div className={styles['content']}>
        <img src={exampleImage}></img>
        <div className={styles['content-inner']}>
          <video src={src} width={videoWidth} controls></video>
        </div>
      </div>
    </div>
  );
};

export default Index;
