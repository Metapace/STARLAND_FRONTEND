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

const speed = 5000;

const Index: React.FC<ScrollBarProps> = ({ contentList, floatType = 'left', barNumber }) => {
  const sectionStyle = { '--speed': `${speed}ms` } as React.CSSProperties;
  return (
    <div className={styles.container} id={`bar${barNumber}`} style={{ float: floatType }}>
      <div className={styles['wrapper']}>
        <section style={sectionStyle}>
          {contentList.map((image) => (
            <LazyLoadImage
              src={image}
              alt={image}
              effect="blur"
              key={image}
              className={styles['content-image']}
            ></LazyLoadImage>
          ))}
        </section>
        <section style={sectionStyle}>
          {contentList.map((image) => (
            <LazyLoadImage
              src={image}
              alt={image}
              effect="blur"
              key={image}
              className={styles['content-image']}
            ></LazyLoadImage>
          ))}
        </section>
        <section style={sectionStyle}>
          {contentList.map((image) => (
            <LazyLoadImage
              src={image}
              alt={image}
              effect="blur"
              key={image}
              className={styles['content-image']}
            ></LazyLoadImage>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Index;
