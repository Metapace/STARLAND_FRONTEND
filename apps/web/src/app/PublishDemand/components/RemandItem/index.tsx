import React, { useMemo } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
import { DemandType, ReturnRemandItem, ChannelType, useRequestCountry } from 'apis';
import { gendarRange } from 'src/conifg/selectConfig';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import PayModal from 'src/components/PayModal';
import { useToggle } from 'ahooks';
import RelaunchButton from 'src/components/RelaunchButton';

export const DemandMap: Record<
  Exclude<DemandType, DemandType.Remove | DemandType.ReVerify | DemandType.CloseWait>,
  string
> = {
  [DemandType.All]: 'r.all',
  [DemandType.NeedDeposite]: 'waite.deposit',
  [DemandType.NeedPay]: 'waite.auth',
  [DemandType.NeedVerify]: 'waite.review',
  [DemandType.VerifyFail]: 'review.failtrue',
  [DemandType.Channel]: 'channel.split',
  [DemandType.Going]: 'on.progress',
  [DemandType.Finished]: 'already.finish',
};

interface RemandItemProps extends ReturnRemandItem {
  refetch: () => Promise<any>;
}

const Index: React.FC<RemandItemProps> = ({ status, create_time, chan, country, price, crowd, id, refetch }) => {
  const { lang, i18n } = useI18n(locale);
  const ty = lang === 'zh-CN' ? 1 : 2;
  const { data: countryObject } = useRequestCountry(ty);
  const navigate = useNavigate();
  const [open, { toggle }] = useToggle(false);
  const tagColor: string = useMemo(() => {
    if (status === DemandType.NeedDeposite || status === DemandType.NeedVerify || status === DemandType.Channel) {
      return 'blue';
    }
    if (status === DemandType.NeedPay) {
      return 'gray-green';
    }
    if (status === DemandType.VerifyFail) {
      return 'red';
    }
    if (status === DemandType.Going || status === DemandType.CloseWait) {
      return 'light-green';
    }
    if (status === DemandType.Finished) {
      return 'gray';
    }
    return 'blue';
  }, [status]);

  const timeText = useMemo(() => {
    return dayjs.unix(create_time).format('YYYY-MM-DD HH:mm:ss');
  }, [create_time]);

  const showCrowd = useMemo(() => {
    const item = gendarRange.filter((v) => v.value === crowd);
    return item[0]?.label;
  }, [crowd]);

  const showCountry = useMemo(() => {
    if (countryObject && country) {
      return country
        .split(',')
        .map((key: any) => countryObject[key])
        .join(' ');
    }
    return '';
  }, [countryObject, country]);

  return (
    <div className={styles.container}>
      <div className={classNames(styles['tag'], styles[tagColor])}>
        {status === DemandType.Going || status === DemandType.CloseWait
          ? i18n[lang][DemandMap[DemandType.Going]]
          : i18n[lang][DemandMap[status]]}
      </div>
      <div className={styles.title}>Web2-{i18n[lang]['native.ads']}</div>
      <div className={styles.time}>{timeText}</div>
      <div className={styles.content}>
        {chan === ChannelType.WEB2 && (
          <>
            {/* 投放国家 */}
            <div className={styles['content-item']}>
              <span>{i18n[lang]['launch.country']}：</span>
              <span className={styles['content-item-value']}>{showCountry}</span>
            </div>
            {/* 每日预算 */}
            <div className={styles['content-item']}>
              <span>{i18n[lang]['daily.cost']}：</span>
              <span className={styles['content-item-value']}>${price}</span>
            </div>
            {/* 投放人群 */}
            <div className={styles['content-item']}>
              <span>{i18n[lang]['launch.pepole']}：</span>
              <span className={styles['content-item-value']}>{i18n[lang][showCrowd]}</span>
            </div>
          </>
        )}
        {chan === ChannelType.WEB3 && (
          <>
            {/* 投放金额 */}
            <div className={styles['content-item']}>
              <span>{i18n[lang]['launch.amount']}：</span>
              <span className={styles['content-item-value']}></span>
            </div>
            {/* 投放数量 */}
            <div className={styles['content-item']}>
              <span>{i18n[lang]['launch.number']}：</span>
              <span className={styles['content-item-value']}></span>
            </div>
          </>
        )}
      </div>
      <div className={styles['bottom-button']}>
        {status === DemandType.NeedDeposite && (
          <div className={classNames('common-button', styles['orange-button'])} onClick={toggle}>
            {i18n[lang]['deposite.right']}
          </div>
        )}
        {status === DemandType.NeedPay && (
          <div className={classNames('common-button', styles['orange-button'])} onClick={toggle}>
            {i18n[lang]['pay.auth']}
          </div>
        )}
        {status === DemandType.Going || status === DemandType.CloseWait ? (
          <div className={classNames('common-button', styles['read-detail'])} onClick={() => navigate('/datainfo')}>
            {i18n[lang]['view.data']}
          </div>
        ) : (
          <div
            className={classNames('common-button', styles['read-detail'])}
            onClick={() => {
              if (status === DemandType.VerifyFail) {
                navigate(`/verify-fail?id=${id}`);
              } else {
                navigate(`/edit-demand?id=${id}`);
              }
            }}
          >
            {i18n[lang]['view.detail']}
          </div>
        )}
        {status === DemandType.Finished && <RelaunchButton id={id} onFinish={refetch} style={{ color: '#2D70F1' }} />}
      </div>
      <PayModal activityId={id} open={open} handleCloseModal={toggle} />
    </div>
  );
};

export default Index;
