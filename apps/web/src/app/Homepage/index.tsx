import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './index.module.less';
import locale from './locales';
import { useNavigate } from 'react-router-dom';
import { useMount, useScroll } from 'ahooks';
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
import core1 from 'src/assets/images/homepage/core-01.png';
import core2 from 'src/assets/images/homepage/core-02.png';
import core3 from 'src/assets/images/homepage/core-03.png';
import core4 from 'src/assets/images/homepage/core-04.png';
import core5 from 'src/assets/images/homepage/core-05.png';
import CustomerCase, { CaseType } from 'src/app/Homepage/components/CustomerCase';
import { Swiper, SwiperSlide } from 'swiper/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { EffectCreative } from 'swiper';
import 'swiper/css/pagination';
import 'swiper/css/effect-flip';
import 'swiper/css';
gsap.registerPlugin(ScrollTrigger);
enum TabType {
  Home = 'home',
  Advantage = 'advantageRef',
  Market = 'market',
  Example = 'example',
}
enum CoreType {
  First = 0,
  Seconde = 1,
  Third = 2,
  Fourth = 3,
  Fifth = 4,
}
const themeStyle = {
  background: 'var(--theme-color)',
  color: '#fff',
};
const ch = document.body.clientHeight;
const cw = document.body.clientWidth;
const Index = () => {
  const { lang, i18n, changeLanguage } = useI18n(locale);
  const [selectItem, setSelectItem] = useState<TabType>(TabType.Home);
  const [activeCore, setActiveItem] = useState<CoreType>(CoreType.First);
  const containerRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const coreFunctionRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const customercaseRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);
  const position = useScroll();
  const navigate = useNavigate();
  const q = gsap.utils.selector(containerRef);
  const handleChangeSelectItem = (item: TabType) => {
    setSelectItem(item);
  };
  const toLogin = () => {
    navigate('/login');
  };
  if (position) {
    console.log(position.top);
  }
  const isStick = useMemo(() => {
    if (position) {
      if (position.top > 280 + ch && position.top < 1200 + ch) {
        return true;
      }
      return false;
    }
    return false;
  }, [position]);
  const isImageStick = useMemo(() => {
    if (position) {
      if (position.top > ch - 80 && position.top < 2108 + ch) {
        return true;
      }
      return false;
    }
    return false;
  }, [position]);
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
  const handleChangeSwiper = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };
  const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ block: 'start' });
    }, 10);
  };

  useMount(() => {
    gsap.fromTo(
      q('#customer-case'),
      { transform: 'translateX(2240px)' },
      {
        transform: 'translateX(-2180px)',
        scrollTrigger: {
          trigger: q('#customer-case-outer'),
          start: 'bottom bottom',
          end: 'bottom -2000',
          scrub: true,
          pin: q('#customer-case-outer'),
        },
      },
    );
  });
  useEffect(() => {
    if (position) {
      const top = position.top;
      let aa;
      if (top > ch + 1230) {
        aa = CoreType.Fifth;
      } else if (top > ch + 1080) {
        aa = CoreType.Fourth;
      } else if (top > 1700) {
        aa = CoreType.Third;
      } else if (top > 1440) {
        aa = CoreType.Seconde;
      } else {
        aa = CoreType.First;
      }
      setActiveItem(aa);
      handleChangeSwiper(aa);
    }
  }, [position]);
  return (
    <div className={styles['container']} ref={containerRef}>
      <div
        className={styles['heade-outer']}
        style={{ backgroundColor: `rgba(255, 255, 255, ${position ? position.top / 120 : 0})` }}
      >
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
              className={classNames(
                styles['head-item'],
                selectItem === TabType.Advantage && styles['select-head-item'],
              )}
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
            <div className={styles['login-button']} onClick={toLogin}>
              {i18n[lang]['intro.login']}
            </div>
          </div>
        </div>
      </div>
      <div className={styles['home-area']} ref={homeRef}>
        <div className={styles['home-title-1']}>
          {i18n[lang]['intro.home.title1']} <span>{i18n[lang]['intro.home.title2']}</span>
        </div>
        <div className={styles['home-title-2']}>{i18n[lang]['intro.home.title3']}</div>
        <div className={styles['home-describle']}>{i18n[lang]['intro.home.describle']}</div>
        <div className={styles['home-describle']}>{i18n[lang]['intro.home.describle1']}</div>
        <div className={styles['start-now-button']} onClick={toLogin}>
          {i18n[lang]['intro.home.start.now']}
        </div>
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
      <div className={styles['core-function-area']} ref={coreFunctionRef}>
        <div className={classNames(styles['core-left'])}>
          <div className={classNames(styles['core-function-title'], isStick && styles['core-title-stick'])}>
            <div className={classNames()}>{i18n[lang]['intro.core.title']}</div>
          </div>
          <div className={classNames(styles['core-image'], isImageStick && styles['core-image-stick'])}>
            <Swiper
              effect={'creative'}
              modules={[EffectCreative]}
              creativeEffect={{
                prev: {
                  shadow: false,
                  translate: [0, 0, -400],
                  opacity: 1,
                },
                next: {
                  translate: ['100%', 0, 0],
                },
              }}
              className="mySwiper"
              ref={swiperRef}
            >
              <SwiperSlide>
                <img src={core1} className={styles['swiper-image']} loading="lazy" />
                <div className="swiper-lazy-preloader"></div>
              </SwiperSlide>
              <SwiperSlide>
                <img src={core2} className={styles['swiper-image']} loading="lazy" />
                <div className="swiper-lazy-preloader"></div>
              </SwiperSlide>
              <SwiperSlide>
                <img src={core3} className={styles['swiper-image']} loading="lazy" />
                <div className="swiper-lazy-preloader"></div>
              </SwiperSlide>
              <SwiperSlide>
                <img src={core4} className={styles['swiper-image']} loading="lazy" />
                <div className="swiper-lazy-preloader"></div>
              </SwiperSlide>
              <SwiperSlide>
                <img src={core5} className={styles['swiper-image']} loading="lazy" />
                <div className="swiper-lazy-preloader"></div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className={classNames(styles['core-right'])}>
          <div className={styles['core-item']}>
            <div
              className={classNames(styles['core-title'], activeCore === CoreType.First && styles['core-title-active'])}
            >
              {i18n[lang]['intro.core1.title']}
            </div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core1.p1']}</div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core1.p2']}</div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core1.p3']}</div>
          </div>
          <div className={styles['core-item']}>
            <div
              className={classNames(
                styles['core-title'],
                activeCore === CoreType.Seconde && styles['core-title-active'],
              )}
            >
              {i18n[lang]['intro.core2.title']}
            </div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core2.p1']}</div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core2.p2']}</div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core2.p3']}</div>
          </div>
          <div className={styles['core-item']}>
            <div
              className={classNames(styles['core-title'], activeCore === CoreType.Third && styles['core-title-active'])}
            >
              {i18n[lang]['intro.core3.title']}
            </div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core3.p1']}</div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core3.p2']}</div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core3.p3']}</div>
          </div>
          <div className={styles['core-item']}>
            <div
              className={classNames(
                styles['core-title'],
                activeCore === CoreType.Fourth && styles['core-title-active'],
              )}
            >
              {i18n[lang]['intro.core4.title']}
            </div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core4.p1']}</div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core4.p2']}</div>
          </div>
          <div className={styles['core-item']} style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: 0 }}>
            <div
              className={classNames(styles['core-title'], activeCore === CoreType.Fifth && styles['core-title-active'])}
            >
              {i18n[lang]['intro.core5.title']}
            </div>
            <div className={styles['core-sub-title']}>{i18n[lang]['intro.core5.sub.title1']}</div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core5.p1']}</div>
            <div className={styles['core-sub-title']}>{i18n[lang]['intro.core5.sub.title2']}</div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core5.p2']}</div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core5.p3']}</div>
            <div className={styles['core-sub-title']}>{i18n[lang]['intro.core5.sub.title3']}</div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core5.p4']}</div>
            <div className={styles['core-paragraph']}>{i18n[lang]['intro.core5.p5']}</div>
          </div>
        </div>
      </div>
      <div ref={marketRef}>
        <Matter />
      </div>
      <div className={styles['customer-case']} id="customer-case-outer" ref={customercaseRef}>
        <div className={styles['customer-case-title']}>{i18n[lang]['intro.case.title']}</div>
        <div className={styles['customer-case-list']} id="customer-case">
          <CustomerCase caseType={CaseType.Metacene}></CustomerCase>
          <CustomerCase caseType={CaseType.Dehero}></CustomerCase>
          <CustomerCase caseType={CaseType.Unipass}></CustomerCase>
          <CustomerCase caseType={CaseType.Gate3}></CustomerCase>
        </div>
      </div>
    </div>
  );
};

export default Index;
