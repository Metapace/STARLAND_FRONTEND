import React from 'react';
import styles from './index.module.less';
import DataOverview from './components/DataOverview';
import DataClick from './components/DataClick';
import DataDetail from './components/DataDetail';

const Index = () => {
  return (
    <div className={styles['container']}>
      <DataOverview />
      <DataClick />
      <DataDetail />
    </div>
  );
};

export default Index;
