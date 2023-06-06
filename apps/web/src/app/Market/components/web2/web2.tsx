import React from 'react';
import styles from './web2.module.less';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import web2Banner from 'src/assets/images/web2-banner.png';
import { IconCheckCircle } from '@arco-design/web-react/icon';
import CreateItem, { ChannelType } from '../createItem/index';
import { Web2Des } from 'src/app/PublishDemand/index';
import { useNavigate } from 'react-router-dom';
import BIGO from 'src/assets/images/dashbord/c-BIGO.png';
import Dable from 'src/assets/images/dashbord/c-Dable.png';
import Meta from 'src/assets/images/dashbord/c-Meta.png';
import Snapchat from 'src/assets/images/dashbord/c-Snapchat.png';
import TikTok from 'src/assets/images/dashbord/c-TikTok.png';
import Yandex from 'src/assets/images/dashbord/c-Yandex.png';
import eagllwin from 'src/assets/images/dashbord/c-eagllwin.png';
import googleAds from 'src/assets/images/dashbord/c-googleAds.png';
import huawei from 'src/assets/images/dashbord/c-huawei.png';
import prokwai from 'src/assets/images/dashbord/c-prokwai.png';
import Taboola from 'src/assets/images/dashbord/c-Taboola.png';
import Mytarget from 'src/assets/images/dashbord/c-Mytarget.png';

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  const navigate = useNavigate();
  return (
    <div className={styles['container']}>
      <div className={styles['top']}>
        <Web2Des></Web2Des>
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
        imgList1={[Meta, BIGO, Dable, TikTok, prokwai, huawei]}
        imgList2={[Snapchat, Yandex, eagllwin, googleAds, Taboola, Mytarget]}
        countNumber={20}
        price={i18n[lang]['cpc.count']}
        channelType={ChannelType.Web2}
        buttonFunction={() => navigate('/create-demand')}
        style={{ height: '160px' }}
      />
      <div className={styles['bottom']}>
        <div className={styles['flag']}>{i18n[lang]['market.launch.example']}</div>
        <div className={styles['video-list']}>
          <div className={styles['video-item']}>
            <video
              src="https://starlands3.s3.ap-southeast-1.amazonaws.com/starland/1685930684927-web2-promote1-video.mp4"
              height="338"
              controls
            ></video>
          </div>
          <div className={styles['video-item']}>
            <video
              src="https://starlands3.s3.ap-southeast-1.amazonaws.com/starland/1685930691885-web2-promote2-video.mp4"
              height="338"
              controls
            ></video>
          </div>
          <div className={styles['video-item']}>
            <video
              src="https://starlands3.s3.ap-southeast-1.amazonaws.com/starland/1685930698660-web2-promote3-video.mp4"
              height="338"
              controls
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
