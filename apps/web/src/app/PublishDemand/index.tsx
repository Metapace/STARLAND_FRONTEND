import React from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import useI18n from 'src/ahooks/useI18n';
import locale from './locales';
import LongProgress from './components/LongProgress';
import RemandItem, { DemandType } from './components/RemandItem';
import web2Banner from 'src/assets/images/web2-banner.png';
import { IconCheckCircle } from '@arco-design/web-react/icon';
import { Select } from '@arco-design/web-react';

const Option = Select.Option;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles.container}>
      <div className={styles.title}>发布需求</div>
      <LongProgress step={1}></LongProgress>
      <div className={styles['top']}>
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
            <div className={classNames('common-button', styles['create-button'])}>创建活动</div>
          </div>
        </div>
      </div>
      <div className={classNames(styles.title)}>
        需求列表
        <div className={styles['select-demand']}>
          <Select placeholder="Please select" style={{ width: 154 }} onChange={(value) => console.log(value)}>
            {options.map((option) => (
              <Option key={option} value={option}>
                {option}
              </Option>
            ))}
          </Select>
        </div>
      </div>
      <div className={classNames(styles['item-list'])}>
        <RemandItem demandType={DemandType.NeedDeposite} time={1684137855} />
        <RemandItem demandType={DemandType.NeedPay} time={1684137855} />
        <RemandItem demandType={DemandType.Finished} time={1684137855} />
        <RemandItem demandType={DemandType.Going} time={1684137855} />
        <RemandItem demandType={DemandType.NeedVerify} time={1684137855} />
        <RemandItem demandType={DemandType.VerifyFail} time={1684137855} />
      </div>
    </div>
  );
};

export default Index;
