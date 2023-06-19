import React, { useEffect, useRef, useState, useMemo } from 'react';
import styles from './index.module.less';
import locale from './locales';
import { useNavigate } from 'react-router-dom';
import { useMount } from 'ahooks';
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
import { useScroll } from 'ahooks';
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
const Index = () => {
  const { lang, i18n, changeLanguage } = useI18n(locale);
  const [selectItem, setSelectItem] = useState<TabType>(TabType.Home);
  const [activeCore, setActiveItem] = useState<CoreType>(CoreType.First);
  const containerRef = useRef<HTMLDivElement>(null);
  const q = gsap.utils.selector(containerRef);
  const handleChangeSelectItem = (item: TabType) => {
    setSelectItem(item);
  };
  const swiperRef = useRef(null);
  const position = useScroll();
  if (position) {
    console.log(position.top);
  }
  const isStick = useMemo(() => {
    if (position) {
      if (position.top > 1250 && position.top < 2708) {
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
  useMount(() => {
    gsap.fromTo(
      q('#customer-case'),
      { x: -1600 },
      {
        x: 16,
        scrollTrigger: {
          trigger: q('#customer-case'),
          start: 'bottom',
          end: 'bottom -1000',
          scrub: true,
          pin: q('#customer-case'),
        },
      },
    );
  });
  useEffect(() => {
    if (position) {
      const top = position.top;
      let aa;
      if (top > 2230) {
        aa = CoreType.Fifth;
      } else if (top > 2080) {
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
            <div className={styles['login-button']}>{i18n[lang]['intro.login']}</div>
          </div>
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
      <div className={styles['core-function-area']}>
        <div className={styles['core-left']}>
          <div className={classNames(styles['core-function-title'], isStick && styles['core-title-stick'])}>
            {i18n[lang]['intro.core.title']}
            <div className={classNames(styles['core-image'])}>
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
                  <img src={core1} className={styles['swiper-image']} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={core2} className={styles['swiper-image']} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={core3} className={styles['swiper-image']} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={core4} className={styles['swiper-image']} />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={core5} className={styles['swiper-image']} />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
        <div className={styles['core-right']}>
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
      <Matter />
      <div className={styles['customer-case']} id="customer-case">
        <div className={styles['customer-case-title']}>{i18n[lang]['intro.case.title']}</div>
        {/* <Swiper
          spaceBetween={50}
          slidesPerView={1}
          mousewheel={{ releaseOnEdges: true }}
          pagination={{
            type: 'progressbar',
          }}
          effect={'cube'}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          modules={[Pagination, Mousewheel, EffectCube]}
          direction={'horizontal'}
        >
          <SwiperSlide>
            <CustomerCase caseType={CaseType.Metacene}></CustomerCase>
          </SwiperSlide>
          <SwiperSlide>
            <CustomerCase caseType={CaseType.Dehero}></CustomerCase>
          </SwiperSlide>
          <SwiperSlide>
            <CustomerCase caseType={CaseType.Unipass}></CustomerCase>
          </SwiperSlide>
          <SwiperSlide>
            <CustomerCase caseType={CaseType.Gate3}></CustomerCase>
          </SwiperSlide>
        </Swiper> */}
      </div>
    </div>
  );
};

export default Index;
