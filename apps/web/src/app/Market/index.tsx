import React from 'react';
import { Tabs } from '@arco-design/web-react';
import styles from './index.module.less';
import useI18n from 'src/ahooks/useI18n';
import locale from './locales';
import Web2 from './components/web2/web2';
import Web3 from './components/web3';
const TabPane = Tabs.TabPane;

const Index = () => {
  const { lang, i18n } = useI18n(locale);
  return (
    <div className={styles['container']}>
      <Tabs defaultActiveTab="1" className={styles['tab']}>
        <TabPane key="1" title={i18n[lang]['market.web2channel']}>
          <Web2></Web2>
        </TabPane>
        <TabPane key="3" title={i18n[lang]['market.web3channel']}>
          <Web3 />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Index;
