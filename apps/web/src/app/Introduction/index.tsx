import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './index.module.less';
import Logo from 'src/assets/images/starland-log.png';
import useI18n from 'src/ahooks/useI18n';
import { useMount } from 'ahooks';
import locale from './locales';
import ScrollBar from './components/scrollBar';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import panImage from 'src/assets/images/home/home-pan.png';
import aiImage from 'src/assets/images/home/home-ai.png';
import adsImage from 'src/assets/images/home/home-ads.png';
import plateImage from 'src/assets/images/home/home-plate.png';
import echartImage from 'src/assets/images/home/home-echart.png';
import assitImage from 'src/assets/images/home/home-coOperate.png';
import sdkImage from 'src/assets/images/home/home-sdk.png';
import deheroImage from 'src/assets/images/home/dehero.png';
import metaceneImage from 'src/assets/images/home/metacene.png';
import unipassImage from 'src/assets/images/home/unipass.png';
import web2AppFlys from 'src/assets/images/home/web2-appFlys.png';
import web2AppLovin from 'src/assets/images/home/web2-appLovin.png';
import web2Djust from 'src/assets/images/home/web2-Djust.png';
import web2Meta from 'src/assets/images/home/web2-meta.png';
import web2PetalADs from 'src/assets/images/home/web2-Petal ADs.png';
import web2Tiktok from 'src/assets/images/home/web2-tiktok.png';
import web2Topon from 'src/assets/images/home/web2-topon.png';
import web2Unity from 'src/assets/images/home/web2-unity.png';
import web3BlockS from 'src/assets/images/home/web3-blockS.png';
import web3Bsc from 'src/assets/images/home/web3-Bsc.png';
import web3CoinCdex from 'src/assets/images/home/web3-coinCdex.png';
import web3CoinGeko from 'src/assets/images/home/web3-coinGeko.png';
import web3Coingape from 'src/assets/images/home/web3-coingape.png';
import web3Whattomine from 'src/assets/images/home/web3-whattomine.png';
import web3StormGain from 'src/assets/images/home/web3-stormGain.png';
import { useNavigate } from 'react-router-dom';
import { Menu, Dropdown } from '@arco-design/web-react';

gsap.registerPlugin(ScrollTrigger);

interface CaseItemProps {
  title: string;
  describe: string;
  img: string;
}
enum TabType {
  Home = 'home',
  Advantage = 'advantageRef',
  Market = 'market',
  Example = 'example',
}

const CaseItem: React.FC<CaseItemProps> = ({ title, describe, img }) => {
  return (
    <div className={classNames(styles['common-background'], styles['case-content-item'], styles[title])}>
      <div className={styles['case-item-title']}>{title}</div>
      <div className={styles['case-item-describe']}>{describe}</div>
      <div className={styles['case-item-image']}>
        <LazyLoadImage src={img} alt={title} effect="blur"></LazyLoadImage>
      </div>
    </div>
  );
};

const themeStyle = {
  background: 'var(--theme-color)',
  color: '#fff',
};

