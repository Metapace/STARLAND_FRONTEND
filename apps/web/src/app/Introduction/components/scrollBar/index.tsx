import React from 'react';
import styles from './index.module.less';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface contentItem {
  src: string;
  height: string;
  width: string;
}
interface ScrollBarProps {
  contentList: Array<contentItem>;
  floatType?: 'right' | 'left';
  barNumber: number;
}

gsap.registerPlugin(ScrollTrigger);

const speed = 15000;

const Index: React.FC<ScrollBarProps> = ({ contentList, floatType = 'left', barNumber }) => {
  const sectionStyle = { '--speed': `${speed}ms` } as React.CSSProperties;
  return (
    <div className={styles.container} id={`bar${barNumber}`} style={{ float: floatType }}>
      <div className={styles['wrapper']}>
        <section style={sectionStyle}>
          {contentList.map((image, index) => (
            <LazyLoadImage
              src={image.src}
              alt={image}
              width={image.width}
              height={image.height}
              effect="blur"
              key={index}
              className={styles['content-image']}
            ></LazyLoadImage>
          ))}
        </section>
        <section style={sectionStyle}>
          {contentList.map((image, index) => (
            <LazyLoadImage
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image}
              effect="blur"
              key={index}
              className={styles['content-image']}
            ></LazyLoadImage>
          ))}
        </section>
        <section style={sectionStyle}>
          {contentList.map((image, index) => (
            <LazyLoadImage
              src={image.src}
              width={image.width}
              height={image.height}
              alt={image}
              effect="blur"
              key={index}
              className={styles['content-image']}
            ></LazyLoadImage>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Index;
