import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.less';
import locale from './locales';
import { useNavigate } from 'react-router-dom';
import { Menu, Dropdown } from '@arco-design/web-react';
import useI18n from 'src/ahooks/useI18n';
import Matter from './components/Matter/index';
import Logo from 'src/assets/images/homepage/head-log.png';
import classNames from 'classnames';
import ScrollBar from './components/scrollBar';
import web2AppFlys from 'src/assets/images/home/web2-appFlys.png';
import web2AppLovin from 'src/assets/images/home/web2-appLovin.png';
import web2Djust from 'src/assets/images/home/web2-Djust.png';
import web2Meta from 'src/assets/images/home/web2-meta.png';
import web2PetalADs from 'src/assets/images/home/web2-Petal ADs.png';
import web2Tiktok from 'src/assets/images/home/web2-tiktok.png';
import web2Topon from 'src/assets/images/home/web2-topon.png';
import web2Unity from 'src/assets/images/home/web2-unity.png';
import web2Trackingio from 'src/assets/images/home/web2-Trackingio.png';
import web2Vungle from 'src/assets/images/home/web2-Vungle.png';
import web2GoogleAds from 'src/assets/images/home/web2-Google Ads.png';
import web2Mintegral from 'src/assets/images/home/web2-Mintegral.png';
import web3BlockS from 'src/assets/images/home/web3-blockS.png';
import web3Bsc from 'src/assets/images/home/web3-Bsc.png';
import web3CoinCdex from 'src/assets/images/home/web3-coinCdex.png';
import web3CoinGeko from 'src/assets/images/home/web3-coinGeko.png';
import web3Coingape from 'src/assets/images/home/web3-coingape.png';
import web3Whattomine from 'src/assets/images/home/web3-whattomine.png';
import web3StormGain from 'src/assets/images/home/web3-stormGain.png';
enum TabType {
  Home = 'home',
  Advantage = 'advantageRef',
  Market = 'market',
  Example = 'example',
}
const themeStyle = {
  background: 'var(--theme-color)',
  color: '#fff',
};
const Index = () => {
  const { lang, i18n, changeLanguage } = useI18n(locale);
  const [selectItem, setSelectItem] = useState<TabType>(TabType.Home);
  const handleChangeSelectItem = (item: TabType) => {
    setSelectItem(item);
  };
  const languageList = (
    <Menu onClickMenuItem={changeLanguage} defaultSelectedKeys={[lang]}>
      <Menu.Item style={lang === 'zh-CN' ? themeStyle : {}} key="zh-CN">
        中文
      </Menu.Item>
      <Menu.Item style={lang === 'en-US' ? themeStyle : {}} key="en-US">
        English
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={styles['container']}>
      <div className={styles['head']}>
        <div className={styles['head-left']}>
          <img src={Logo} alt="" className={styles['head-log']} />
          <div
            className={classNames(styles['head-item'], selectItem === TabType.Home && styles['select-head-item'])}
            onClick={() => handleChangeSelectItem(TabType.Home)}
          >
            {i18n[lang]['intro.home']}
          </div>
          <div
            className={classNames(styles['head-item'], selectItem === TabType.Advantage && styles['select-head-item'])}
            onClick={() => handleChangeSelectItem(TabType.Advantage)}
          >
            {i18n[lang]['intro.advantage']}
          </div>
          <div
            className={classNames(styles['head-item'], selectItem === TabType.Market && styles['select-head-item'])}
            onClick={() => handleChangeSelectItem(TabType.Market)}
          >
            {i18n[lang]['intro.market']}
          </div>
          <div
            className={classNames(styles['head-item'], selectItem === TabType.Example && styles['select-head-item'])}
            onClick={() => handleChangeSelectItem(TabType.Example)}
          >
            {i18n[lang]['intro.example']}
          </div>
        </div>
        <div className={styles['head-right']}>
          <Dropdown trigger="click" droplist={languageList} position="bl">
            <div className={styles['lang-button']}>{lang === 'zh-CN' ? 'CN' : 'EN'}</div>
          </Dropdown>
          <div className={styles['login-button']}>{i18n[lang]['intro.login']}</div>
        </div>
      </div>
      <div className={styles['home-area']}>
        <div className={styles['home-title-1']}>
          {i18n[lang]['intro.home.title1']} <span>{i18n[lang]['intro.home.title2']}</span>
        </div>
        <div className={styles['home-title-2']}>{i18n[lang]['intro.home.title3']}</div>
        <div className={styles['home-describle']}>{i18n[lang]['intro.home.describle']}</div>
        <div className={styles['home-describle']}>{i18n[lang]['intro.home.describle1']}</div>
        <div className={styles['start-now-button']}>{i18n[lang]['intro.home.start.now']}</div>
      </div>
      <div className={styles['web2-scroll']}>
        <div className={styles['web2-scroll-title']}>{i18n[lang]['web2.scroll.title']}</div>
        <ScrollBar
          contentList={[
            { src: web2AppFlys, width: '168px', height: '72px' },
            { src: web2AppLovin, width: '280px', height: '72px' },
            { src: web2Djust, width: '176px', height: '72px' },
            { src: web2Meta, width: '180px', height: '72px' },
            { src: web2PetalADs, width: '184px', height: '72px' },
            { src: web2Tiktok, width: '168px', height: '72px' },
            { src: web2Topon, width: '180px', height: '72px' },
            { src: web2Unity, width: '136px', height: '72px' },
            { src: web2Trackingio, width: '256px', height: '72px' },
            { src: web2Vungle, width: '128px', height: '72px' },
            { src: web2GoogleAds, width: '280px', height: '72px' },
            { src: web2Mintegral, width: '200px', height: '72px' },
          ]}
        />
      </div>
      <Matter />
    </div>
  );
};

export default Index;
