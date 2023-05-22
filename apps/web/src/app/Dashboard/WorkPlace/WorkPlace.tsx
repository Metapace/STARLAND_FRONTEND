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
import { LazyLoadImage } from 'react-lazy-load-image-component';
import CountUp from 'react-countup';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { dashBoardInfoRequest, userInfoRequest } from 'src/api/user';
import { useQuery } from '@tanstack/react-query';
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
        <div className={classNames('common-button', styles.bottom)}>
          <img src={leftArrow} alt="" />
        </div>
      </div>
    </div>
  );
};

interface MarketItemProps {
  src: string;
  width?: string;
  height?: string;
}

const marketItemList1 = [BIGO, Dable, Meta, Snapchat, TikTok, Yandex];
const marketItemList2 = [eagllwin, googleAds, huawei, prokwai, Taboola, Mytarget];

const MarketItem: React.FC<MarketItemProps> = ({ src, width = '72px', height = '22px' }) => {
  return (
    <div className={styles['market-item-one']}>
      <LazyLoadImage src={src} alt={'web2'} effect="blur" width={width} />
    </div>
  );
};

const Workplace = () => {
  const { lang, i18n } = useI18n(locales);
  const { data } = useQuery(['userinfo'], userInfoRequest);
  const { data: data2 } = useQuery(['dashbord'], dashBoardInfoRequest);
  return (
    <div className={styles.workplace}>
      <div className={styles['welcome-title']}>{`${i18n[lang]['dashbord.welcome']}, ${data?.email}!`}</div>
      <div className={styles['top-item-list']}>
        <div className={classNames(styles['account-item'], styles['common-item'])}>
          <div className={classNames(styles['top-item'], styles['account-item-inner'])}>
            <TitleImageItem img={avalibleImage} title={i18n[lang]['account.number']} />
            <div className={styles['account-item-inner-text']}>
              <DollarItem color="blue" dollar={+(data2?.balance || 0)} />
              <div className={styles['tip-text']}>
                {i18n[lang]['account.number.describe1']}
                <span>10%</span>，{i18n[lang]['account.number.describe2']}
              </div>
            </div>
          </div>
          <div className={classNames(styles['bottom-item'], styles['account-item-inner'])}>
            <TitleImageItem img={avalibleImage} title={i18n[lang]['avalible.number']} />
            <div className={styles['account-item-inner-text']}>
              <DollarItem color="orange" dollar={(data2?.balance || 0) * 0.9} />
            </div>
          </div>
          <div className={classNames('common-button', styles['account-button'], styles['common-button'])}>
            <img src={blueAdd} alt="" />
            {i18n[lang]['add.money']}
          </div>
        </div>
        <div className={classNames(styles['activity-item'], styles['common-item'])}>
          <TitleImageItem img={createImage} title={i18n[lang]['create.campagin']} classname="creat-title-imgae" />
          <div className={styles['totla-number']}>
            8 <span>{i18n[lang]['pcs.pcs']}</span>
          </div>
          <div className={styles['activity-number']}>
            {i18n[lang]['process.number']}：6{i18n[lang]['pcs.pcs']}
          </div>
          <div className={classNames('common-button', styles['activity-button'], styles['common-button'])}>
            <img src={orangeAdd} alt="" />
            {i18n[lang]['add.campagin']}
          </div>
        </div>
        <div className={classNames(styles['cost-item'], styles['common-item'])}>
          <div style={{ marginTop: '24px' }}></div>
          <TitleImageItem img={costImage} title={i18n[lang]['yesterday.cost']} classname="creat-title-imgae" />
          <DollarItem color="purple" dollar={3723.22} size="large"></DollarItem>
          <div className={classNames('common-button', styles['cost-button'], styles['common-button'])}>
            {i18n[lang]['view.detail']}
          </div>
        </div>
      </div>
      <div className={styles['item-title']}>{`${i18n[lang]['dashbord.info']}`}</div>
      <div className={classNames(styles['message-item'], styles['common-item'])}>
        <div className={styles['read-more']}>{`${i18n[lang]['dashbord.readMore']}`}</div>
        <div className={styles['info-item-list']}>
          <InfoItem type="activity" message="it is a dashbord activity info" />
          <InfoItem type="info" message="it is a dashbord message info" />
        </div>
      </div>
      <div className={styles['item-title']}>{`${i18n[lang]['dashbord.lastDayData']}`}</div>
      <div className={styles['data-item-list']}>
        <DataItem title={i18n[lang]['yesterday-data-1']} dataList={[50, 32, 21, 34, 76, 56, 13]} />
        <DataItem title={i18n[lang]['yesterday-data-2']} dataList={[23, 4, 21, 34, 76, 56, 21]} />
        <DataItem title={i18n[lang]['yesterday-data-3']} dataList={[12, 32, 21, 34, 76, 56, 72]} />
        <DataItem
          title={i18n[lang]['yesterday-data-4']}
          dataList={[1, 32, 21, 34, 76, 56, 99]}
          chartType={ChartType.Bar}
        />
      </div>

      <div className={styles['item-title']}>{`${i18n[lang]['dashbord.marketChannel']}`}</div>
      <div className={classNames(styles['common-item'], styles['market-item'])}>
        <div>
          {marketItemList1.map((src: string) => (
            <MarketItem src={src} key={src}></MarketItem>
          ))}
        </div>
        <div>
          {marketItemList2.map((src: string) => (
            <MarketItem src={src} key={src}></MarketItem>
          ))}
        </div>
      </div>
      <div className={styles['channel-item-list']}>
        <ChannelItem
          title={`${i18n[lang]['channel-item-title1']}`}
          describle={`${i18n[lang]['channel-item-decribe']}`}
        ></ChannelItem>
        <ChannelItem
          title={`${i18n[lang]['channel-item-title2']}`}
          describle={`${i18n[lang]['channel-item-decribe']}`}
        ></ChannelItem>
      </div>
      <div className={styles['channel-item-list']}>
        <ChannelItem
          title={`${i18n[lang]['channel-item-title3']}`}
          describle={`${i18n[lang]['channel-item-decribe']}`}
        ></ChannelItem>
        <ChannelItem
          title={`${i18n[lang]['channel-item-title4']}`}
          describle={`${i18n[lang]['channel-item-decribe']}`}
        ></ChannelItem>
      </div>
    </div>
  );
};

export default Workplace;
