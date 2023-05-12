import React, { useRef } from 'react';
import { useMount } from 'ahooks';
import styles from './index.module.less';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface ScrollBarProps {
  contentList: Array<string>;
  floatType?: 'right' | 'left';
  barNumber: number;
}

gsap.registerPlugin(ScrollTrigger);

const Index: React.FC<ScrollBarProps> = ({ contentList, floatType = 'left', barNumber }) => {
  return (
    <div className={styles.container} id={`bar${barNumber}`} style={{ float: floatType }}>
      <div className={styles.innerContainer1}>
        {contentList.map((item) => (
          <img src={item} className={styles['content-image']} key={item}></img>
        ))}
      </div>
      <div className={styles.innerContainer2}>
        {contentList.map((item) => (
          <img src={item} className={styles['content-image']} key={item}></img>
        ))}
      </div>
    </div>
  );
};

export default Index;
