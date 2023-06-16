import React, { useRef } from 'react';
import styles from './index.module.less';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import exampleImage from 'src/assets/images/example-bg.png';
import classNames from 'classnames';
import Video from 'src/components/Video';
import long1 from 'src/assets/images/videoPoster/2023long1.jpg';
import long2 from 'src/assets/images/videoPoster/2023long2.jpg';
import width1 from 'src/assets/images/videoPoster/2023width1.jpg';
import width2 from 'src/assets/images/videoPoster/2023width2.jpg';

export interface ExampleItemProps {
  title: string;
  log: string;
  src: string;
  videoHeight?: number;
  videoWidth?: number;
  exampleType: ExampleType;
}

export enum ExampleType {
  FacebookType = 1,
  TiktokType = 2,
  BigoType = 3,
  KwaiType = 4,
}

const Index: React.FC<ExampleItemProps> = ({ title, log, src, exampleType }) => {
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
        <img src={exampleImage} className={styles['content-img']}></img>
        <div className={styles['content-inner']}>
          {exampleType === ExampleType.FacebookType && (
            <div className={classNames(styles['facebook-video'])}>
              <Video src={src} width={198} height={112} poster={width1}></Video>
            </div>
          )}
          {exampleType === ExampleType.TiktokType && (
            <div className={classNames(styles['tikTok-video-container'])}>
              <Video src={src} width={195} height={332} poster={long1}></Video>
              <div className={classNames(styles['tikTok-video'])}></div>
            </div>
          )}
          {exampleType === ExampleType.BigoType && (
            <div className={classNames(styles['bigo-video'])}>
              <Video src={src} width={196} height={112} poster={width2}></Video>
            </div>
          )}
          {exampleType === ExampleType.KwaiType && (
            <div className={classNames(styles['kwai-video-container'])}>
              <div className={classNames(styles['kwai-video-top'])}></div>
              <Video src={src} width={198} height={336} poster={long2}></Video>
              <div className={classNames(styles['kwai-video-bottom'])}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
