import React from 'react';
import styles from './index.module.less';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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
          <LazyLoadImage
            src={item}
            alt={item}
            effect="blur"
            key={item}
            className={styles['content-image']}
          ></LazyLoadImage>
        ))}
      </div>
      <div className={styles.innerContainer2}>
        {contentList.map((item) => (
          <LazyLoadImage
            src={item}
            alt={item}
            effect="blur"
            key={item}
            className={styles['content-image']}
          ></LazyLoadImage>
        ))}
      </div>
    </div>
  );
};

export default Index;
