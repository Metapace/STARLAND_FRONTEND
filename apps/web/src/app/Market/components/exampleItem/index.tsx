import React, { useRef } from 'react';
import styles from './index.module.less';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import exampleImage from 'src/assets/images/example-bg.png';
import classNames from 'classnames';

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

const PlayVideo = ({
  src,
  width,
  height,
  classname,
}: {
  src: string;
  width?: number;
  height?: number;
  classname?: string;
}) => {
  const video = useRef(null);
  return (
    <video
      onClick={() => {
        if (video?.current) {
          video?.current.play();
        }
      }}
      ref={video}
      src={src}
      width={width}
      height={height}
      className={classname}
      controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
      disablePictureInPicture
    ></video>
  );
};

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
        <img src={exampleImage}></img>
        <div className={styles['content-inner']}>
          {exampleType === ExampleType.FacebookType && (
            <div className={classNames(styles['facebook-video'])}>
              <PlayVideo src={src} width={196}></PlayVideo>
            </div>
          )}
          {exampleType === ExampleType.TiktokType && (
            <>
              <PlayVideo src={src} width={196} height={340} classname={styles['tiktok-video-player']}></PlayVideo>
              <div className={classNames(styles['tikTok-video'])}></div>
            </>
          )}
          {exampleType === ExampleType.BigoType && (
            <div className={classNames(styles['bigo-video'])}>
              <PlayVideo src={src} width={196}></PlayVideo>
            </div>
          )}
          {exampleType === ExampleType.KwaiType && (
            <>
              <div className={classNames(styles['kwai-video-top'])}></div>
              <PlayVideo src={src} width={196} height={340} classname={styles['kwai-video-player']}></PlayVideo>
              <div className={classNames(styles['kwai-video-bottom'])}></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
