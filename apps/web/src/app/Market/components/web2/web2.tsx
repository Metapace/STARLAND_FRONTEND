import React from 'react';
import styles from './web2.module.less';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import web2Banner from 'src/assets/images/web2-banner.png';
import { IconCheckCircle } from '@arco-design/web-react/icon';
import CreateItem, { ChannelType } from '../createItem/index';

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles['container']}>
      <div className={styles['top']}>
        <img src={web2Banner} alt="" />
        <div className={styles['top-intro']}>
          <div>
            <div className={styles['top-intro-item']}>
              <IconCheckCircle className={styles['top-icon']}></IconCheckCircle> {i18n[lang]['market.top1']}
            </div>
            <div className={styles['top-intro-item']}>
              <IconCheckCircle className={styles['top-icon']}></IconCheckCircle>
              {i18n[lang]['market.top2']}
            </div>
            <div className={styles['top-intro-item']}>
              <IconCheckCircle className={styles['top-icon']}></IconCheckCircle>
              {i18n[lang]['market.top3']}
            </div>
          </div>
        </div>
      </div>
      <CreateItem
        title={i18n[lang]['market.type']}
        tip={i18n[lang]['market.type.describe']}
        buttonText={i18n[lang]['create.campagin']}
        imgList={[web2Banner, web2Banner, web2Banner]}
        countNumber={21}
        price={i18n[lang]['cpc.count']}
        channelType={ChannelType.Web2}
        buttonFunction={() => console.log(1111)}
      />
      <div className={styles['bottom']}>
        <div className={styles['flag']}>{i18n[lang]['market.launch.example']}</div>
      </div>
    </div>
  );
};

export default Index;
