import React, { useState, useEffect, CSSProperties } from 'react';
import styles from './index.module.less';
import { useNavigate } from 'react-router-dom';
import useI18n from 'src/ahooks/useI18n';
import locales from './locales';
import classNames from 'classnames';
import DataItem, { ChartType } from './components/dataItem';
import costImage from 'src/assets/images/dashbord/cost.png';
import createImage from 'src/assets/images/dashbord/create.png';
import allBalanceImage from 'src/assets/images/dashbord/all-balance.png';
import avalibleImage from 'src/assets/images/dashbord/avalible.png';
import blueAdd from 'src/assets/images/dashbord/blue-add.png';
import orangeAdd from 'src/assets/images/dashbord/orange-add.png';
import web2Channel from 'src/assets/images/dashbord/web2-channel.png';
import leftArrow from 'src/assets/images/arrow-left.png';
import web21 from 'src/assets/images/web2log/Group 14717.png';
import web22 from 'src/assets/images/web2log/Group 14718.png';
import web23 from 'src/assets/images/web2log/Group 14719.png';
import web24 from 'src/assets/images/web2log/Group 14720.png';
import web25 from 'src/assets/images/web2log/Group 14721.png';
import web26 from 'src/assets/images/web2log/Group 14722.png';
import web27 from 'src/assets/images/web2log/Group 14723.png';
import web28 from 'src/assets/images/web2log/Group 14724.png';
import web29 from 'src/assets/images/web2log/Group 14725.png';
import web210 from 'src/assets/images/web2log/Group 14726.png';
import web211 from 'src/assets/images/web2log/Group 14727.png';
import web212 from 'src/assets/images/web2log/Group 14728.png';
import web31 from 'src/assets/images/web3log/Group 14739.png';
import web32 from 'src/assets/images/web3log/Group 14752.png';
import web33 from 'src/assets/images/web3log/Group 14753.png';
import web34 from 'src/assets/images/web3log/Group 14754.png';
import web35 from 'src/assets/images/web3log/Group 14755.png';
import web36 from 'src/assets/images/web3log/Group 14756.png';
import web37 from 'src/assets/images/web3log/Group 14757.png';
import web39 from 'src/assets/images/web3log/Group 14758.png';
import web310 from 'src/assets/images/web3log/Group 14759.png';
import web311 from 'src/assets/images/web3log/Group 14760.png';
import web312 from 'src/assets/images/web3log/Group 14761.png';
import web38 from 'src/assets/images/web3log/Group 14762.png';

import CountUp from 'react-countup';
import { useTransformInfoContent } from 'src/app/Message/components/MessageItem';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
  useRequestUserIndfo,
  useRequestDashboardInfo,
  useRequestreportGet,
  useRequestAlertList,
  ReportGetReturnItem,
  AlertReturnItem,
} from 'apis';
interface InfoItemProps {
  type: 'activity' | 'info';
  message?: AlertReturnItem;
}

const InfoItem: React.FC<InfoItemProps> = ({ type, message }) => {
  const { lang, i18n } = useI18n(locales);
  const content = useTransformInfoContent(message?.msg_type, message?.create_time);
  const name = React.useMemo(() => {
    return type === 'activity' ? 'dashbord.activity' : 'dashbord.message';
  }, [type]);
  return (
    <div className={styles['common-info-item']}>
      <div className={classNames(styles['left'], styles[type])}>{`${i18n[lang][name]}`}</div>
      <div className={styles['right']}>{content || i18n[lang]['no.message']}</div>
    </div>
  );
};

interface TitleImageItemProps {
  img: string;
  title: string;
  classname?: string;
  imageBackcolor: string;
  imgstyle: CSSProperties;
}

