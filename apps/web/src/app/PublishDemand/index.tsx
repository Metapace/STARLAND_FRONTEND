import React, { useMemo, useState } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import useI18n from 'src/ahooks/useI18n';
import locale from './locales';
import LongProgress from './components/LongProgress';
import { DemandType } from 'src/api/activity';
import RemandItem, { DemandMap } from './components/RemandItem';
import web2Banner from 'src/assets/images/web2-banner.png';
import { IconCheckCircle, IconRight } from '@arco-design/web-react/icon';
import { Select } from '@arco-design/web-react';
import { useNavigate } from 'react-router-dom';
import { useRequestActivity } from 'src/api/activityHooks';
const Option = Select.Option;

export const Web2Des = () => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles['img-text']}>
      <div className={styles['img-text-top']}>{i18n[lang]['native.ad.series']}</div>
      <div className={styles['img-text-bottom']}>{i18n[lang]['native.ad.series.des']}</div>
    </div>
  );
};

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  const [demandType, setDemandType] = useState<DemandType>(DemandType.All);
  const { data: RemandList } = useRequestActivity();
  const showDemandList = useMemo(() => {
    if (+demandType === DemandType.All) {
      return RemandList;
    }
    return RemandList?.filter((item) => item.status === +demandType);
  }, [RemandList, demandType]);
  const CreateButton = () => (
    <div className={classNames('common-button', styles['create-button'])} onClick={() => navigate('/create-demand')}>
      {i18n[lang]['create.campagin']}
      <IconRight className={styles['right-to-icon']} />
    </div>
  );
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.title}>{i18n[lang]['publish.demand']}</div>
      <LongProgress step={1}></LongProgress>
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
            <CreateButton />
          </div>
        </div>
      </div>
      <div className={classNames(styles.title)}>
        {i18n[lang]['demand.list']}
        <div className={styles['select-demand']}>
          <Select
            placeholder="Please select"
            style={{ width: 154 }}
            onChange={(value) => {
              setDemandType(value);
            }}
          >
            {Object.keys(DemandMap).map((key) => (
              <Option key={key} value={key}>
                {i18n[lang][DemandMap[key as unknown as Exclude<DemandType, DemandType.Remove>]]}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className={classNames(styles['item-list'])}>
        {showDemandList?.map((item) => (
          <RemandItem {...item} key={item.id} />
        ))}
        {(!showDemandList || showDemandList.length === 0) && demandType !== DemandType.All && (
          <div className={styles.empyty}>{i18n[lang]['r.empyty']}</div>
        )}
        {(!showDemandList || showDemandList.length === 0) && demandType === DemandType.All && (
          <div className={styles['all-empyty']}>
            <div className={styles['first-title']}>{i18n[lang]['not.have.activity']}</div>
            <div className={styles['seconde-title']}>{i18n[lang]['not.have.ads']}</div>
            <CreateButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
