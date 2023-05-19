import React, { useState } from 'react';
import styles from './index.module.less';

import click from 'src/assets/images/datainfo-click.png';
import consume from 'src/assets/images/datainfo-consume.png';
import press from 'src/assets/images/datainfo-press.png';
import pressweb3 from 'src/assets/images/datainfo-press-web3.png';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { Select } from '@arco-design/web-react';

const Option = Select.Option;
const options = ['昨日', '最近三天', '最近一周', '最近一月', '最近半年'];

const Index = () => {
  const getOption = () => {
    const options = {
      grid: {
        left: '30px',
        right: '30px',
        bottom: '20px',
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: ['抖音', '谷歌', '推特'],
      },
      series: [
        {
          data: [120, 200, 150],
          type: 'bar',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 10,0, 0)',
          },
        },
      ],
    };
    return options;
  };
  return (
    <div className={styles['container']}>
      <div className={styles['dataclick-top']}>
        <p className={styles['dataclick-top-title']}>点击量统计</p>
        <Select
          placeholder="Please select"
          style={{ width: 154 }}
          // onChange={(value) =>
          //   Message.info({
          //     content: `You select ${value}.`,
          //     showIcon: true,
          //   })
          // }
        >
          {options.map((option, index) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
        <p className={styles['dataclick-top-note']}>每日九点更新前一日数据</p>
      </div>
      <div className={styles['chart-container']}>
        <ReactECharts option={getOption()} />
      </div>
    </div>
  );
};

export default Index;