const TitleImageItem: React.FC<TitleImageItemProps> = ({ img, title, classname, imageBackcolor, imgstyle }) => {
  return (
    <div className={classNames(styles['title-image-item'], classname && styles[classname])}>
      <div className={styles['title-image-item-image-container']} style={{ backgroundColor: imageBackcolor }}>
        <img src={img} alt="" style={imgstyle} />
      </div>

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

const marketItemList1 = [web21, web22, web23, web24, web25, web26];
const marketItemList2 = [web27, web28, web29, web210, web211, web212];
const marketItemList3 = [web31, web32, web33, web34, web35, web36];
const marketItemList4 = [web37, web38, web39, web310, web311, web312];

export const MarketItem: React.FC<MarketItemProps> = ({ src, width = '72px' }) => {
  return (
    <div className={styles['market-item-one']}>
      <LazyLoadImage src={src} alt={'web2'} effect="blur" width={width} />
    </div>
  );
};

interface AllList {
  impressionList: Array<number>;
  costList: Array<number>;
  clickList: Array<number>;
  ctrList: Array<number>;
}
const empytyList = new Array(7).fill(0);

const Workplace = () => {
  const { lang, i18n } = useI18n(locales);
  const navigate = useNavigate();
  const { data } = useRequestUserIndfo();
  const { data: data2 } = useRequestDashboardInfo();
  const { data: data3 } = useRequestreportGet(4);
  const { data: messageData } = useRequestAlertList({ page: 1, page_size: 10 });
  const [lastDayDate, setlastDayDate] = useState<Omit<ReportGetReturnItem, 'data'>>();
  const [allList, setAllList] = useState<AllList>({
    impressionList: empytyList,
    costList: empytyList,
    clickList: empytyList,
    ctrList: empytyList,
  });
  useEffect(() => {
    if (data3 && Array.isArray(data3) && data3.length > 0) {
      const lastItem = data3[data3.length - 1];
      setlastDayDate(lastItem);
      const impressionList = data3.map((item: ReportGetReturnItem) => item.impression);
      const costList = data3.map((item: ReportGetReturnItem) => item.cost);
      const clickList = data3.map((item: ReportGetReturnItem) => item.click);
      const ctrList = data3.map((item: ReportGetReturnItem) => item.ctr);
      setAllList({ impressionList, costList, clickList, ctrList });
    }
  }, [data3]);

  return (
    <div className={styles.workplace}>
      <div className={styles['welcome-title']}>{`${i18n[lang]['dashbord.welcome']}, ${data?.email}!`}</div>
      <div className={styles['top-item-list']}>
        <div className={classNames(styles['account-item'], styles['common-item'])}>
          <div className={classNames(styles['top-item'], styles['account-item-inner'])}>
            <TitleImageItem
              img={allBalanceImage}
              title={i18n[lang]['account.number']}
              imageBackcolor="#CAD9F7"
              imgstyle={{ width: '11px', height: '19px' }}
            />
            <div className={styles['account-item-inner-text']}>
              <DollarItem color="blue" dollar={+(data2?.balance || 0)} />
              <div className={styles['tip-text']}>
                {i18n[lang]['account.number.describe1']}
                <span>10%</span>，{i18n[lang]['account.number.describe2']}
              </div>
            </div>
          </div>
          <div className={classNames(styles['bottom-item'], styles['account-item-inner'])}>
            <TitleImageItem
              img={avalibleImage}
              title={i18n[lang]['avalible.number']}
              imageBackcolor="#E1DBCD"
              imgstyle={{ width: '24px', height: '24px' }}
            />
            <div className={styles['account-item-inner-text']}>
              <DollarItem color="orange" dollar={data2?.available_balance || 0} />
            </div>
          </div>
          <div
            className={classNames('common-button', styles['account-button'], styles['common-button'])}
            onClick={() => navigate('/usercenter')}
          >
            <img src={blueAdd} alt="" />
            {i18n[lang]['add.money']}
          </div>
        </div>
        <div className={classNames(styles['activity-item'], styles['common-item'])}>
          <TitleImageItem
            img={createImage}
            title={i18n[lang]['create.campagin']}
            classname="creat-title-imgae"
            imageBackcolor="#E1DBCD"
            imgstyle={{ width: '12px', height: '14px' }}
          />
          <div className={styles['totla-number']}>
            {data2?.total_activity} <span>{i18n[lang]['pcs.pcs']}</span>
          </div>
          <div className={styles['activity-number']}>
            {i18n[lang]['process.number']}：{data2?.running_activity}
            {i18n[lang]['pcs.pcs']}
          </div>
          <div
            className={classNames('common-button', styles['activity-button'], styles['common-button'])}
            onClick={() => navigate('/publish-demand')}
          >
            <img src={orangeAdd} alt="" />
            {i18n[lang]['add.campagin']}
          </div>
        </div>
        <div className={classNames(styles['cost-item'], styles['common-item'])}>
          <div style={{ marginTop: '24px' }}></div>
          <TitleImageItem
            img={costImage}
            title={i18n[lang]['yesterday.cost']}
            classname="creat-title-imgae"
            imageBackcolor="#4318ff3b"
            imgstyle={{ width: '16px', height: '16px' }}
          />
          <DollarItem color="purple" dollar={lastDayDate?.cost || 0} size="large"></DollarItem>
          <div
            className={classNames('common-button', styles['cost-button'], styles['common-button'])}
            onClick={() => navigate('/datainfo')}
          >
            {i18n[lang]['view.detail']}
          </div>
        </div>
      </div>
      <div className={styles['item-title']}>{`${i18n[lang]['dashbord.info']}`}</div>
      <div className={classNames(styles['message-item'], styles['common-item'])}>
        <div
          className={styles['read-more']}
          onClick={() => navigate('/message')}
        >{`${i18n[lang]['dashbord.readMore']}`}</div>
        <div className={styles['info-item-list']}>
          {/* <InfoItem type="activity" message="it is a dashbord activity info" /> */}
          <InfoItem type="info" message={messageData?.messages[0]} />
        </div>
      </div>
      <div className={styles['item-title']}>
        {`${i18n[lang]['dashbord.lastDayData']}`}
        <span className={styles['yesterdat-tip']}>{`${i18n[lang]['yesterdat-tip']}`}</span>
      </div>
      <div className={styles['data-item-list']}>
        <DataItem title={i18n[lang]['yesterday-data-1']} dataList={allList.impressionList} />
        <DataItem title={i18n[lang]['yesterday-data-2']} dataList={allList.clickList} />
        <DataItem title={i18n[lang]['yesterday-data-3']} dataList={allList.ctrList} />
        <DataItem title={i18n[lang]['yesterday-data-4']} dataList={allList.costList} chartType={ChartType.Bar} />
      </div>

      <div className={styles['item-title']}>{`${i18n[lang]['dashbord.marketChannel']}`}</div>
      <div className={styles['market-channel-title']}>Web2</div>
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
      <div className={styles['market-channel-title']}>Web3</div>
      <div className={classNames(styles['common-item'], styles['market-item'])}>
        <div>
          {marketItemList3.map((src: string) => (
            <MarketItem src={src} key={src}></MarketItem>
          ))}
        </div>
        <div>
          {marketItemList4.map((src: string) => (
            <MarketItem src={src} key={src}></MarketItem>
          ))}
        </div>
      </div>
      {/* <div className={styles['channel-item-list']}>
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
      </div> */}
    </div>
  );
};

export default Workplace;
