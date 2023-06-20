/* eslint-disable max-len */
import React, { useMemo } from 'react';
import styles from './index.module.less';
import classNames from 'classnames';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import metace from 'src/assets/images/homepage/metace.png';
import dehero from 'src/assets/images/homepage/dehero.png';
import gate3 from 'src/assets/images/homepage/gate3.png';
import unipass from 'src/assets/images/homepage/unipass.png';
import metaLogo from 'src/assets/images/homepage/Logo_Metacene.png';
import unipassLogo from 'src/assets/images/homepage/Logo_Unipass.png';
import gate3Logo from 'src/assets/images/homepage/Logo_Gate3.png';
import deheroLogo from 'src/assets/images/homepage/Logo_Dehero.png';
import LeftArrow from 'src/assets/images/homepage/left-arrow.png';
import useI18n from 'src/ahooks/useI18n';
import locale from '../../locales';
export enum CaseType {
  Metacene = 1,
  Dehero = 2,
  Unipass = 3,
  Gate3 = 4,
}

interface CustomerCaseProps {
  caseType: CaseType;
}
interface SettingItems {
  src: string;
  title: string;
  describe: Array<string>;
  expose: string;
  click: string;
  logSrc: string;
}

const Index: React.FC<CustomerCaseProps> = ({ caseType }) => {
  const { lang, i18n } = useI18n(locale);
  const settingMap: Record<CaseType, SettingItems> = useMemo(
    () => ({
      [CaseType.Metacene]: {
        src: metace,
        title: 'Metacene',
        describe: [i18n[lang]['intro.metacene.describe']],
        expose: '24M+',
        click: '32%',
        logSrc: metaLogo,
      },
      [CaseType.Dehero]: {
        src: dehero,
        title: 'Dehero',
        describe: [
          i18n[lang]['intro.dehero.describe1'],
          i18n[lang]['intro.dehero.describe2'],
          i18n[lang]['intro.dehero.describe3'],
        ],
        expose: '27M+',
        click: '37%',
        logSrc: deheroLogo,
      },
      [CaseType.Unipass]: {
        src: unipass,
        title: 'Unipass',
        describe: [i18n[lang]['intro.unipass.describe1'], i18n[lang]['intro.unipass.describe2']],
        expose: '25M+',
        click: '40%',
        logSrc: unipassLogo,
      },
      [CaseType.Gate3]: {
        src: gate3,
        title: 'Gate3',
        describe: [i18n[lang]['intro.gate3.describe1'], i18n[lang]['intro.gate3.describe2']],
        expose: '20M+',
        click: '33%',
        logSrc: gate3Logo,
      },
    }),
    [lang],
  );
  return (
    <div
      className={classNames(
        styles['container'],
        caseType === CaseType.Metacene && styles['metacene-container'],
        caseType === CaseType.Unipass && styles['unipass-container'],
        caseType === CaseType.Dehero && styles['dehero-container'],
        caseType === CaseType.Gate3 && styles['gate3-container'],
      )}
    >
      <div className={styles['container-left']}>
        <div className={styles['item-logo']}>
          <LazyLoadImage src={settingMap[caseType].logSrc} alt={'image'} effect="blur"></LazyLoadImage>
        </div>
        <div className={styles['item-title']}>{settingMap[caseType].title}</div>
        <div className={styles['item-paragraph-list']}>
          {settingMap[caseType].describe.map((item, index) => (
            <div className={styles['item-paragraph']} key={index}>
              {item}
            </div>
          ))}
        </div>
        <div className={styles['show-numbers']}>
          <div className={styles['numbers-item']}>
            <div className={styles['numbers-top']}>{settingMap[caseType].expose}</div>
            <div className={styles['numbers-bottom']}>{i18n[lang]['intro.brand.expose']}</div>
          </div>
          <div className={styles['numbers-item']}>
            <div className={styles['numbers-top']}>{settingMap[caseType].click}</div>
            <div className={styles['numbers-bottom']}>{i18n[lang]['intro.click.rate']}</div>
          </div>
        </div>
        <div className={styles['icon-area']}>
          <img src={LeftArrow} alt="" className={styles['left-arrow']} />
        </div>
      </div>
      <div className={styles['container-right']}>
        <img src={settingMap[caseType].src} alt={'image'} />
      </div>
    </div>
  );
};

export default Index;
