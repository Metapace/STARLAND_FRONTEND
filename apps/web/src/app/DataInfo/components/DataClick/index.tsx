import React, { useState } from 'react';
import styles from './index.module.less';

import click from 'src/assets/images/datainfo-click.png';
import consume from 'src/assets/images/datainfo-consume.png';
import press from 'src/assets/images/datainfo-press.png';
import pressweb3 from 'src/assets/images/datainfo-press-web3.png';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

const Index = () => {
  const getOption = () => {
    const options = {
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)',
          },
        },
      ],
    };
    return options;
  };
  return (
    <div className={styles['container']}>
      <div>aaa</div>
      <div className={styles['chart-container']}>
        <ReactECharts option={getOption()} />
      </div>
    </div>
  );
};

export default Index;
