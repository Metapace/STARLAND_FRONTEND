import React from 'react';
import styles from './index.module.less';
import useI18n from 'src/ahooks/useI18n';
import locales from './locales';
import classNames from 'classnames';
import DataItem, { ChartType } from './components/dataItem';
import costImage from 'src/assets/images/dashbord/cost.png';
import createImage from 'src/assets/images/dashbord/create.png';
import avalibleImage from 'src/assets/images/dashbord/avalible.png';
import blueAdd from 'src/assets/images/dashbord/blue-add.png';
import orangeAdd from 'src/assets/images/dashbord/orange-add.png';
import web2Channel from 'src/assets/images/dashbord/web2-channel.png';
import leftArrow from 'src/assets/images/arrow-left.png';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CountUp from 'react-countup';
import 'react-lazy-load-image-component/src/effects/blur.css';
interface InfoItemProps {
  type: 'activity' | 'info';
  message: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ type, message }) => {
  const { lang, i18n } = useI18n(locales);
  const name = React.useMemo(() => {
    return type === 'activity' ? 'dashbord.activity' : 'dashbord.message';
  }, [type]);
  return (
    <div className={styles['common-info-item']}>
      <div className={classNames(styles['left'], styles[type])}>{`${i18n[lang][name]}`}</div>
      <div className={styles['right']}>{message}</div>
    </div>
  );
};

interface TitleImageItemProps {
  img: string;
  title: string;
  classname?: string;
}

const TitleImageItem: React.FC<TitleImageItemProps> = ({ img, title, classname }) => {
  return (
    <div className={classNames(styles['title-image-item'], classname && styles[classname])}>
      <img src={img} alt="" />
      <div className={styles['img-title']}>{title}</div>
    </div>
  );
};

interface DollarItemProps {
  color: 'blue' | 'purple' | 'orange';
  size?: 'normal' | 'large';
  dollar: number;
}

const DollarItem: React.FC<DollarItemProps> = (props) => {
  const { color, size = 'normal', dollar } = props;
  return (
    <div className={styles['dollar-item']}>
      <div className={classNames(styles['dollar-number'], styles[color], styles[size])}>
        $
        <CountUp end={dollar} duration={1} />
      </div>
      <div className={styles.unit}>USD</div>
    </div>
  );
};

interface ChannelItemProps {
  title: string;
  describle: string;
  image?: string;
}

const ChannelItem: React.FC<ChannelItemProps> = (props) => {
  const { title, describle, image } = props;
  return (
    <div className={classNames(styles['common-item'], styles['channel-item'])}>
      <div className={styles['channel-item-left']}>
        <LazyLoadImage src={web2Channel} alt={'web2'} effect="blur" width={'111px'} height={'111px'} />
      </div>
      <div className={styles['channel-item-right']}>
        <div className={styles.top}>{title}</div>
        <div className={styles.middle}>{describle}</div>
        <div className={styles.bottom}>
          <img src={leftArrow} alt="" />
        </div>
      </div>
    </div>
  );
};

const Workplace = () => {
  const { lang, i18n } = useI18n(locales);
  const name = 'Dan';
  return (
    <div className={styles.workplace}>
      <div className={styles['welcome-title']}>{`${i18n[lang]['dashbord.welcome']}, ${name}!`}</div>
      <div className={styles['top-item-list']}>
        <div className={classNames(styles['account-item'], styles['common-item'])}>
          <div className={classNames(styles['top-item'], styles['account-item-inner'])}>
            <TitleImageItem img={avalibleImage} title="账户资产" />
            <div className={styles['account-item-inner-text']}>
              <DollarItem color="blue" dollar={3723.22} />
              <div className={styles['tip-text']}>
                账户资产含平台服务运营费用为<span>10%</span>，每季度以实际消耗结算为准。
              </div>
            </div>
          </div>
          <div className={classNames(styles['bottom-item'], styles['account-item-inner'])}>
            <TitleImageItem img={avalibleImage} title="可用资产" />
            <div className={styles['account-item-inner-text']}>
              <DollarItem color="orange" dollar={3723.22} />
            </div>
          </div>
          <div className={classNames(styles['account-button'], styles['common-button'])}>
            <img src={blueAdd} alt="" />
            增加资金
          </div>
        </div>
        <div className={classNames(styles['activity-item'], styles['common-item'])}>
          <TitleImageItem img={createImage} title="创建活动" classname="creat-title-imgae" />
          <div className={styles['totla-number']}>
            8 <span>个</span>
          </div>
          <div className={styles['activity-number']}>正常运行：6个</div>
          <div className={classNames(styles['activity-button'], styles['common-button'])}>
            <img src={orangeAdd} alt="" />
            添加活动
          </div>
        </div>
        <div className={classNames(styles['cost-item'], styles['common-item'])}>
          <div style={{ marginTop: '24px' }}></div>
          <TitleImageItem img={costImage} title="昨日消耗" classname="creat-title-imgae" />
          <DollarItem color="purple" dollar={3723.22} size="large"></DollarItem>
          <div className={classNames(styles['cost-button'], styles['common-button'])}>查看详情</div>
        </div>
      </div>
      <div className={styles['item-title']}>{`${i18n[lang]['dashbord.info']}`}</div>
      <div className={classNames(styles['message-item'], styles['common-item'])}>
        <div className={styles['read-more']}>{`${i18n[lang]['dashbord.readMore']}`}</div>
        <div className={styles['info-item-list']}>
          <InfoItem type="activity" message="aasddd" />
          <InfoItem type="info" message="aasadakjdajknsdjkansdjknaksdnakjnsdkjandajndkjnajsdnakjsnd" />
        </div>
      </div>
      <div className={styles['item-title']}>{`${i18n[lang]['dashbord.lastDayData']}`}</div>
      <div className={styles['data-item-list']}>
        <DataItem title="categaory" dataList={[50, 32, 21, 34, 76, 56, 13]} />
        <DataItem title="categaory" dataList={[23, 4, 21, 34, 76, 56, 21]} />
        <DataItem title="categaory" dataList={[12, 32, 21, 34, 76, 56, 72]} />
        <DataItem title="categaory" dataList={[1, 32, 21, 34, 76, 56, 99]} chartType={ChartType.Bar} />
      </div>

      <div className={styles['item-title']}>{`${i18n[lang]['dashbord.marketChannel']}`}</div>
      <div className={classNames(styles['common-item'], styles['market-item'])}>
        <LazyLoadImage src={web2Channel} alt={'web2'} effect="blur" width={'96%'} />
      </div>
      <div className={styles['channel-item-list']}>
        <ChannelItem title="DEX Screener 上的搜索栏广告-20万次展示" describle="文字广告/区块链和加密货币"></ChannelItem>
        <ChannelItem title="BSC新闻上的社交媒体帖子（推特、电报）" describle="文字广告/区块链和加密货币"></ChannelItem>
      </div>
      <div className={styles['channel-item-list']}>
        <ChannelItem title="MarkeCapOf上的原生广告（桌面+移动）" describle="文字广告/区块链和加密货币"></ChannelItem>
        <ChannelItem title="CoinGape上的有机文章" describle="文字广告/区块链和加密货币"></ChannelItem>
      </div>
    </div>
  );
};

export default Workplace;