const Index: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const advantageRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const exampleRef = useRef<HTMLDivElement>(null);
  const [tabStatus, setTabStatus] = useState<TabType>(TabType.Home);
  const { lang, i18n, changeLanguage } = useI18n(locale);
  const q = gsap.utils.selector(containerRef);
  const { ref: ref1, inView: inView1 } = useInView({
    threshold: 0,
  });
  const { ref: ref2, inView: inView2 } = useInView({
    threshold: 0,
  });
  const { ref: ref3, inView: inView3 } = useInView({
    threshold: 0,
  });
  const { ref: ref4, inView: inView4 } = useInView({
    threshold: 0,
  });
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

  const navigate = useNavigate();
  const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    setTimeout(() => {
      ref.current?.scrollIntoView({ block: 'start' });
    }, 10);
    exampleRef.current?.scrollIntoView({ block: 'end' });
  };
  useEffect(() => {
    if (inView1) {
      setTabStatus(TabType.Home);
      return;
    }
    if (inView2) {
      setTabStatus(TabType.Advantage);
      return;
    }
    if (inView3) {
      setTabStatus(TabType.Market);
      return;
    }
    if (inView4) {
      setTabStatus(TabType.Example);
      return;
    }
  }, [inView1, inView2, inView3, inView4]);
  // useEffect(() => {
  //   if (scroll && exampleRef?.current && advantageRef?.current && marketRef?.current) {
  //     const { top } = scroll;
  //     if (top > exampleRef?.current?.getBoundingClientRect()?.top) {
  //       setTabStatus(TabType.Example);
  //       return;
  //     }
  //     if (top > marketRef?.current?.getBoundingClientRect()?.top) {
  //       setTabStatus(TabType.Market);
  //       return;
  //     }
  //     if (top > advantageRef?.current?.getBoundingClientRect()?.top) {
  //       setTabStatus(TabType.Advantage);
  //       return;
  //     }
  //     setTabStatus(TabType.Home);
  //   }
  // }, [scroll]);
  useMount(() => {
    gsap.fromTo(
      q('#advantage-title'),
      { x: -1200 },
      {
        x: 16,
        scrollTrigger: {
          trigger: q('#home-area'),
          start: 'bottom 360',
          end: 'bottom -20',
          scrub: true,
          pin: q('#advantage-area'),
        },
      },
    );
  });
  useMount(() => {
    gsap.fromTo(
      q(`#bar${1}`),
      { width: 0 },
      {
        width: 'calc(100vw - 64px)',
        scrollTrigger: {
          trigger: q('#home-area'),
          start: 'bottom -20',
          end: 'bottom -620',
          pin: q('#advantage-area'),
          scrub: true,
        },
      },
    );
  });
  useMount(() => {
    gsap.fromTo(
      q(`#bar${2}`),
      { width: 0 },
      {
        width: 'calc(100vw - 64px)',
        scrollTrigger: {
          trigger: q('#advantage-area'),
          start: 'top 60',
          end: '300%',
          pin: q('#advantage-area'),
          scrub: true,
        },
      },
    );
  });
  useMount(() => {
    const animationTitle = () => {
      const timeline = gsap.timeline();
      timeline.fromTo(
        q('#case-title'),
        { transform: 'translateX(-1000px)', opacity: 0 },
        { transform: 'translateX(0)', opacity: 1 },
      );
      return timeline;
    };
    const animationContent = () => {
      const timeline = gsap.timeline();
      timeline.fromTo(q('#case-content'), { transform: 'translateX(2000px)' }, { transform: 'translateX(0)' });
      return timeline;
    };
    const areaTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: q('#case-area'),
        start: 'bottom bottom',
        end: '400%',
        pin: true,
        scrub: true,
      },
    });
    areaTimeline.add(animationTitle()).add(animationContent());
  });

  const toLogin = () => {
    navigate('/login');
  };
  return (
    <div className={classNames(styles.container, lang === 'zh-CN' && styles['chinese-container'])} ref={containerRef}>
      <video muted loop className={styles['back-video']} autoPlay>
        <source
          src="https://starlands3.s3.ap-southeast-1.amazonaws.com/starland/1686214453014-home-back4.mp4"
          type="video/mp4"
        />
      </video>
      <div className={styles['black-back-imgae']}></div>
      <div className={styles.header}>
        <img src={Logo} alt="" className={styles.logo} />
        <div className={styles['tab-button-container']}>
          <div
            // className={classNames(styles['tab-button'])}
            className={classNames(styles['tab-button'], tabStatus === TabType.Home && styles['selected-tab-button'])}
            onClick={() => handleScrollTo(homeRef)}
          >
            {i18n[lang]['intro.home']}
          </div>
          <div
            className={classNames(
              styles['tab-button'],
              tabStatus === TabType.Advantage && styles['selected-tab-button'],
            )}
            onClick={() => handleScrollTo(advantageRef)}
          >
            {i18n[lang]['intro.advantage']}
          </div>
          <div
            // className={classNames(styles['tab-button'])}
            className={classNames(styles['tab-button'], tabStatus === TabType.Market && styles['selected-tab-button'])}
            onClick={() => handleScrollTo(marketRef)}
          >
            {i18n[lang]['intro.market']}
          </div>
          <div
            // className={classNames(styles['tab-button'])}
            className={classNames(styles['tab-button'], tabStatus === TabType.Example && styles['selected-tab-button'])}
            onClick={() => handleScrollTo(exampleRef)}
          >
            {i18n[lang]['intro.example']}
          </div>
        </div>
        <div className={styles['opreate-area']}>
          <div className={styles['login-button']} onClick={toLogin}>
            {i18n[lang]['intro.login']}
          </div>
          <Dropdown trigger="click" droplist={languageList} position="bl">
            <div className={styles['lang-button']}>{lang === 'zh-CN' ? 'CN' : 'EN'}</div>
          </Dropdown>
        </div>
      </div>
      {/* {home area start} */}
      <div className={styles['home-area']} id="home-area" ref={homeRef}>
        <div className={styles['home-title']} ref={ref1}>
          <div> {i18n[lang]['intro.home.title1']} </div>
          <div className={styles['title2-home']}> {i18n[lang]['intro.home.title2']} </div>
        </div>
        <div className={styles['home-describe']}>{i18n[lang]['intro.home.describle']}</div>
      </div>
      {/* {home area end} */}
      {/* {advantage area start} */}
      <div className={styles['advantage-area']} id="advantage-area" ref={advantageRef}>
        <div className={styles['advantage-title']} id="advantage-title">
          {i18n[lang]['intro.advantage.title']}
        </div>
        <div className={styles['advantage-sub-title']} ref={ref2}>
          Web2
        </div>
        <ScrollBar
          barNumber={1}
          contentList={[
            { src: web2AppFlys, width: '140px', height: '40px' },
            { src: web2AppLovin, width: '160px', height: '40px' },
            { src: web2Djust, width: '140px', height: '34px' },
            { src: web2Meta, width: '140px', height: '36px' },
            { src: web2PetalADs, width: '140px', height: '40px' },
            { src: web2Tiktok, width: '120px', height: '40px' },
            { src: web2Topon, width: '140px', height: '36px' },
            { src: web2Unity, width: '120px', height: '40px' },
          ]}
        />
        <div className={classNames(styles['advantage-sub-title'], styles['web3-title'])}>Web3</div>
        <ScrollBar
          barNumber={2}
          contentList={[
            { src: web3BlockS, width: '160px', height: '40px' },
            { src: web3Bsc, width: '150px', height: '40px' },
            { src: web3CoinCdex, width: '170px', height: '40px' },
            { src: web3CoinGeko, width: '150px', height: '40px' },
            { src: web3Coingape, width: '150px', height: '40px' },
            { src: web3Whattomine, width: '160px', height: '40px' },
            { src: web3StormGain, width: '140px', height: '40px' },
          ]}
          floatType="right"
        />
      </div>
      {/* {advantage area end} */}
      {/* market area start */}
      <div className={styles['market-area']} ref={marketRef}>
        <div className={styles['market-area-top']}>
          <div className={classNames(styles['pan'], styles['common-background'])}>
            <div className={styles['market-item-title']}>{i18n[lang]['intro.market.pan']}</div>
            <LazyLoadImage alt={'pan'} effect="blur" src={panImage} />
          </div>
          <div className={classNames(styles['allPlate'], styles['common-background'])}>
            <div className={styles['market-item-title']}>{i18n[lang]['intro.market.allpalte']}</div>
            <LazyLoadImage alt={'palte'} effect="blur" src={plateImage} />
          </div>
          <div className={classNames(styles['ads'], styles['common-background'])}>
            <div className={styles['market-item-title']}>{i18n[lang]['intro.market.ads']}</div>
            <LazyLoadImage alt={'palte'} effect="blur" src={adsImage} />
          </div>
        </div>
        <div className={styles['market-area-bottom']} ref={ref3}>
          <div className={classNames(styles['sdk'], styles['common-background'])}>
            <div className={styles['market-item-title']}>{i18n[lang]['intro.market.sdk']}</div>
            <LazyLoadImage alt={'palte'} effect="blur" src={sdkImage} />
          </div>
          <div className={classNames(styles['assist'], styles['common-background'])}>
            <div className={styles['market-item-title']}>{i18n[lang]['intro.market.assitate']}</div>
            <LazyLoadImage alt={'palte'} effect="blur" src={assitImage} />
          </div>
          <div className={classNames(styles['ai'], styles['common-background'])}>
            <div className={styles['market-item-title']}>{i18n[lang]['intro.market.ai']}</div>
            <LazyLoadImage alt={'palte'} effect="blur" src={aiImage} />
          </div>
          <div className={classNames(styles['echart'], styles['common-background'])}>
            <div className={styles['market-item-title']}>{i18n[lang]['intro.market.echart']}</div>
            <LazyLoadImage alt={'palte'} effect="blur" src={echartImage} />
          </div>
        </div>
      </div>
      {/* market area end */}
      {/* case area start */}
      <div className={styles['case-area']} id="case-area">
        <div className={styles['case-title']} id="case-title">
          {i18n[lang]['intro.case.title']}
        </div>
        <div className={styles['case-content']} id="case-content" ref={ref4}>
          <CaseItem title="Dehero" describe={i18n[lang]['intro.dehreo']} img={deheroImage} />
          <CaseItem title="Metacene" describe={i18n[lang]['intro.metacene']} img={metaceneImage} />
          <CaseItem title="Unipass" describe={i18n[lang]['intro.unipass']} img={unipassImage} />
        </div>
      </div>
      <div ref={exampleRef} className={styles['bottom']}></div>
    </div>
  );
};

export default Index;
