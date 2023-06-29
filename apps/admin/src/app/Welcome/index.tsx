import React from 'react';
import StarlandLog from 'src/assets/images/starland-log.png';
import styles from './index.module.less';

const Home = () => {
  return (
    <div>
      <img src={StarlandLog} alt="" className={styles['log-image']} />
      <div className={styles['title']}>StarLand 管理平台</div>
    </div>
  );
};

export default Home;
